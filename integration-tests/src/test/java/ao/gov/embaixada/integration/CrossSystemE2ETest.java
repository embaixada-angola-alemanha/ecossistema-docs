package ao.gov.embaixada.integration;

import ao.gov.embaixada.commons.integration.IntegrationEventPublisher;
import ao.gov.embaixada.commons.integration.event.EventTypes;
import ao.gov.embaixada.commons.integration.event.Exchanges;
import ao.gov.embaixada.commons.integration.event.IntegrationEvent;
import org.junit.jupiter.api.*;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.stereotype.Component;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.RabbitMQContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.time.Duration;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;

import static org.awaitility.Awaitility.await;
import static org.junit.jupiter.api.Assertions.*;

/**
 * E2E integration test validating cross-system event flow via RabbitMQ.
 * Uses TestContainers to spin up a real RabbitMQ instance.
 *
 * Tests:
 * 1. SGC → SI: Consular data feed
 * 2. SGC → WN: News from activities
 * 3. SI → WN: Event announcements
 * 4. ALL → GPJ: Monitoring
 * 5. Event routing correctness (topic exchange patterns)
 */
@SpringBootTest
@Testcontainers
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class CrossSystemE2ETest {

    @Container
    static RabbitMQContainer rabbitmq = new RabbitMQContainer("rabbitmq:3-management-alpine");

    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.rabbitmq.host", rabbitmq::getHost);
        registry.add("spring.rabbitmq.port", rabbitmq::getAmqpPort);
        registry.add("spring.rabbitmq.username", () -> "guest");
        registry.add("spring.rabbitmq.password", () -> "guest");
    }

    @Autowired
    private IntegrationEventPublisher publisher;

    @Autowired
    private TestSiConsumer siConsumer;

    @Autowired
    private TestWnSgcConsumer wnSgcConsumer;

    @Autowired
    private TestWnSiConsumer wnSiConsumer;

    @Autowired
    private TestGpjMonitor gpjMonitor;

    @BeforeEach
    void clearReceivedEvents() {
        siConsumer.events.clear();
        wnSgcConsumer.events.clear();
        wnSiConsumer.events.clear();
        gpjMonitor.events.clear();
    }

    // ============================
    // Test 1: SGC → SI (consular data feed)
    // ============================
    @Test
    @Order(1)
    void sgcCidadaoCreated_shouldReachSiConsumer() {
        publisher.publish(EventTypes.SOURCE_SGC, EventTypes.SGC_CIDADAO_CREATED, "cid-001", "Cidadao",
            Map.of("nome", "João Silva", "email", "joao@test.com"));

        await().atMost(Duration.ofSeconds(10)).untilAsserted(() -> {
            assertEquals(1, siConsumer.events.size());
            IntegrationEvent evt = siConsumer.events.get(0);
            assertEquals(EventTypes.SGC_CIDADAO_CREATED, evt.eventType());
            assertEquals("cid-001", evt.entityId());
            assertEquals("João Silva", evt.payload().get("nome"));
        });
    }

    @Test
    @Order(2)
    void sgcActivityCompleted_shouldReachSiAndWn() {
        publisher.publish(EventTypes.SOURCE_SGC, EventTypes.SGC_ACTIVITY_COMPLETED, "act-001", "VisaActivity",
            Map.of("description", "100 vistos emitidos este mês"));

        await().atMost(Duration.ofSeconds(10)).untilAsserted(() -> {
            // SI should receive it (subscribed to sgc.activity.*)
            assertTrue(siConsumer.events.stream()
                .anyMatch(e -> e.eventType().equals(EventTypes.SGC_ACTIVITY_COMPLETED)));
            // WN should receive it too (subscribed to sgc.activity.*)
            assertTrue(wnSgcConsumer.events.stream()
                .anyMatch(e -> e.eventType().equals(EventTypes.SGC_ACTIVITY_COMPLETED)));
        });
    }

    // ============================
    // Test 2: SGC → WN (news from activities)
    // ============================
    @Test
    @Order(3)
    void sgcVistoStateChanged_shouldReachWnConsumer() {
        publisher.publish(EventTypes.SOURCE_SGC, EventTypes.SGC_VISTO_STATE_CHANGED, "visto-001", "Visto",
            Map.of("tipo", "TRABALHO", "previousState", "EM_ANALISE", "newState", "EMITIDO"));

        // WN does NOT subscribe to sgc.visto.* by default — only sgc.activity.*
        // This validates routing specificity
        await().during(Duration.ofSeconds(2)).atMost(Duration.ofSeconds(5)).untilAsserted(() ->
            assertTrue(wnSgcConsumer.events.isEmpty(), "WN should not receive visto events directly"));
    }

    // ============================
    // Test 3: SI → WN (event announcements)
    // ============================
    @Test
    @Order(4)
    void siEventPublished_shouldReachWnConsumer() {
        publisher.publish(EventTypes.SOURCE_SI, EventTypes.SI_EVENT_PUBLISHED, "evt-001", "Event",
            Map.of("slug", "dia-angola-2026", "tituloPt", "Dia de Angola 2026", "dataInicio", "2026-11-11"));

        await().atMost(Duration.ofSeconds(10)).untilAsserted(() -> {
            assertEquals(1, wnSiConsumer.events.size());
            IntegrationEvent evt = wnSiConsumer.events.get(0);
            assertEquals(EventTypes.SI_EVENT_PUBLISHED, evt.eventType());
            assertEquals("Dia de Angola 2026", evt.payload().get("tituloPt"));
        });
    }

    // ============================
    // Test 4: ALL → GPJ (monitoring)
    // ============================
    @Test
    @Order(5)
    void allEvents_shouldReachGpjMonitor() {
        // Publish events from different systems
        publisher.publish(EventTypes.SOURCE_SGC, EventTypes.SGC_CIDADAO_CREATED, "cid-002", "Cidadao");
        publisher.publish(EventTypes.SOURCE_SI, EventTypes.SI_PAGE_PUBLISHED, "page-001", "Page");
        publisher.publish(EventTypes.SOURCE_WN, EventTypes.WN_ARTICLE_PUBLISHED, "art-001", "Article");
        publisher.publish(EventTypes.SOURCE_GPJ, EventTypes.GPJ_SPRINT_COMPLETED, "spr-001", "Sprint");

        await().atMost(Duration.ofSeconds(10)).untilAsserted(() -> {
            // GPJ should receive ALL 4 events (subscribed to '#')
            assertEquals(4, gpjMonitor.events.size());
            assertTrue(gpjMonitor.events.stream().anyMatch(e -> "SGC".equals(e.source())));
            assertTrue(gpjMonitor.events.stream().anyMatch(e -> "SI".equals(e.source())));
            assertTrue(gpjMonitor.events.stream().anyMatch(e -> "WN".equals(e.source())));
            assertTrue(gpjMonitor.events.stream().anyMatch(e -> "GPJ".equals(e.source())));
        });
    }

    // ============================
    // Test 5: Event routing correctness
    // ============================
    @Test
    @Order(6)
    void routingKey_shouldFollowConvention() {
        // WN article event should NOT reach SI queue (SI subscribes to sgc.* only)
        publisher.publish(EventTypes.SOURCE_WN, EventTypes.WN_ARTICLE_PUBLISHED, "art-002", "Article");

        await().during(Duration.ofSeconds(2)).atMost(Duration.ofSeconds(5)).untilAsserted(() ->
            assertTrue(siConsumer.events.isEmpty(), "SI should not receive WN events"));
    }

    // ============================
    // Test listeners (simulate each system's consumer)
    // ============================

    @Component
    static class TestSiConsumer {
        final List<IntegrationEvent> events = new CopyOnWriteArrayList<>();

        @RabbitListener(queues = Exchanges.QUEUE_SI_FROM_SGC)
        void handle(IntegrationEvent event) { events.add(event); }
    }

    @Component
    static class TestWnSgcConsumer {
        final List<IntegrationEvent> events = new CopyOnWriteArrayList<>();

        @RabbitListener(queues = Exchanges.QUEUE_WN_FROM_SGC)
        void handle(IntegrationEvent event) { events.add(event); }
    }

    @Component
    static class TestWnSiConsumer {
        final List<IntegrationEvent> events = new CopyOnWriteArrayList<>();

        @RabbitListener(queues = Exchanges.QUEUE_WN_FROM_SI)
        void handle(IntegrationEvent event) { events.add(event); }
    }

    @Component
    static class TestGpjMonitor {
        final List<IntegrationEvent> events = new CopyOnWriteArrayList<>();

        @RabbitListener(queues = Exchanges.QUEUE_GPJ_MONITOR)
        void handle(IntegrationEvent event) { events.add(event); }
    }

    @SpringBootApplication(scanBasePackages = "ao.gov.embaixada")
    static class TestApp {}
}
