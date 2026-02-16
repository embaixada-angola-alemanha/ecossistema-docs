# ADR-005: Internacionalização (i18n)

**Data:** 2026-02-16
**Estado:** Aceite

---

## Contexto

A Embaixada de Angola na Alemanha serve dois públicos com línguas maternas distintas:

- **Cidadãos angolanos** — membros da diáspora que utilizam os serviços consulares e consomem notícias em Português.
- **Comunidade local alemã** — cidadãos e entidades que necessitam de informação institucional em Alemão.

A equipa interna inclui funcionários que comunicam em Inglês e, pontualmente, em Crioulo Santomense. Para garantir acessibilidade, todos os textos de interface, mensagens de erro, notificações por e-mail e conteúdo de ajuda devem ser traduzíveis.

O ecossistema opera em dois fusos horários — Angola (WAT/UTC+1) e Alemanha (CET/CEST). Os *timestamps* devem ser armazenados de forma neutra e formatados na camada de apresentação conforme o fuso e o *locale* do utilizador.

## Decisão

Adoptamos uma estratégia de internacionalização centralizada no módulo `commons-i18n` da biblioteca `ecossistema-commons`, partilhada por todos os *backends*.

### Locales suportados

| Código | Língua | Papel |
|---|---|---|
| `PT` | Português (Europeu) | Predefinido (*default*) |
| `DE` | Alemão | Público local e documentação oficial na Alemanha |
| `EN` | Inglês | Comunicação internacional e equipa técnica |
| `CS` | Crioulo Santomense | Comunidade são-tomense na diáspora |

### Resolução do locale

O `AcceptHeaderLocaleResolver` resolve o *locale* a partir do cabeçalho HTTP `Accept-Language`. Quando o cabeçalho está ausente ou contém um *locale* não suportado, o sistema utiliza **Português como *fallback***. O `enum SupportedLocale` valida e normaliza os códigos recebidos, garantindo que apenas os quatro *locales* acima são aceites.

### Ficheiros de mensagens

O módulo `commons-i18n` fornece um `ReloadableResourceBundleMessageSource` com o *basename* `classpath:i18n/messages`. As mensagens são organizadas por *locale*: `messages.properties` (PT), `messages_de.properties`, `messages_en.properties` e `messages_cs.properties`. Cada serviço pode definir mensagens adicionais no mesmo formato.

### MessageService

O `MessageService` encapsula o `MessageSource` do Spring, resolvendo mensagens traduzidas a partir do `LocaleContextHolder` ou de um `Locale` explícito. É utilizado em controladores, serviços e *exception handlers* para devolver erros na língua do chamador.

### Timestamps e fusos horários

Todos os *timestamps* são armazenados como `Instant` (UTC) na base de dados (conforme ADR-004). A conversão para o fuso horário do utilizador ocorre exclusivamente na **camada de apresentação** — nos *frontends* Angular e React Native — com base no fuso detectado no navegador ou configurado no perfil do utilizador.

### Auto-configuração

O módulo utiliza `@AutoConfiguration` do Spring Boot para registar automaticamente o `AcceptHeaderLocaleResolver`, o `MessageSource` e o `MessageService` em qualquer *backend* que inclua a dependência Maven. Nenhuma configuração adicional é necessária.

### Alternativas consideradas

1. **i18n apenas no *frontend*** — Rejeitada. Não cobre mensagens de erro da API, notificações por e-mail, PDFs gerados no servidor nem mensagens de validação. O utilizador receberia mensagens mistas (interface traduzida, erros em inglês).

2. **ICU MessageFormat** — Rejeitada. Oferece pluralização e género avançados, mas adiciona uma dependência pesada e curva de aprendizagem significativa. O `MessageFormat` standard do Java é suficiente para as necessidades actuais.

3. **Língua única (Português)** — Rejeitada. Excluiria a comunidade germanófona local e impossibilitaria a comunicação com entidades oficiais alemãs.

## Consequências

### Positivas

- **Consistência entre serviços** — todos os *backends* utilizam o mesmo mecanismo de i18n via auto-configuração do `commons-i18n`, eliminando implementações ad-hoc.
- **Erros de API na língua do chamador** — os *exception handlers* utilizam o `MessageService` para traduzir mensagens de erro, melhorando a experiência do utilizador.
- **E-mails traduzidos** — os *templates* de notificação aceitam um parâmetro de *locale*, permitindo o envio na língua preferida do destinatário.
- **Extensibilidade** — adicionar um novo *locale* requer apenas a criação dos ficheiros `messages_xx.properties` e uma entrada no `enum SupportedLocale`.
- **Separação de preocupações** — *timestamps* armazenados em UTC e formatados apenas na apresentação, evitando erros de conversão.

### Negativas

- **Manutenção de traduções** — cada nova funcionalidade exige a adição de chaves em quatro ficheiros de mensagens, aumentando o esforço de desenvolvimento.
- **Cobertura do Crioulo Santomense** — a disponibilidade de tradutores para CS pode ser limitada, resultando em cobertura parcial nas fases iniciais.
- **Chaves em falta silenciosas** — se uma chave não existir num *locale*, o Spring devolve a mensagem em PT sem aviso, podendo mascarar traduções em falta.

---

*Esta decisão deve ser revisitada caso surjam requisitos de suporte a línguas adicionais (e.g., Francês para a comunidade diplomática) ou caso o volume de traduções justifique a adopção de uma plataforma como Crowdin ou Weblate.*
