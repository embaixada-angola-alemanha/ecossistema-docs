# ADR-001: Arquitectura Geral do Ecossistema Digital

**Data:** 2026-02-16
**Estado:** Aceite

---

## Contexto

A Embaixada de Angola na Alemanha necessita de um ecossistema digital que cubra quatro áreas funcionais distintas:

- **SGC** — Sistema de Gestão Consular, para a tramitação de serviços consulares (vistos, passaportes, registos, legalizações).
- **SI** — Sítio Institucional, para a presença digital oficial da Embaixada.
- **WN** — Portal de Notícias (*Web News*), para comunicação com a diáspora e o público geral.
- **GPJ** — Gestão de Projectos, para o acompanhamento interno do desenvolvimento do próprio ecossistema.

A equipa de desenvolvimento é reduzida (20 h/semana), pelo que a arquitectura deve equilibrar modularidade com simplicidade operacional. Os utilizadores encontram-se em dois fusos horários — Angola (WAT/UTC+1) e Alemanha (CET/CEST) — e o sistema deve suportar quatro idiomas: Português (predefinido), Alemão, Inglês e Crioulo Santomense.

A stack tecnológica já foi previamente seleccionada: Java 21 com Spring Boot 3.4 para os *backends*, Angular 18 para os *frontends* web, React Native para a aplicação móvel, PostgreSQL 16 como base de dados relacional, Redis 7 para *caching* e sessões, e Keycloak para gestão de identidades.

## Decisão

Adoptamos uma **arquitectura de monólito modular por serviço** com uma biblioteca partilhada (`ecossistema-commons`), exposta como artefacto Maven com seis módulos:

| Módulo | Responsabilidade |
|---|---|
| `commons-util` | Utilitários genéricos, constantes, helpers |
| `commons-dto` | DTOs partilhados e classes de resposta API |
| `commons-i18n` | Internacionalização (PT, DE, EN, CS) |
| `commons-security` | Integração Keycloak, filtros JWT, anotações de autorização |
| `commons-audit` | Auditoria de entidades (quem, quando, o quê) |
| `commons-notification` | Abstracção para envio de notificações (e-mail, push) |

Cada sistema (SGC, SI, WN, GPJ) é uma aplicação Spring Boot independente com o seu próprio *frontend* Angular. A comunicação entre sistemas é feita exclusivamente via APIs RESTful. Todos os serviços são colocados atrás de um *reverse proxy* nginx.

### Alternativas consideradas

1. **Microserviços completos** — Rejeitada. A complexidade operacional (service mesh, orquestração, tracing distribuído) é desproporcional para a dimensão da equipa e o volume de utilizadores esperado.
2. **Monólito único** — Rejeitada. Um único artefacto para quatro sistemas funcionalmente distintos criaria acoplamento excessivo, ciclos de *deploy* lentos e dificuldade em atribuir responsabilidades a diferentes membros da equipa.

### Princípios arquitecturais adoptados

- UUIDs como identificadores de entidades (tipo `UUID` no Java, `uuid` no PostgreSQL).
- Todos os *timestamps* armazenados como `Instant` em UTC; conversão para fuso local apenas na camada de apresentação.
- Seis papéis transversais: `ADMIN`, `CONSUL`, `OFFICER`, `CITIZEN`, `EDITOR`, `VIEWER`.
- APIs versionadas via prefixo de URL (`/api/v1/...`).
- Cada serviço é um contentor Docker independente, orquestrado via Docker Compose.

## Consequências

### Positivas

- **Implementação independente** — cada sistema pode ser desenvolvido, testado e implantado sem afectar os restantes.
- **Autenticação unificada** — o Keycloak fornece SSO entre todos os sistemas, eliminando a necessidade de múltiplos mecanismos de autenticação.
- **Consistência via commons** — a biblioteca partilhada garante padrões uniformes de segurança, auditoria, DTOs e internacionalização.
- **Preparação para microserviços** — a separação actual permite uma eventual migração para microserviços sem reescrita significativa.

### Negativas

- **Coordenação de versões** — alterações na biblioteca `ecossistema-commons` exigem recompilação e re-deploy de todos os serviços dependentes.
- **Duplicação parcial de infra** — cada serviço tem a sua própria instância de configuração Spring Boot, o que implica alguma repetição.
- **Complexidade de rede local** — o nginx deve ser correctamente configurado para encaminhar pedidos para quatro *backends* e quatro *frontends* distintos.

---

*Este ADR substitui qualquer decisão arquitectural informal anterior e serve como referência para todos os membros da equipa.*
