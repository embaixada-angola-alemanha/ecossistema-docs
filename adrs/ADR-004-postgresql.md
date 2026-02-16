# ADR-004: PostgreSQL como Base de Dados Principal

**Data:** 2026-02-16
**Estado:** Aceite

---

## Contexto

O Ecossistema Digital da Embaixada de Angola na Alemanha compreende quatro sistemas — SGC (Gestão Consular), SI (Sítio Institucional), WN (Portal de Notícias) e GPJ (Gestão de Projectos) — que gerem dados de natureza diversa: informação consular de cidadãos (vistos, passaportes, registos, legalizações), conteúdo editorial, projectos internos e registos de auditoria.

Sendo um sistema governamental, a **integridade dos dados** é um requisito inegociável. Operações consulares como a emissão de vistos ou a legalização de documentos exigem garantias ACID completas: uma transacção parcialmente executada pode resultar em inconsistências com impacto legal. Adicionalmente, todos os acessos e modificações a dados sensíveis devem ser rastreáveis para fins de auditoria.

A `BaseEntity` definida em `ecossistema-commons` estabelece os padrões de persistência para todo o ecossistema: identificadores UUID, *timestamps* em `Instant` (UTC) e controlo de concorrência optimista via `@Version`. Estes padrões condicionam a escolha de base de dados, que deve suportar nativamente estes tipos.

Os utilizadores operam em dois fusos horários — Angola (WAT/UTC+1) e Alemanha (CET/CEST) — pelo que o armazenamento de *timestamps* com informação de fuso é essencial para evitar ambiguidades.

## Decisão

Adoptamos o **PostgreSQL 16** como sistema de gestão de base de dados relacional para todo o ecossistema.

### Uma base de dados por serviço

Cada sistema possui a sua própria base de dados, criada via *init script* do contentor PostgreSQL:

| Base de dados | Sistema | Descrição |
|---|---|---|
| `sgc_db` | SGC | Dados consulares — cidadãos, documentos, agendamentos |
| `si_db` | SI | Conteúdo institucional — páginas, menus, media |
| `wn_db` | WN | Notícias — artigos, categorias, comentários |
| `gpj_db` | GPJ | Projectos — tarefas, sprints, acompanhamento |

Esta separação garante **isolamento de dados**: uma migração falhada no SGC não afecta a disponibilidade do SI, e cada equipa pode evoluir o seu esquema de forma independente.

### Mapeamento de tipos

A `BaseEntity` em `ecossistema-commons` define as convenções de persistência:

| Java | PostgreSQL | Notas |
|---|---|---|
| `UUID` (`GenerationType.UUID`) | `uuid` | Tipo nativo, indexação eficiente via B-tree |
| `Instant` | `TIMESTAMP WITH TIME ZONE` | Armazenado internamente em UTC pelo PostgreSQL |
| `@Version Long` | `BIGINT` | Controlo de concorrência optimista (JPA) |

Os campos de auditoria (`createdAt`, `updatedAt`, `createdBy`, `updatedBy`) são preenchidos automaticamente via JPA Auditing (`@EnableJpaAuditing`) e `AuditorAware`, que extrai o identificador do utilizador autenticado a partir do *token* JWT.

### Migrações com Flyway

Cada serviço mantém o seu próprio conjunto de migrações Flyway em `src/main/resources/db/migration/`. As migrações seguem a convenção `V{versão}__{descrição}.sql` e são aplicadas automaticamente ao arranque da aplicação. Isto garante que o esquema da base de dados é **versionado, reprodutível e auditável**.

### Alternativas consideradas

1. **MySQL 8** — Rejeitada. O suporte a UUID no MySQL requer armazenamento como `BINARY(16)` ou `CHAR(36)`, sem tipo nativo, o que complica consultas e indexação. As capacidades de JSON e pesquisa *full-text* são menos robustas do que no PostgreSQL.

2. **MongoDB** — Rejeitada. Uma base de dados documental não oferece garantias ACID transaccionais ao nível exigido para dados consulares. A ausência de esquema (*schemaless*) dificulta a validação de integridade referencial entre entidades como cidadãos, documentos e agendamentos.

3. **Base de dados única multi-tenant** — Rejeitada. Colocar todos os sistemas numa única base de dados com separação por *schema* criaria acoplamento ao nível das migrações, backups e permissões. Uma falha ou migração destrutiva num *schema* poderia afectar a disponibilidade dos restantes.

## Consequências

### Positivas

- **Integridade transaccional** — garantias ACID completas para todas as operações consulares, com suporte nativo a *foreign keys*, *constraints* e *triggers*.
- **Suporte nativo a UUID** — o tipo `uuid` do PostgreSQL ocupa apenas 16 bytes, com indexação B-tree eficiente, eliminando a necessidade de conversões ou armazenamento em texto.
- **Timestamps com fuso horário** — `TIMESTAMP WITH TIME ZONE` armazena internamente em UTC e converte automaticamente na leitura, alinhando-se com o padrão `Instant` do Java.
- **Capacidades avançadas** — JSON/JSONB para dados semi-estruturados, pesquisa *full-text* em Português e Alemão (útil para o WN e SI), e extensões como `pg_trgm` para pesquisa *fuzzy*.
- **Integração madura com Spring Data JPA** — o dialecto PostgreSQL do Hibernate mapeia correctamente todos os tipos utilizados na `BaseEntity`.
- **Um caminho de migração por serviço** — cada Flyway gere apenas o esquema do seu sistema, simplificando o versionamento e os *rollbacks*.

### Negativas

- **Quatro bases de dados para gerir** — backups, monitorização e *tuning* devem ser configurados para cada base de dados individualmente, aumentando a carga operacional.
- **Consultas entre sistemas** — a separação por base de dados impede *joins* directos entre sistemas. Quando necessário, a comunicação deve ser feita via APIs REST, aceitando eventual consistência.
- **Consumo de recursos** — embora partilhem a mesma instância PostgreSQL, quatro bases de dados consomem mais memória do que uma única, especialmente com *connection pools* independentes.

---

*Esta decisão deve ser revisitada caso surjam requisitos de replicação geográfica ou caso o volume de dados justifique a introdução de particionamento ou read-replicas.*
