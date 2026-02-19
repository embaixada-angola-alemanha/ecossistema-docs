# Configuracao dos Canais de Suporte — Ecossistema Digital

## Embaixada da Republica de Angola na Alemanha

---

## Canal 1: Grupo WhatsApp "Ecossistema Suporte"

### Membros

| Papel | Nome | Responsabilidade |
|-------|------|------------------|
| IT Lead | __________________ | Triagem e resolucao de nivel 1 |
| Desenvolvedor | __________________ | Resolucao tecnica de nivel 2 |
| Consul | __________________ | Aprovacao de decisoes criticas |

### Regras de Utilizacao

- **Horario de funcionamento:** Segunda a Sexta, 09:00 - 17:00 (CET)
- **Uso exclusivo:** Problemas urgentes que impedem o trabalho (sistema indisponivel, erros criticos)
- **Formato da mensagem:** Indicar sempre o sistema afetado e uma descricao breve
- **Tempo de resposta esperado:** 30 minutos durante horario de funcionamento
- **Fora de horario:** Apenas para situacoes criticas (sistema totalmente indisponivel)
- **Proibido:** Pedidos de novas funcionalidades, questoes nao relacionadas com o sistema

---

## Canal 2: Email support@embaixada-angola.site

### Finalidade

- Problemas nao urgentes que nao impedem o trabalho
- Pedidos de novas funcionalidades (feature requests)
- Sugestoes de melhoria
- Relatorios de erros menores (problemas visuais, textos incorretos)

### Tempo de Resposta

- **Confirmacao de recepcao:** 24 horas uteis
- **Resolucao estimada:** Comunicada na confirmacao, conforme prioridade

---

## Modelo de Reporte de Problemas

Todos os problemas devem ser reportados utilizando o seguinte modelo:

```
SISTEMA: [SGC / SI / WN / GPJ / Keycloak / Outro]

SEVERIDADE: [Critico / Alto / Medio / Baixo]

  Critico — Sistema indisponivel, dados perdidos, seguranca comprometida
  Alto    — Funcionalidade principal nao funciona, sem alternativa disponivel
  Medio   — Funcionalidade secundaria afetada, existe alternativa manual
  Baixo   — Problema visual, melhoria desejada, questao de usabilidade

DESCRICAO:
[Descrever o problema de forma clara e objetiva]

PASSOS PARA REPRODUZIR:
1. [Passo 1]
2. [Passo 2]
3. [Passo 3]

RESULTADO ESPERADO:
[O que deveria acontecer]

RESULTADO OBTIDO:
[O que aconteceu de facto]

CAPTURA DE ECRA:
[Anexar captura de ecra se possivel]

BROWSER / DISPOSITIVO:
[Ex: Chrome 120, Windows 11 / Safari, iPhone 15]
```

---

## Matriz de Escalacao

| Nivel | Responsavel | Tempo de Resposta | Tipo de Problema |
|-------|-------------|-------------------|------------------|
| L1 | IT Lead | 30 minutos | Problemas comuns, reset de password, orientacao ao utilizador |
| L2 | Equipa Dev | 2 horas | Erros de aplicacao, bugs funcionais, problemas de integracao |
| L3 | Infraestrutura | 4 horas | Servidor indisponivel, base de dados, rede, certificados TLS |

### Processo de Escalacao

1. **L1 — IT Lead** recebe o problema e tenta resolver
2. Se nao for resolvido em **1 hora**, escalar para **L2 — Equipa Dev**
3. Se for problema de infraestrutura, escalar diretamente para **L3**
4. Se envolver **perda de dados** ou **seguranca**, notificar o **Consul imediatamente**
5. Todos os problemas criticos devem ter um **post-mortem** em 24 horas

---

## Agenda das Primeiras 2 Semanas (Pos-Go-Live)

### Standup Diario

- **Horario:** 09:00 (CET), duracao maxima 15 minutos
- **Participantes:** IT Lead, Desenvolvedor
- **Formato:**
  - Estado dos servicos (health check matinal)
  - Problemas reportados desde o ultimo standup
  - Acoes necessarias para o dia

### Revisao Semanal

- **Horario:** Sexta-feira, 16:00 (CET), duracao 30 minutos
- **Participantes:** IT Lead, Desenvolvedor, Consul
- **Formato:**
  - Resumo da semana: incidentes, resolucoes, metricas
  - Feedback dos utilizadores
  - Planeamento de melhorias para a semana seguinte

---

## FAQ — Perguntas Frequentes Iniciais

### Como redefinir a minha palavra-passe?

1. Aceder a `https://auth.embaixada-angola.site`
2. Clicar em "Esqueci a minha palavra-passe"
3. Introduzir o email registado
4. Seguir as instrucoes enviadas por email
5. Se nao receber o email, contactar o IT Lead via WhatsApp

### Como limpar a cache do browser?

- **Chrome:** Ctrl+Shift+Delete -> selecionar "Imagens e ficheiros em cache" -> Limpar dados
- **Firefox:** Ctrl+Shift+Delete -> selecionar "Cache" -> Limpar agora
- **Safari:** Cmd+Option+E
- Apos limpar a cache, recarregar a pagina com Ctrl+F5

### Como reportar um problema (bug)?

1. Tirar uma captura de ecra do problema (tecla PrintScreen ou Cmd+Shift+4)
2. Anotar os passos que levaram ao problema
3. Se for **urgente** (sistema nao funciona): enviar no grupo WhatsApp "Ecossistema Suporte"
4. Se for **nao urgente**: enviar email para support@embaixada-angola.site
5. Utilizar o modelo de reporte descrito neste documento

### Nao consigo aceder ao sistema. O que fazer?

1. Verificar a ligacao a internet
2. Tentar aceder com outro browser
3. Limpar a cache do browser (ver acima)
4. Se o problema persistir, contactar o IT Lead
5. Indicar qual o sistema (SGC, SI, WN, GPJ) e a mensagem de erro
