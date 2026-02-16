# C4 Context Diagram — Ecossistema Digital

Visão de contexto do sistema: actores externos e suas interacções com o ecossistema.

```mermaid
C4Context
    title Ecossistema Digital — Embaixada de Angola na Alemanha

    Person(citizen, "Cidadão", "Cidadão angolano na diáspora. Solicita serviços consulares.")
    Person(staff, "Funcionário Consular", "Cônsul, oficial ou editor. Gere processos e conteúdos.")
    Person(visitor, "Visitante", "Público geral. Consulta informações e notícias.")
    Person(admin, "Administrador", "Gere utilizadores, configurações e monitoriza o sistema.")

    System(sgc, "SGC", "Sistema de Gestão Consular. Registo de cidadãos, documentos, agendamentos.")
    System(si, "SI", "Sítio Institucional. Informações da embaixada, serviços, contactos.")
    System(wn, "WN", "Welwitschia Notícias. Portal de notícias e comunicados.")
    System(gpj, "GPJ", "Gestão de Projectos. Sprints, tarefas, progresso.")
    System(mobile, "App Móvel", "Aplicação React Native para cidadãos (iOS + Android).")

    System_Ext(keycloak, "Keycloak", "Servidor de identidade. SSO via OAuth2/OIDC.")
    System_Ext(email, "Servidor SMTP", "Envio de emails transaccionais e notificações.")
    System_Ext(minio, "MinIO", "Armazenamento de ficheiros (S3-compatible).")

    Rel(citizen, sgc, "Solicita serviços", "HTTPS")
    Rel(citizen, mobile, "Usa a aplicação", "HTTPS")
    Rel(staff, sgc, "Gere processos", "HTTPS")
    Rel(staff, gpj, "Gere projectos", "HTTPS")
    Rel(staff, wn, "Publica notícias", "HTTPS")
    Rel(visitor, si, "Consulta informações", "HTTPS")
    Rel(visitor, wn, "Lê notícias", "HTTPS")
    Rel(admin, keycloak, "Gere utilizadores", "HTTPS")

    Rel(sgc, keycloak, "Autentica", "OAuth2/OIDC")
    Rel(si, keycloak, "Autentica", "OAuth2/OIDC")
    Rel(wn, keycloak, "Autentica", "OAuth2/OIDC")
    Rel(gpj, keycloak, "Autentica", "OAuth2/OIDC")
    Rel(sgc, email, "Envia notificações", "SMTP")
    Rel(sgc, minio, "Armazena documentos", "S3 API")
```

## Actores

| Actor | Descrição | Sistemas |
|-------|-----------|----------|
| Cidadão | Angolano na diáspora, solicita serviços consulares | SGC, App Móvel |
| Funcionário Consular | Cônsul, oficial, editor — gere processos e conteúdos | SGC, GPJ, WN |
| Visitante | Público geral, consulta informações | SI, WN |
| Administrador | Gere utilizadores e configurações do sistema | Keycloak, todos |

## Sistemas Externos

| Sistema | Função |
|---------|--------|
| Keycloak | Identity Provider — SSO, gestão de utilizadores e roles |
| SMTP (MailHog em dev) | Envio de emails transaccionais |
| MinIO | Armazenamento de ficheiros (documentos, imagens) |
