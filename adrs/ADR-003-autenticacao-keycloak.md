# ADR-003: Autenticação com Keycloak e JWT

**Data:** 2026-02-16
**Estado:** Aceite

---

## Contexto

O Ecossistema Digital da Embaixada de Angola na Alemanha é composto por quatro sistemas (SGC, SI, WN, GPJ), uma aplicação móvel e uma biblioteca partilhada. Todos estes componentes necessitam de um mecanismo de autenticação e autorização unificado.

Existem dois grandes grupos de utilizadores:

- **Funcionários da Embaixada** — cônsules, oficiais administrativos, editores de conteúdo e administradores de sistema, localizados na Alemanha (CET/CEST).
- **Cidadãos** — membros da diáspora angolana que acedem a serviços consulares online, localizados predominantemente em Angola (WAT/UTC+1) e na Alemanha.

Os papéis definidos para o ecossistema são: `ADMIN`, `CONSUL`, `OFFICER`, `CITIZEN`, `EDITOR` e `VIEWER`. Cada sistema utiliza um subconjunto destes papéis, mas a identidade do utilizador deve ser transversal a todos.

Sendo um sistema governamental, a **soberania dos dados** é um requisito fundamental: os dados de autenticação dos cidadãos e funcionários não podem ser armazenados em plataformas de terceiros fora do controlo da Embaixada.

## Decisão

Adoptamos o **Keycloak** como fornecedor de identidade (*Identity Provider*), utilizando o protocolo **OAuth 2.0 / OpenID Connect (OIDC)** com *tokens* JWT.

### Configuração do Realm

- Um único *realm* denominado `embaixada` para todos os sistemas.
- Cada sistema é registado como um *client* OIDC no Keycloak (e.g., `sgc-backend`, `sgc-frontend`, `gpj-backend`).
- Os papéis são definidos ao nível do *realm* (`realm_access.roles`) para garantir transversalidade.

### Integração com Spring Security

Cada *backend* Spring Boot funciona como **Resource Server** (sem estado), validando *tokens* JWT em cada pedido. A integração é feita através do módulo `commons-security` da biblioteca partilhada:

```java
@Component
public class KeycloakJwtConverter implements Converter<Jwt, AbstractAuthenticationToken> {

    @Override
    public AbstractAuthenticationToken convert(Jwt jwt) {
        var realmAccess = jwt.getClaimAsMap("realm_access");
        var roles = (Collection<String>) realmAccess.get("roles");
        var authorities = roles.stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
                .collect(Collectors.toList());
        return new JwtAuthenticationToken(jwt, authorities, jwt.getSubject());
    }
}
```

O mapeamento `realm_access.roles` -> `ROLE_*` do Spring Security permite a utilização de anotações standard:

```java
@PreAuthorize("hasRole('CONSUL')")
public ResponseEntity<VistoDTO> aprovarVisto(@PathVariable UUID id) { ... }
```

### Desactivação em testes

Para facilitar os testes unitários e de integração, a segurança Keycloak pode ser desactivada via propriedade:

```yaml
# application-test.yml
app:
  security:
    enabled: false
```

A classe de configuração utiliza `@ConditionalOnProperty(name = "app.security.enabled", havingValue = "true", matchIfMissing = true)` para activar a segurança por defeito e permitir a sua desactivação explícita em perfis de teste.

### Integração com Angular e React Native

Os *frontends* Angular utilizam a biblioteca `keycloak-angular` para interceptar pedidos HTTP e injectar o *token* JWT no cabeçalho `Authorization: Bearer <token>`. A aplicação React Native utiliza `react-native-app-auth` para o fluxo PKCE.

### Alternativas consideradas

1. **Autenticação personalizada** (*custom auth*) — Rejeitada. Implementar autenticação, gestão de sessões, recuperação de palavras-passe e MFA de raiz representa um risco de segurança significativo. Os custos de auditoria e manutenção seriam desproporcionados.

2. **Auth0 / Firebase Authentication** — Rejeitada. Ambas as plataformas são serviços *cloud* geridos por terceiros (Okta e Google, respectivamente). Para um sistema governamental, delegar a gestão de identidades a um fornecedor externo levanta questões sérias de soberania de dados e conformidade regulamentar. Adicionalmente, o *vendor lock-in* dificultaria uma eventual migração.

3. **Spring Authorization Server** — Considerada mas preterida. Embora seja uma solução Java nativa, não oferece uma interface de administração de utilizadores, gestão de *realms*, *social login* nem federação de identidades *out of the box*. O Keycloak fornece tudo isto com uma interface web madura.

## Consequências

### Positivas

- **Single Sign-On (SSO)** — um utilizador autenticado num sistema (e.g., SGC) pode aceder aos restantes (SI, WN, GPJ) sem nova autenticação, desde que o *token* seja válido.
- **Gestão centralizada de utilizadores** — a consola de administração do Keycloak permite gerir utilizadores, papéis e sessões sem intervenção no código.
- **Soberania de dados** — o Keycloak é *self-hosted*, correndo como contentor Docker na infraestrutura controlada pela Embaixada. Nenhum dado de autenticação sai do perímetro.
- **Padrão sem estado** — o modelo *Resource Server* com JWT elimina a necessidade de sessões no servidor, simplificando o *scaling* horizontal futuro.
- **Reutilização via commons** — o `KeycloakJwtConverter` e as configurações de segurança residem em `commons-security`, garantindo implementação uniforme em todos os *backends*.

### Negativas

- **Complexidade operacional** — o Keycloak é uma aplicação Java robusta que requer a sua própria base de dados PostgreSQL, configuração de *realm* e monitorização.
- **Curva de aprendizagem** — a configuração inicial de *clients*, *mappers* e *flows* no Keycloak pode ser complexa para quem não tem experiência prévia com o produto.
- **Dependência crítica** — se o Keycloak ficar indisponível, nenhum sistema do ecossistema poderá autenticar novos utilizadores (os *tokens* já emitidos continuam válidos até expirar).

---

*Esta decisão deve ser revisitada caso surjam requisitos de federação com outros sistemas governamentais angolanos ou caso se migre para uma infraestrutura cloud soberana.*
