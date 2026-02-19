# Guia do Utilizador -- GPJ (Gestao de Projectos)

**Dominio:** gpj.embaixada-angola.site
**Audiencia:** IT Lead, Gestao de Projecto
**Ultima actualizacao:** 2026-02-19

---

## Indice

1. [Dashboard](#1-dashboard)
2. [Gestao de Sprints](#2-gestao-de-sprints)
3. [Gestao de Tarefas](#3-gestao-de-tarefas)
4. [Equipa](#4-equipa)
5. [Relatorios](#5-relatorios)

---

## 1. Dashboard

### 1.1 Acesso

Aceda ao GPJ em **https://gpj.embaixada-angola.site** e autentique-se via Keycloak com as suas credenciais institucionais.

### 1.2 Vista Geral

O painel principal apresenta uma vista consolidada do estado de todos os projectos e sprints. Os indicadores-chave (KPIs) sao apresentados no topo da pagina:

| Indicador             | Descricao                                                    |
|-----------------------|--------------------------------------------------------------|
| Sprints Activos       | Numero de sprints actualmente em execucao                    |
| Tarefas por Estado    | Distribuicao de tarefas por estado (Backlog, ToDo, etc.)     |
| Progresso Global      | Percentagem de conclusao do projecto actual                  |
| Horas Consumidas      | Total de horas registadas face ao total planeado             |

### 1.3 Elementos do Painel

O dashboard contem os seguintes elementos:

- **Resumo de Sprints** -- Lista dos sprints activos com barra de progresso e datas.
- **Tarefas Recentes** -- Ultimas tarefas actualizadas com estado e responsavel.
- **Grafico de Progresso** -- Representacao visual do avanco global do projecto.
- **Alertas** -- Tarefas atrasadas, sprints proximos do fim, ou bloqueios identificados.

### 1.4 Navegacao

O menu lateral esquerdo disponibiliza as seguintes seccoes:

- **Dashboard** -- Pagina inicial com indicadores
- **Sprints** -- Gestao de ciclos de desenvolvimento
- **Tarefas** -- Lista completa de tarefas do projecto
- **Equipa** -- Membros e atribuicoes
- **Relatorios** -- Graficos e exportacao de dados

---

## 2. Gestao de Sprints

### 2.1 Criar Sprint

1. No menu lateral, clique em **Sprints**.
2. Clique no botao **Novo Sprint**.
3. Preencha os campos:

| Campo          | Tipo   | Obrigatorio | Exemplo                                   |
|----------------|--------|-------------|-------------------------------------------|
| Nome           | Texto  | Sim         | Sprint 1 -- GPJ Core                      |
| Objectivo      | Texto  | Sim         | Implementar CRUD de projectos e tarefas   |
| Data de Inicio | Data   | Sim         | 2026-03-01                                |
| Data de Fim    | Data   | Sim         | 2026-03-14                                |

4. Clique em **Criar Sprint**.

### 2.2 Planear Sprint

O planeamento consiste em seleccionar tarefas do backlog e atribui-las ao sprint:

1. Abra o sprint criado.
2. Aceda ao separador **Planeamento**.
3. No painel esquerdo, visualize as tarefas disponiveis no backlog.
4. Arraste tarefas do backlog para o painel do sprint, ou seleccione e clique em **Adicionar ao Sprint**.
5. Para cada tarefa adicionada, confirme ou ajuste:
   - Responsavel
   - Estimativa de horas
   - Prioridade
6. Revise a capacidade da equipa face ao total de horas planeadas.
7. Clique em **Confirmar Planeamento**.

### 2.3 Executar Sprint

Durante a execucao do sprint:

- As tarefas sao movidas entre estados no quadro Kanban (ver seccao 3).
- O grafico de burndown actualiza-se diariamente.
- Registos de horas sao efectuados nas tarefas individuais.
- Alertas sao gerados para tarefas bloqueadas ou atrasadas.

### 2.4 Rever Sprint

Ao final do sprint:

1. Clique em **Revisao** no sprint activo.
2. O sistema apresenta um resumo:
   - Tarefas concluidas vs. planeadas
   - Horas consumidas vs. estimadas
   - Objectivos atingidos
3. Adicione notas de retrospectiva (licoes aprendidas, melhorias).

### 2.5 Encerrar Sprint

1. Apos a revisao, clique em **Encerrar Sprint**.
2. Tarefas nao concluidas serao automaticamente movidas para o backlog ou para o proximo sprint, conforme configuracao.
3. O sprint passa ao estado **Concluido** e os dados ficam disponiveis nos relatorios.

---

## 3. Gestao de Tarefas

### 3.1 Criar Tarefa

1. No menu lateral, clique em **Tarefas**.
2. Clique no botao **Nova Tarefa**.
3. Preencha os campos:

| Campo               | Tipo          | Obrigatorio | Exemplo                              |
|---------------------|---------------|-------------|--------------------------------------|
| Titulo              | Texto         | Sim         | Implementar API de autenticacao      |
| Descricao           | Texto longo   | Sim         | Criar endpoints de login e logout    |
| Prioridade          | Seleccao      | Sim         | Alta, Media, Baixa                   |
| Estimativa (horas)  | Numero        | Sim         | 8                                    |
| Sprint              | Seleccao      | Nao         | Sprint 1 -- GPJ Core                |
| Responsavel         | Seleccao      | Nao         | (membro da equipa)                   |

4. Clique em **Criar Tarefa**.

### 3.2 Fluxo de Estados

Cada tarefa segue o seguinte fluxo de estados:

```
BACKLOG --> TODO --> IN_PROGRESS --> REVIEW --> DONE
```

| Estado       | Descricao                                                          |
|--------------|--------------------------------------------------------------------|
| BACKLOG      | Tarefa registada, ainda nao planeada para nenhum sprint            |
| TODO         | Tarefa planeada para o sprint actual, aguarda inicio               |
| IN_PROGRESS  | Tarefa em execucao activa por um membro da equipa                  |
| REVIEW       | Tarefa concluida pelo responsavel, aguarda revisao/validacao       |
| DONE         | Tarefa revista e aceite como concluida                             |

Para alterar o estado de uma tarefa:

- No **quadro Kanban**: arraste o cartao da tarefa para a coluna do novo estado.
- Na **pagina de detalhe**: clique no botao do estado desejado.

### 3.3 Atribuir Tarefa

1. Abra a tarefa pretendida.
2. No campo **Responsavel**, seleccione o membro da equipa.
3. O membro atribuido recebe uma notificacao do sistema.

Pode tambem atribuir tarefas directamente no quadro Kanban, clicando no avatar do responsavel no cartao da tarefa.

### 3.4 Adicionar Comentarios

1. Na pagina de detalhe da tarefa, desloque-se ate a seccao **Comentarios**.
2. Escreva o comentario no campo de texto.
3. Clique em **Publicar**.

Os comentarios servem para:

- Comunicar actualizacoes de progresso
- Registar decisoes ou impedimentos
- Partilhar informacao relevante com a equipa
- Solicitar esclarecimentos

### 3.5 Registo de Horas

1. Na pagina de detalhe da tarefa, clique em **Registar Horas**.
2. Indique o numero de horas e a data.
3. Adicione uma descricao breve da actividade realizada.
4. Clique em **Guardar**.

---

## 4. Equipa

### 4.1 Visualizar Membros

1. No menu lateral, clique em **Equipa**.
2. A lista apresenta todos os membros do projecto com:
   - Nome e funcao
   - Numero de tarefas atribuidas
   - Estado actual (disponivel, ocupado)

### 4.2 Atribuir Funcoes

As funcoes disponiveis no GPJ sao:

| Funcao              | Permissoes                                                          |
|---------------------|---------------------------------------------------------------------|
| IT Lead             | Acesso total, gestao de sprints, configuracoes do projecto          |
| Gestor de Projecto  | Criar sprints e tarefas, atribuir responsaveis, ver relatorios      |
| Programador         | Actualizar estado das tarefas atribuidas, registar horas, comentar  |
| Observador          | Acesso apenas de leitura a todo o projecto                          |

Para alterar a funcao de um membro:

1. Na lista de equipa, clique no nome do membro.
2. No campo **Funcao**, seleccione a nova funcao.
3. Clique em **Guardar**.

### 4.3 Vista de Carga de Trabalho

A vista de carga de trabalho apresenta:

- Horas atribuidas vs. capacidade disponivel por membro.
- Distribuicao de tarefas por estado para cada membro.
- Identificacao de membros sobrecarregados ou com capacidade disponivel.

Aceda a esta vista atraves do botao **Carga de Trabalho** no topo da pagina de equipa.

---

## 5. Relatorios

### 5.1 Sprint Burndown

O grafico de burndown mostra a evolucao diaria do trabalho restante no sprint:

- **Eixo horizontal** -- Dias do sprint
- **Eixo vertical** -- Horas restantes
- **Linha ideal** -- Trajectoria esperada de conclusao
- **Linha real** -- Progresso efectivo registado

Aceda em **Relatorios > Burndown** e seleccione o sprint pretendido.

### 5.2 Grafico de Velocidade (Velocity Chart)

O grafico de velocidade compara a quantidade de trabalho concluido em cada sprint:

- Apresenta os ultimos sprints concluidos.
- Mostra pontos/horas planeados vs. concluidos por sprint.
- Permite identificar tendencias de produtividade ao longo do tempo.

Aceda em **Relatorios > Velocidade**.

### 5.3 Distribuicao de Tarefas

Este relatorio apresenta a distribuicao de tarefas segundo diferentes criterios:

- **Por estado** -- Quantas tarefas em cada estado do fluxo.
- **Por prioridade** -- Distribuicao entre Alta, Media e Baixa.
- **Por responsavel** -- Carga de tarefas por membro da equipa.
- **Por sprint** -- Tarefas atribuidas a cada sprint.

Aceda em **Relatorios > Distribuicao**.

### 5.4 Exportacao de Dados

Todos os relatorios podem ser exportados nos seguintes formatos:

| Formato | Descricao                                          |
|---------|-----------------------------------------------------|
| CSV     | Dados tabulares para analise em folha de calculo    |
| PDF     | Relatorio formatado para impressao ou arquivo       |
| Excel   | Ficheiro .xlsx com graficos e formatacao preservada |

Para exportar:

1. Aceda ao relatorio pretendido.
2. Clique no botao **Exportar**.
3. Seleccione o formato desejado.
4. O ficheiro sera descarregado automaticamente.

---

**Suporte Tecnico:** Em caso de duvidas ou problemas tecnicos, contacte a equipa de TI atraves do email suporte@embaixada-angola.site.
