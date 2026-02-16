# ADR-002: Estratégia Multi-Repo

**Data:** 2026-02-16
**Estado:** Aceite

---

## Contexto

O Ecossistema Digital da Embaixada de Angola na Alemanha é composto por múltiplos componentes com ciclos de vida distintos:

- 4 sistemas aplicacionais: SGC, SI, WN e GPJ (cada um com *backend* Spring Boot e *frontend* Angular).
- 1 biblioteca partilhada: `ecossistema-commons` (6 módulos Maven).
- 1 aplicação móvel em React Native.
- 1 repositório de infraestrutura (Docker Compose, configurações nginx, scripts PostgreSQL 16, configuração Keycloak e Redis 7).
- 1 repositório de documentação (ADRs, diagramas, glossário, templates).
- Configurações de CI/CD (`.github/`) por repositório.

No total, são 12 repositórios sob a organização GitHub `embaixada-angola-alemanha`. É necessário definir a estratégia de gestão de código-fonte que melhor equilibre autonomia, rastreabilidade e simplicidade.

## Decisão

Adoptamos uma **estratégia multi-repo** com a seguinte estrutura:

| # | Repositório | Conteúdo |
|---|---|---|
| 1 | `ecossistema-commons` | Biblioteca partilhada (Maven, 6 módulos) |
| 2 | `sgc-backend` | API REST do Sistema de Gestão Consular |
| 3 | `sgc-frontend` | Interface Angular do SGC |
| 4 | `si-backend` | API REST do Sítio Institucional |
| 5 | `si-frontend` | Interface Angular do SI |
| 6 | `wn-backend` | API REST do Portal de Notícias |
| 7 | `wn-frontend` | Interface Angular do WN |
| 8 | `gpj-backend` | API REST da Gestão de Projectos |
| 9 | `gpj-frontend` | Interface Angular do GPJ |
| 10 | `ecossistema-mobile` | Aplicação React Native |
| 11 | `ecossistema-infra` | Docker Compose, nginx, PostgreSQL, Keycloak, Redis |
| 12 | `ecossistema-docs` | Documentação, ADRs, diagramas, glossário |

A biblioteca `ecossistema-commons` é versionada como artefacto Maven com versão `SNAPSHOT` durante o desenvolvimento activo. Cada repositório de *backend* declara a dependência no `pom.xml`:

```xml
<dependency>
    <groupId>ao.gov.embaixada.alemanha</groupId>
    <artifactId>ecossistema-commons</artifactId>
    <version>0.1.0-SNAPSHOT</version>
</dependency>
```

### Alternativas consideradas

1. **Monorepo** — Rejeitada. Embora simplifique o *tooling* (uma única árvore de dependências, um único pipeline), o raio de impacto de cada alteração é demasiado amplo. Um *commit* num *frontend* poderia desencadear pipelines de todos os *backends*. Para uma equipa reduzida, o custo de manter um pipeline monorepo sofisticado (com detecção de alterações por directório) não se justifica.

2. **Polyrepo sem biblioteca partilhada** — Rejeitada. Sem `ecossistema-commons`, cada serviço duplicaria lógica de segurança (integração Keycloak/JWT), auditoria, DTOs e internacionalização. A divergência entre implementações criaria inconsistências e vulnerabilidades difíceis de diagnosticar.

### Convenções de branching

- Ramo principal: `main` (protegido, requer *pull request*).
- Ramos de funcionalidade: `feature/T{sprint}.{seq}-descricao` (e.g., `feature/T1.2-crud-projectos`).
- Ramos de correcção: `fix/descricao-breve`.
- *Branch protection* configurado individualmente por repositório.

### Fluxo de desenvolvimento com commons

1. Alterar o código em `ecossistema-commons`.
2. Executar `mvn clean install` para publicar o artefacto SNAPSHOT no repositório Maven local.
3. No repositório do serviço consumidor, a dependência SNAPSHOT é automaticamente resolvida.
4. Quando estável, publicar uma versão *release* (e.g., `0.1.0`).

## Consequências

### Positivas

- **Ciclo de vida independente** — cada repositório pode ser versionado, *tagged* e *deployed* de forma autónoma, sem afectar outros componentes.
- **Permissões granulares** — é possível configurar acessos diferenciados por repositório (e.g., um contribuidor externo com acesso apenas ao `si-frontend`).
- **CI/CD isolado** — cada repositório tem o seu próprio *workflow* GitHub Actions, reduzindo tempos de *build* e simplificando a configuração.
- **Clareza organizacional** — a estrutura dos repositórios reflecte directamente a arquitectura do sistema.

### Negativas

- **Instalação local obrigatória** — o fluxo de desenvolvimento com `ecossistema-commons` exige `mvn install` local antes de compilar serviços dependentes, até que se configure um registo de artefactos (e.g., GitHub Packages).
- **Coordenação de versões** — actualizações ao commons requerem verificação manual de compatibilidade em todos os repositórios consumidores.
- **Overhead de configuração** — cada repositório necessita da sua própria configuração de CI/CD, *branch protection* e *issue templates*, o que multiplica o esforço inicial de *setup*.

---

*Esta decisão deve ser revisitada caso a equipa cresça significativamente ou caso se adopte um registo de artefactos Maven centralizado.*
