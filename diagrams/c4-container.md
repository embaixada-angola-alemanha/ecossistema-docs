# C4 Container Diagram — Ecossistema Digital

Visão de containers técnicos e suas interacções.

```mermaid
C4Container
    title Ecossistema Digital — Containers

    Person(user, "Utilizador", "Cidadão, funcionário ou visitante")

    System_Boundary(eco, "Ecossistema Digital") {

        Container(nginx, "nginx", "Reverse Proxy", "Routing, TLS termination, static files")

        Container(sgc_fe, "SGC Frontend", "Angular 18", "UI de gestão consular")
        Container(sgc_be, "SGC Backend", "Spring Boot 3.4 / Java 21", "API REST — cidadãos, documentos, agendamentos")

        Container(si_fe, "SI Frontend", "Angular 18", "UI do sítio institucional")
        Container(si_be, "SI Backend", "Spring Boot 3.4 / Java 21", "API REST — páginas, serviços, contactos")

        Container(wn_fe, "WN Frontend", "Angular 18", "UI do portal de notícias")
        Container(wn_be, "WN Backend", "Spring Boot 3.4 / Java 21", "API REST — artigos, categorias, media")

        Container(gpj_fe, "GPJ Frontend", "Angular 18", "Dashboard de gestão de projectos")
        Container(gpj_be, "GPJ Backend", "Spring Boot 3.4 / Java 21", "API REST — sprints, tarefas, métricas")

        Container(mobile, "App Móvel", "React Native", "iOS + Android para cidadãos")

        ContainerDb(sgc_db, "sgc_db", "PostgreSQL 16", "Dados consulares")
        ContainerDb(si_db, "si_db", "PostgreSQL 16", "Conteúdo institucional")
        ContainerDb(wn_db, "wn_db", "PostgreSQL 16", "Artigos e media")
        ContainerDb(gpj_db, "gpj_db", "PostgreSQL 16", "Projectos e tarefas")

        Container(redis, "Redis", "Redis 7", "Cache e sessões")
        Container(minio, "MinIO", "Object Storage", "Ficheiros e documentos")
    }

    System_Ext(keycloak, "Keycloak", "Identity Provider")
    System_Ext(smtp, "SMTP", "Email")

    Rel(user, nginx, "HTTPS")
    Rel(nginx, sgc_fe, "Proxy /sgc")
    Rel(nginx, si_fe, "Proxy /")
    Rel(nginx, wn_fe, "Proxy /noticias")
    Rel(nginx, gpj_fe, "Proxy /gpj")
    Rel(nginx, sgc_be, "Proxy /api/sgc")
    Rel(nginx, si_be, "Proxy /api/si")
    Rel(nginx, wn_be, "Proxy /api/wn")
    Rel(nginx, gpj_be, "Proxy /api/gpj")

    Rel(sgc_be, sgc_db, "JDBC")
    Rel(si_be, si_db, "JDBC")
    Rel(wn_be, wn_db, "JDBC")
    Rel(gpj_be, gpj_db, "JDBC")

    Rel(sgc_be, redis, "Cache")
    Rel(sgc_be, keycloak, "JWT validation")
    Rel(sgc_be, minio, "S3 API")
    Rel(sgc_be, smtp, "SMTP")

    Rel(mobile, nginx, "HTTPS")
```

## Containers

### Backends (Spring Boot 3.4 / Java 21)

| Container | Base de Dados | Porta | Descrição |
|-----------|--------------|-------|-----------|
| SGC Backend | sgc_db | 8081 | Gestão consular: cidadãos, documentos, agendamentos |
| SI Backend | si_db | 8082 | Sítio institucional: páginas, serviços |
| WN Backend | wn_db | 8083 | Notícias: artigos, categorias, media |
| GPJ Backend | gpj_db | 8084 | Projectos: sprints, tarefas, métricas |

Todos os backends dependem de `ecossistema-commons` (dto, security, audit, i18n).

### Frontends (Angular 18)

| Container | Rota nginx | Descrição |
|-----------|-----------|-----------|
| SGC Frontend | /sgc | Painel de gestão consular |
| SI Frontend | / | Sítio institucional público |
| WN Frontend | /noticias | Portal de notícias |
| GPJ Frontend | /gpj | Dashboard de projectos |

### Infraestrutura

| Container | Tecnologia | Função |
|-----------|-----------|--------|
| nginx | nginx 1.25 | Reverse proxy, TLS, routing |
| PostgreSQL | PostgreSQL 16 | 4 bases de dados isoladas |
| Redis | Redis 7 | Cache e sessões |
| MinIO | MinIO | Armazenamento de ficheiros |
| Keycloak | Keycloak 24 | Identity provider, SSO |
| MailHog | MailHog | SMTP mock (desenvolvimento) |
