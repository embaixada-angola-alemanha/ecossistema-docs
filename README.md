# Ecossistema Digital — Documentacao

[![CI](https://github.com/embaixada-angola-alemanha/ecossistema-docs/actions/workflows/ci.yml/badge.svg)](https://github.com/embaixada-angola-alemanha/ecossistema-docs/actions/workflows/ci.yml)

Repositorio central de documentacao do **Ecossistema Digital** da Embaixada da Republica de Angola na Alemanha. Contem ADRs (Architecture Decision Records), especificacoes OpenAPI, pacotes partilhados frontend, guias de utilizacao, documentacao de go-live, testes UAT/E2E/integracao, matriz de acessos, runbook de operacoes e o ficheiro `project_state.json` — a fonte unica de verdade do projecto.

> **Dominio:** `embaixada-angola.site`

## Conteudo

### Architecture Decision Records (ADRs)

| ADR | Titulo | Estado |
|-----|--------|--------|
| [ADR-001](adrs/ADR-001-arquitectura-geral.md) | Arquitectura Geral do Ecossistema | Aceite |
| [ADR-002](adrs/ADR-002-multi-repo.md) | Estrategia Multi-Repo | Aceite |
| [ADR-003](adrs/ADR-003-autenticacao-keycloak.md) | Autenticacao com Keycloak + JWT | Aceite |
| [ADR-004](adrs/ADR-004-postgresql.md) | PostgreSQL como Base de Dados Principal | Aceite |
| [ADR-005](adrs/ADR-005-internacionalizacao.md) | Internacionalizacao (i18n) | Aceite |

### Diagramas de Arquitectura

| Diagrama | Descricao |
|----------|-----------|
| [C4 Context](diagrams/c4-context.md) | Visao geral do sistema e actores externos |
| [C4 Container](diagrams/c4-container.md) | Containers tecnicos e suas interaccoes |

### Guias de Utilizacao

| Guia | Descricao |
|------|-----------|
| [Guia SGC](guides/guia-sgc.md) | Sistema de Gestao Consular |
| [Guia SI & WN](guides/guia-si-wn.md) | Site Institucional e WebNoticias |
| [Guia GPJ](guides/guia-gpj.md) | Gestao de Projectos |
| [Guia Admin](guides/guia-admin.md) | Administracao do Sistema |

### Go-Live

| Documento | Descricao |
|-----------|-----------|
| [Checklist](go-live/checklist.md) | Checklist completa de go-live |
| [DNS Cutover](go-live/dns-cutover.md) | Plano de migracao DNS |
| [Support Setup](go-live/support-setup.md) | Configuracao de suporte pos-lancamento |

### Operacoes

| Documento | Descricao |
|-----------|-----------|
| [Operations Runbook](runbook/operations-runbook.md) | Procedimentos operacionais e troubleshooting |
| [Deployment Guide](deployment/deployment-guide.md) | Guia de deployment detalhado |

### Seguranca

| Documento | Descricao |
|-----------|-----------|
| [GDPR Checklist](security/gdpr-checklist.md) | Conformidade RGPD/GDPR |
| [Keycloak Review](security/keycloak-review.md) | Revisao de seguranca Keycloak |
| [Pentest Report](security/pentest-report.md) | Relatorio de testes de penetracao |
| [OWASP ZAP](security/owasp-zap/) | Resultados de scans OWASP ZAP |
| [Trivy](security/trivy/) | Scans de vulnerabilidades de containers |

### Referencia Tecnica

| Documento | Descricao |
|-----------|-----------|
| [Matriz de Acessos](ACCESS_MATRIX.md) | Permissoes por role e endpoint |
| [API Reference](api-docs/api-reference.md) | Referencia geral das APIs |
| [Data Dictionary](technical-doc/data-dictionary.md) | Dicionario de dados |
| [Glossario Tecnico](glossary/glossario.md) | Glossario de termos do projecto |

## OpenAPI — Especificacoes e Clientes

O directorio `openapi/` contem as especificacoes OpenAPI dos 4 backends e gera automaticamente clientes TypeScript:

```
openapi/
├── specs/                   # Especificacoes OpenAPI (YAML)
├── configs/                 # Configuracoes do gerador (sgc.json, si.json, wn.json, gpj.json)
├── generated/               # Clientes TypeScript gerados
│   ├── sgc-client/
│   ├── si-client/
│   ├── wn-client/
│   └── gpj-client/
├── generate-clients.sh      # Script de geracao
└── ci-generate.yml          # CI para geracao automatica
```

```bash
# Gerar todos os clientes
./openapi/generate-clients.sh
```

## Pacotes Partilhados Frontend

O directorio `packages/` contem bibliotecas partilhadas para os frontends Angular:

| Pacote | Descricao |
|--------|-----------|
| `core` | Servicos e utilitarios base |
| `auth` | Autenticacao Keycloak / OIDC |
| `i18n` | Internacionalizacao (PT, DE, EN, CS) |
| `api-client` | Clientes HTTP para as APIs |
| `ui-kit` | Componentes UI reutilizaveis |

## Testes

### UAT (User Acceptance Testing)

```
uat/
├── uat-plan.md              # Plano de testes UAT
├── training-needs.md        # Necessidades de formacao
├── scenarios/               # Cenarios de teste por sistema
├── sessions/                # Registos de sessoes UAT
├── feedback/                # Feedback dos utilizadores
└── issues/                  # Issues identificados em UAT
```

### Testes E2E (Cypress)

```
e2e-tests/
├── cypress.config.ts
├── package.json
├── cypress/
│   └── ...                  # Specs Cypress
└── .github/                 # CI para testes E2E
```

### Testes de Integracao

```
integration-tests/
├── pom.xml                  # Projecto Maven
└── src/                     # Testes de integracao Java
```

### Performance

```
performance/
├── jmeter/                  # Scripts JMeter
├── lighthouse/              # Auditorias Lighthouse
├── database/                # Benchmarks de base de dados
└── redis/                   # Benchmarks Redis
```

## Estado do Projecto

O ficheiro `project_state.json` e a **fonte unica de verdade** do ecossistema. Contem o estado de todas as tarefas, sprints, e progresso de desenvolvimento.

## Stack Tecnologica Global

| Componente | Tecnologia |
|-----------|------------|
| Backend | Java 21 + Spring Boot 3.4 |
| Frontend Admin | Angular 18 |
| Mobile | React Native 0.76+ |
| Base de Dados | PostgreSQL 16 |
| Cache | Redis 7 |
| Autenticacao | Keycloak 26 + JWT |
| Migracoes | Flyway |
| Containers | Docker Compose |
| CI/CD | GitHub Actions |
| Monitorizacao | Prometheus + Grafana + Loki |
| Armazenamento | MinIO (S3-compatible) |
| Mensageria | RabbitMQ |

## Repositorios do Ecossistema

| Repositorio | Descricao |
|-------------|-----------|
| [ecossistema-infra](https://github.com/embaixada-angola-alemanha/ecossistema-infra) | Infraestrutura Docker Compose e deploy |
| [ecossistema-commons](https://github.com/embaixada-angola-alemanha/ecossistema-commons) | Bibliotecas partilhadas Java |
| [ecossistema-gpj-backend](https://github.com/embaixada-angola-alemanha/ecossistema-gpj-backend) | GPJ Backend (Spring Boot) |
| [ecossistema-gpj-frontend](https://github.com/embaixada-angola-alemanha/ecossistema-gpj-frontend) | GPJ Frontend (Angular) |
| [ecossistema-sgc-backend](https://github.com/embaixada-angola-alemanha/ecossistema-sgc-backend) | SGC Backend (Spring Boot) |
| [ecossistema-sgc-frontend](https://github.com/embaixada-angola-alemanha/ecossistema-sgc-frontend) | SGC Frontend (Angular) |
| [ecossistema-si-backend](https://github.com/embaixada-angola-alemanha/ecossistema-si-backend) | SI Backend (Spring Boot) |
| [ecossistema-si-frontend](https://github.com/embaixada-angola-alemanha/ecossistema-si-frontend) | SI Frontend (Angular) |
| [ecossistema-wn-backend](https://github.com/embaixada-angola-alemanha/ecossistema-wn-backend) | WN Backend (Spring Boot) |
| [ecossistema-wn-frontend](https://github.com/embaixada-angola-alemanha/ecossistema-wn-frontend) | WN Frontend (Angular) |
| [ecossistema-mobile](https://github.com/embaixada-angola-alemanha/ecossistema-mobile) | Aplicacao movel (React Native) |
| **ecossistema-docs** | **Este repositorio** |

## Estrutura do Repositorio

```
ecossistema-docs/
├── README.md
├── project_state.json               # Fonte unica de verdade do projecto
├── ACCESS_MATRIX.md                 # Matriz de permissoes
├── .gitignore
├── adrs/                            # Architecture Decision Records
│   ├── ADR-001-arquitectura-geral.md
│   ├── ADR-002-multi-repo.md
│   ├── ADR-003-autenticacao-keycloak.md
│   ├── ADR-004-postgresql.md
│   └── ADR-005-internacionalizacao.md
├── api-docs/
│   └── api-reference.md
├── deployment/
│   └── deployment-guide.md
├── diagrams/
│   ├── c4-context.md
│   └── c4-container.md
├── e2e-tests/                       # Testes E2E (Cypress)
├── glossary/
│   └── glossario.md
├── go-live/
│   ├── checklist.md
│   ├── dns-cutover.md
│   └── support-setup.md
├── guides/
│   ├── guia-sgc.md
│   ├── guia-si-wn.md
│   ├── guia-gpj.md
│   └── guia-admin.md
├── integration-tests/               # Testes de integracao (Maven)
├── openapi/
│   ├── specs/
│   ├── configs/
│   ├── generated/
│   ├── generate-clients.sh
│   └── ci-generate.yml
├── packages/                        # Pacotes partilhados frontend
│   ├── core/
│   ├── auth/
│   ├── i18n/
│   ├── api-client/
│   └── ui-kit/
├── performance/                     # Testes de performance
│   ├── jmeter/
│   ├── lighthouse/
│   ├── database/
│   └── redis/
├── runbook/
│   └── operations-runbook.md
├── security/
│   ├── gdpr-checklist.md
│   ├── keycloak-review.md
│   ├── pentest-report.md
│   ├── owasp-zap/
│   └── trivy/
├── technical-doc/
│   ├── data-dictionary.md
│   └── ecossistema-digital.tex      # Documento tecnico LaTeX
├── templates/
│   └── latex/                       # Templates LaTeX
├── uat/
│   ├── uat-plan.md
│   ├── training-needs.md
│   ├── scenarios/
│   ├── sessions/
│   ├── feedback/
│   └── issues/
└── .github/
    └── workflows/
        └── ci.yml
```

## Como Contribuir

1. Criar um branch a partir de `develop`
2. Fazer as alteracoes necessarias
3. Submeter um Pull Request para `develop`
4. Aguardar revisao

Para documentos em Markdown, manter a consistencia com os documentos existentes em termos de formatacao e lingua (portugues).
