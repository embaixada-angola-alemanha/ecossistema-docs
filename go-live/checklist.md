# Checklist de Go-Live — Ecossistema Digital

## Embaixada da Republica de Angola na Alemanha

**Dominio:** embaixada-angola.site
**Infraestrutura:** Strato VPS com Docker Compose
**Data prevista de Go-Live:** ____/____/______

---

## Fase 1: Pre-Go-Live (T-7 dias)

### Servicos e Aplicacoes

- [ ] Todos os containers Docker estao saudaveis (`docker compose --env-file .env.production ps`)
- [ ] SGC Backend responde em `https://api-sgc.embaixada-angola.site/actuator/health`
- [ ] SI Backend responde em `https://api-si.embaixada-angola.site/actuator/health`
- [ ] WN Backend responde em `https://api-wn.embaixada-angola.site/actuator/health`
- [ ] GPJ Backend responde em `https://api-gpj.embaixada-angola.site/actuator/health`
- [ ] Keycloak responde em `https://auth.embaixada-angola.site/health`
- [ ] SGC Frontend acessivel em `https://sgc.embaixada-angola.site`
- [ ] SI Frontend acessivel em `https://si.embaixada-angola.site`
- [ ] WN Frontend acessivel em `https://wn.embaixada-angola.site`
- [ ] GPJ Frontend acessivel em `https://gpj.embaixada-angola.site`
- [ ] Grafana acessivel em `https://grafana.embaixada-angola.site`

### Testes em Staging

- [ ] Ambiente de staging totalmente testado (subdominos stg-*)
- [ ] Fluxos consulares testados ponto a ponto no staging
- [ ] Testes de carga executados com resultados aceitaveis (p95 < 2s)
- [ ] Testes de integracao entre modulos aprovados

### Migracao de Dados

- [ ] Dados migrados do sistema anterior verificados
- [ ] Contagem de registos confere com a origem
- [ ] Dados de teste removidos da base de producao
- [ ] Integridade referencial validada em todas as bases (sgc_db, si_db, wn_db, gpj_db)

### Certificados TLS

- [ ] Certificados emitidos via Certbot para todos os subdominios
- [ ] Validade dos certificados verificada (minimo 60 dias)
- [ ] Renovacao automatica do Certbot configurada e testada
- [ ] HTTPS forcado em todos os subdominios (redirect HTTP -> HTTPS)

### Sistema de Backup

- [ ] Backup diario das bases de dados configurado (cron 02:00 UTC)
- [ ] Backup testado com restauro completo bem-sucedido
- [ ] Retencao de 30 dias configurada
- [ ] Backup do MinIO/armazenamento de ficheiros operacional
- [ ] Backups armazenados em localizacao separada do VPS

### Monitorizacao e Alertas

- [ ] Prometheus a recolher metricas de todos os servicos
- [ ] Dashboards do Grafana configurados (Overview, SGC, Database, Redis)
- [ ] Alertas configurados para: servico indisponivel, CPU > 80%, disco > 85%, erros 5xx
- [ ] Alertas a enviar notificacoes para o grupo WhatsApp de suporte
- [ ] Logs centralizados e acessiveis

### Contas de Utilizador no Keycloak

- [ ] Realm `ecossistema` configurado em `https://auth.embaixada-angola.site/admin`
- [ ] Contas de administrador criadas e testadas
- [ ] Contas de oficiais consulares criadas e testadas
- [ ] Papeis (roles) atribuidos corretamente: sgc-officer, sgc-admin, gpj-admin, sgc-viewer, gpj-viewer
- [ ] Politica de palavras-passe configurada (minimo 12 caracteres)
- [ ] Sessoes configuradas com tempo de expiracao adequado

### Formacao do Pessoal

- [ ] Sessao de formacao SGC realizada para oficiais consulares
- [ ] Sessao de formacao GPJ realizada para gestores de projetos
- [ ] Manual de utilizador distribuido
- [ ] Contactos de suporte partilhados com todos os utilizadores
- [ ] FAQ disponivel para consulta

---

## Fase 2: Corte DNS (Dia D)

### Preparacao DNS (T-48h)

- [ ] TTL de todos os registos DNS reduzido para 300 (5 minutos)
- [ ] Propagacao do TTL baixo confirmada

### Criacao de Registos DNS no Painel Strato

- [ ] Registo A: embaixada-angola.site -> <VPS_IP>
- [ ] Registo A: sgc.embaixada-angola.site -> <VPS_IP>
- [ ] Registo A: si.embaixada-angola.site -> <VPS_IP>
- [ ] Registo A: wn.embaixada-angola.site -> <VPS_IP>
- [ ] Registo A: gpj.embaixada-angola.site -> <VPS_IP>
- [ ] Registo A: api-sgc.embaixada-angola.site -> <VPS_IP>
- [ ] Registo A: api-si.embaixada-angola.site -> <VPS_IP>
- [ ] Registo A: api-wn.embaixada-angola.site -> <VPS_IP>
- [ ] Registo A: api-gpj.embaixada-angola.site -> <VPS_IP>
- [ ] Registo A: auth.embaixada-angola.site -> <VPS_IP>
- [ ] Registo A: grafana.embaixada-angola.site -> <VPS_IP>

### Verificacao Pos-Corte

- [ ] Propagacao DNS verificada: `dig +short sgc.embaixada-angola.site`
- [ ] TLS verificado em todos os subdominios
- [ ] Todos os frontends acessiveis via browser
- [ ] Todos os endpoints de API a responder HTTP 200
- [ ] Login via Keycloak funcional

---

## Fase 3: Pos-Corte (D+1)

### Verificacao Funcional

- [ ] Todos os servicos acessiveis a partir de redes externas
- [ ] Fluxo de login completo testado (login -> dashboard -> logout)
- [ ] Fluxo consular SGC testado: criar processo, atualizar estado, gerar documento
- [ ] Fluxo SI testado: submeter pedido, aprovar, emitir
- [ ] Fluxo WN testado: publicar noticia, visualizar no portal
- [ ] Fluxo GPJ testado: criar projeto, adicionar tarefa, atualizar progresso

### Monitorizacao

- [ ] Dashboards do Grafana a apresentar dados em tempo real
- [ ] Alertas a disparar corretamente (testar com alerta de teste)
- [ ] Logs de todos os servicos sem erros criticos

### Redireccionamento do Dominio Antigo

- [ ] botschaftangola.de configurado com redirect 301 para embaixada-angola.site
- [ ] Redirect testado em browser (desktop e mobile)
- [ ] Paginas antigas do WordPress desativadas ou colocadas em modo de manutencao

---

## Fase 4: Estabilizacao (D+7)

### Verificacoes Diarias

- [ ] Dia D+1: health check completo, revisao de logs
- [ ] Dia D+2: health check completo, revisao de logs
- [ ] Dia D+3: health check completo, revisao de logs
- [ ] Dia D+4: health check completo, revisao de logs
- [ ] Dia D+5: health check completo, revisao de logs
- [ ] Dia D+6: health check completo, revisao de logs
- [ ] Dia D+7: health check completo, revisao de logs

### Feedback e Correcoes

- [ ] Feedback recolhido dos utilizadores
- [ ] Problemas reportados registados e priorizados
- [ ] Correcoes criticas aplicadas
- [ ] Baseline de desempenho registado (tempos de resposta, uso de recursos)

---

## Plano de Rollback

Caso ocorram problemas criticos que nao possam ser resolvidos em 2 horas:

- [ ] **Passo 1:** Reverter registos DNS para apontar para o WordPress antigo (botschaftangola.de)
- [ ] **Passo 2:** Desativar servicos Docker: `docker compose --env-file .env.production down`
- [ ] **Passo 3:** Verificar que o site antigo esta acessivel
- [ ] **Passo 4:** Notificar utilizadores sobre o rollback
- [ ] **Passo 5:** Documentar o motivo do rollback e planear nova data de go-live

**Nota:** Apos rollback, o TTL baixo (300s) garante propagacao rapida. Restaurar TTL para 3600 apos estabilizacao.

---

## Aprovacao e Sign-Off

| Papel | Nome | Assinatura | Data |
|-------|------|------------|------|
| Consul / Diretor | __________________ | __________ | ____/____/____ |
| IT Lead | __________________ | __________ | ____/____/____ |
| Equipa de Desenvolvimento | __________________ | __________ | ____/____/____ |
| Responsavel de Dados | __________________ | __________ | ____/____/____ |

**Decisao final:** [ ] Go-Live aprovado / [ ] Go-Live adiado

**Observacoes:**

_______________________________________________________________________________

_______________________________________________________________________________

_______________________________________________________________________________
