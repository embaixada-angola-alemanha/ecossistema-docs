# Ecossistema Digital — Documentação

Documentação técnica do Ecossistema Digital da Embaixada da República de Angola na Alemanha.

## Índice

### Architecture Decision Records (ADRs)

| ADR | Título | Estado |
|-----|--------|--------|
| [ADR-001](adrs/ADR-001-arquitectura-geral.md) | Arquitectura Geral do Ecossistema | Aceite |
| [ADR-002](adrs/ADR-002-multi-repo.md) | Estratégia Multi-Repo | Aceite |
| [ADR-003](adrs/ADR-003-autenticacao-keycloak.md) | Autenticação com Keycloak + JWT | Aceite |
| [ADR-004](adrs/ADR-004-postgresql.md) | PostgreSQL como Base de Dados Principal | Aceite |
| [ADR-005](adrs/ADR-005-internacionalizacao.md) | Internacionalização (i18n) | Aceite |

### Diagramas

| Diagrama | Descrição |
|----------|-----------|
| [C4 Context](diagrams/c4-context.md) | Visão geral do sistema e actores externos |
| [C4 Container](diagrams/c4-container.md) | Containers técnicos e suas interacções |

### Referência

- [Glossário Técnico](glossary/glossario.md)
- [Templates LaTeX](templates/latex/)

## Stack Tecnológica

| Componente | Tecnologia |
|-----------|------------|
| Backend | Java 21 + Spring Boot 3.4 |
| Frontend Admin | Angular 18 |
| Mobile | React Native 0.76+ |
| Base de Dados | PostgreSQL 16 |
| Cache | Redis 7 |
| Autenticação | Keycloak + JWT |
| Migrações | Flyway |
| Containers | Docker + Kubernetes |
| CI/CD | GitHub Actions |
| Monitorização | Prometheus + Grafana + Loki |
| Ficheiros | MinIO (S3-compatible) |

## Repositórios

| Repositório | Descrição |
|-------------|-----------|
| [ecossistema-infra](https://github.com/embaixada-angola-alemanha/ecossistema-infra) | Infraestrutura Docker Compose |
| [ecossistema-commons](https://github.com/embaixada-angola-alemanha/ecossistema-commons) | Bibliotecas partilhadas Java |
| [ecossistema-gpj-backend](https://github.com/embaixada-angola-alemanha/ecossistema-gpj-backend) | GPJ Backend (Spring Boot) |
| [ecossistema-gpj-frontend](https://github.com/embaixada-angola-alemanha/ecossistema-gpj-frontend) | GPJ Frontend (Angular) |
| [ecossistema-sgc-backend](https://github.com/embaixada-angola-alemanha/ecossistema-sgc-backend) | SGC Backend (Spring Boot) |
| [ecossistema-sgc-frontend](https://github.com/embaixada-angola-alemanha/ecossistema-sgc-frontend) | SGC Frontend (Angular) |
| [ecossistema-si-backend](https://github.com/embaixada-angola-alemanha/ecossistema-si-backend) | SI Backend (Spring Boot) |
| [ecossistema-si-frontend](https://github.com/embaixada-angola-alemanha/ecossistema-si-frontend) | SI Frontend (Angular) |
| [ecossistema-wn-backend](https://github.com/embaixada-angola-alemanha/ecossistema-wn-backend) | WN Backend (Spring Boot) |
| [ecossistema-wn-frontend](https://github.com/embaixada-angola-alemanha/ecossistema-wn-frontend) | WN Frontend (Angular) |
| [ecossistema-mobile](https://github.com/embaixada-angola-alemanha/ecossistema-mobile) | Aplicação móvel (React Native) |
| [ecossistema-docs](https://github.com/embaixada-angola-alemanha/ecossistema-docs) | Documentação e ADRs |
