# Glossário Técnico

Termos e acrónimos utilizados no Ecossistema Digital da Embaixada de Angola na Alemanha.

## Sistemas

| Acrónimo | Nome Completo | Descrição |
|----------|---------------|-----------|
| SGC | Sistema de Gestão Consular | Gestão de cidadãos, documentos, agendamentos e processos consulares |
| SI | Sítio Institucional | Website público da embaixada com informações, serviços e contactos |
| WN | Welwitschia Notícias | Portal de notícias e comunicados da embaixada |
| GPJ | Gestão de Projectos | Sistema interno de gestão de sprints, tarefas e progresso |

## Tecnologias

| Termo | Descrição |
|-------|-----------|
| Spring Boot | Framework Java para criação de aplicações backend com auto-configuração |
| Angular | Framework TypeScript para aplicações frontend SPA (Single Page Application) |
| React Native | Framework para desenvolvimento de aplicações móveis cross-platform (iOS + Android) |
| PostgreSQL | Sistema de gestão de base de dados relacional open-source |
| Redis | Armazém de dados em memória, utilizado para cache e sessões |
| Keycloak | Servidor de identidade open-source para SSO, OAuth2 e OIDC |
| MinIO | Armazenamento de objectos compatível com S3 |
| Flyway | Ferramenta de migração de bases de dados baseada em versões |
| Docker | Plataforma de containerização para empacotamento de aplicações |
| nginx | Servidor web e reverse proxy |

## Padrões e Protocolos

| Termo | Descrição |
|-------|-----------|
| REST | Representational State Transfer — estilo arquitectural para APIs HTTP |
| JWT | JSON Web Token — token auto-contido para autenticação stateless |
| OAuth2 | Protocolo de autorização delegada |
| OIDC | OpenID Connect — camada de identidade sobre OAuth2 |
| SSO | Single Sign-On — autenticação única para múltiplos sistemas |
| UUID | Universally Unique Identifier — identificador de 128 bits |
| ACID | Atomicity, Consistency, Isolation, Durability — propriedades de transacções |
| ADR | Architecture Decision Record — registo formal de decisões arquitecturais |
| C4 | Context, Container, Component, Code — modelo de diagramação de arquitectura |
| CI/CD | Continuous Integration / Continuous Delivery |
| RBAC | Role-Based Access Control — controlo de acesso baseado em papéis |
| i18n | Internacionalização (i + 18 letras + n) |
| SPA | Single Page Application |
| ORM | Object-Relational Mapping |
| JPA | Java Persistence API |
| AOP | Aspect-Oriented Programming — programação orientada a aspectos |

## Papéis (Roles)

| Role | Descrição |
|------|-----------|
| ADMIN | Administrador do sistema — acesso total |
| CONSUL | Cônsul — gestão de alto nível dos processos consulares |
| OFFICER | Oficial consular — processamento diário de pedidos |
| CITIZEN | Cidadão — acesso ao portal de serviços e seu perfil |
| EDITOR | Editor de conteúdo — gestão de notícias e páginas |
| VIEWER | Visualizador — acesso de leitura apenas |

## Ambientes

| Ambiente | Descrição |
|----------|-----------|
| dev | Desenvolvimento local com Docker Compose (MailHog para emails) |
| staging | Ambiente de pré-produção para testes de aceitação |
| prod | Ambiente de produção |

## Locales Suportados

| Código | Idioma | Contexto |
|--------|--------|----------|
| pt | Português | Idioma padrão — língua oficial de Angola |
| de | Alemão | País anfitrião (Alemanha) |
| en | Inglês | Língua franca internacional |
| cs | Checo | Comunidade angolana na República Checa |
