# Guia do Utilizador -- SGC (Sistema de Gestao Consular)

**Dominio:** sgc.embaixada-angola.site
**Audiencia:** Consul, Funcionario Consular, Assistente Administrativo
**Ultima actualizacao:** 2026-02-19

---

## Indice

1. [Login e Navegacao](#1-login-e-navegacao)
2. [Gestao de Cidadaos](#2-gestao-de-cidadaos)
3. [Processo de Vistos](#3-processo-de-vistos)
4. [Agendamentos](#4-agendamentos)
5. [Documentos](#5-documentos)
6. [Relatorios](#6-relatorios)
7. [Referencia Rapida](#7-referencia-rapida)

---

## 1. Login e Navegacao

### 1.1 Acesso ao Sistema

O SGC esta disponivel no endereco **https://sgc.embaixada-angola.site**. O acesso requer autenticacao via Keycloak (Single Sign-On).

### 1.2 Procedimento de Login

1. Abra o navegador e aceda a **https://sgc.embaixada-angola.site**.
2. Sera redireccionado para a pagina de autenticacao do Keycloak.
3. Introduza o seu **nome de utilizador** (email institucional) e **palavra-passe**.
4. Clique em **Entrar**.
5. Apos autenticacao bem-sucedida, sera redireccionado para o painel principal do SGC.

**Nota:** Em caso de esquecimento da palavra-passe, utilize a opcao "Recuperar palavra-passe" na pagina de login do Keycloak. Um email de recuperacao sera enviado para o endereco institucional associado.

### 1.3 Navegacao Principal

Apos o login, o menu lateral esquerdo apresenta as seguintes seccoes:

- **Painel** -- Vista geral com indicadores e actividade recente
- **Cidadaos** -- Registo e gestao de dados de cidadaos
- **Vistos** -- Criacao e acompanhamento de pedidos de visto
- **Agendamentos** -- Calendario e gestao de marcacoes
- **Documentos** -- Repositorio de documentos carregados
- **Relatorios** -- Indicadores de desempenho e exportacao de dados

O cabecalho superior contem:

- Nome do utilizador autenticado e perfil
- Notificacoes do sistema
- Opcao para alternar idioma (PT / DE)
- Botao de terminar sessao

### 1.4 Perfis e Permissoes

| Perfil                | Permissoes Principais                                              |
|-----------------------|--------------------------------------------------------------------|
| Consul                | Acesso total, aprovacao final de vistos, gestao de utilizadores    |
| Funcionario Consular  | Gestao de cidadaos, vistos, agendamentos e documentos              |
| Assistente Admin      | Consulta de dados, criacao de agendamentos, carregamento de docs   |

---

## 2. Gestao de Cidadaos

### 2.1 Registar Novo Cidadao

1. No menu lateral, clique em **Cidadaos**.
2. Clique no botao **Novo Cidadao**.
3. Preencha os campos obrigatorios do formulario:

| Campo              | Tipo        | Obrigatorio | Exemplo                      |
|--------------------|-------------|-------------|------------------------------|
| Nome               | Texto       | Sim         | Maria                        |
| Apelido            | Texto       | Sim         | Fernandes                    |
| Data de Nascimento | Data        | Sim         | 1985-03-15                   |
| Passaporte         | Texto       | Sim         | N0012345                     |
| Email              | Email       | Nao         | maria.fernandes@email.com    |
| Telefone           | Texto       | Nao         | +49 170 1234567              |
| Morada             | Texto       | Nao         | Musterstr. 10, 10115 Berlin |

4. Clique em **Guardar** para concluir o registo.

### 2.2 Pesquisar Cidadao

- Utilize a barra de pesquisa no topo da lista de cidadaos.
- Pode pesquisar por **nome**, **apelido**, **numero de passaporte** ou **email**.
- Utilize os filtros avancados para refinar resultados por data de registo ou estado.

### 2.3 Editar Dados de Cidadao

1. Na lista de cidadaos, clique no nome do cidadao pretendido.
2. Na pagina de detalhe, clique em **Editar**.
3. Altere os campos necessarios.
4. Clique em **Guardar Alteracoes**.

**Nota:** Todas as alteracoes sao registadas no historico de auditoria do cidadao.

### 2.4 Consultar Historico

Na pagina de detalhe do cidadao, o separador **Historico** apresenta:

- Data e hora de cada alteracao
- Utilizador que efectuou a alteracao
- Campos alterados com valores anteriores e actuais
- Vistos, agendamentos e documentos associados ao cidadao

---

## 3. Processo de Vistos

### 3.1 Criar Pedido de Visto

1. No menu lateral, clique em **Vistos**.
2. Clique no botao **Novo Pedido**.
3. Seleccione o cidadao (pesquise por nome ou passaporte).
4. Seleccione o **tipo de visto**:
   - **Consular** -- Visto emitido pela representacao consular
   - **Territorial** -- Visto para entrada em territorio nacional
   - **Diplomatico** -- Visto para pessoal diplomatico e oficial
5. Preencha os dados adicionais (motivo da viagem, datas previstas, pais de destino).
6. Clique em **Submeter Pedido**.

### 3.2 Anexar Documentos ao Pedido

Apos a criacao do pedido:

1. Na pagina do pedido de visto, aceda ao separador **Documentos**.
2. Clique em **Adicionar Documento** ou arraste ficheiros para a area indicada.
3. Seleccione a categoria do documento (Passaporte, BI, Certificado, Comprovativo de Residencia, Outro).
4. Confirme o carregamento.

Documentos tipicamente exigidos por tipo de visto:

| Tipo de Visto | Documentos Exigidos                                                  |
|---------------|----------------------------------------------------------------------|
| Consular      | Passaporte, fotografia, formulario preenchido, comprovativo de meios |
| Territorial   | Passaporte, carta-convite, comprovativo de alojamento                |
| Diplomatico   | Nota verbal, passaporte diplomatico, credenciais                     |

### 3.3 Fluxo de Aprovacao

O pedido de visto segue o seguinte fluxo de estados:

```
SUBMETIDO --> EM_ANALISE --> APROVADO
                         --> REJEITADO
```

- **SUBMETIDO** -- O pedido foi criado e aguarda analise.
- **EM_ANALISE** -- Um funcionario consular esta a avaliar o pedido e documentos.
- **APROVADO** -- O pedido foi aprovado. O visto pode ser emitido.
- **REJEITADO** -- O pedido foi rejeitado. O motivo da rejeicao e registado.

Para alterar o estado de um pedido:

1. Abra o pedido de visto.
2. Clique no botao correspondente a accao desejada (**Iniciar Analise**, **Aprovar** ou **Rejeitar**).
3. Adicione uma observacao (obrigatoria em caso de rejeicao).
4. Confirme a accao.

### 3.4 Acompanhamento de Estado

- Na lista de vistos, o estado actual e visivel na coluna **Estado**.
- Utilize os filtros para visualizar pedidos por estado, tipo ou data.
- O cidadao recebe notificacoes por email a cada mudanca de estado (se o email estiver registado).

---

## 4. Agendamentos

### 4.1 Visualizar Calendario

1. No menu lateral, clique em **Agendamentos**.
2. O calendario apresenta todos os agendamentos do dia, semana ou mes.
3. Utilize os botoes de navegacao para alterar o periodo visualizado.
4. Clique num agendamento para ver os detalhes.

### 4.2 Criar Agendamento

1. Clique no botao **Novo Agendamento** ou clique directamente numa data/hora no calendario.
2. Preencha os campos:
   - **Tipo de Servico** -- Visto, Legalizacao, Registo Consular, Informacao Geral
   - **Data e Hora** -- Seleccione a data e horario disponivel
   - **Cidadao** -- Pesquise e seleccione o cidadao
   - **Observacoes** -- Notas adicionais (opcional)
3. Clique em **Confirmar Agendamento**.

### 4.3 Reagendar

1. Abra o agendamento existente.
2. Clique em **Reagendar**.
3. Seleccione a nova data e hora.
4. Clique em **Confirmar**.

### 4.4 Cancelar Agendamento

1. Abra o agendamento existente.
2. Clique em **Cancelar Agendamento**.
3. Indique o motivo do cancelamento.
4. Confirme a accao.

### 4.5 Notificacoes

O sistema envia notificacoes automaticas nas seguintes situacoes:

- Confirmacao de agendamento (email ao cidadao)
- Lembrete 24 horas antes do agendamento
- Reagendamento ou cancelamento
- Notificacao interna ao funcionario atribuido

---

## 5. Documentos

### 5.1 Carregar Documentos

1. No menu lateral, clique em **Documentos**.
2. Clique em **Carregar Documento** ou arraste ficheiros para a area de carregamento (drag and drop).
3. Seleccione a **categoria**:
   - **Passaporte**
   - **BI** (Bilhete de Identidade)
   - **Certificado** (nascimento, casamento, obito)
4. Associe o documento a um cidadao (pesquise por nome ou passaporte).
5. Clique em **Guardar**.

Formatos aceites: PDF, JPG, PNG. Tamanho maximo por ficheiro: 10 MB.

### 5.2 Versionamento

- Ao carregar uma nova versao de um documento existente, o sistema preserva as versoes anteriores.
- Na pagina de detalhe do documento, o separador **Versoes** apresenta o historico completo.
- Pode descarregar ou visualizar qualquer versao anterior.

### 5.3 Descarregar Documentos

1. Na lista de documentos, localize o ficheiro pretendido.
2. Clique no botao **Descarregar** para obter uma copia local.
3. Para descarregar multiplos documentos, seleccione-os e clique em **Descarregar Seleccionados**.

### 5.4 Pesquisa e Filtragem

- Pesquise documentos por nome do ficheiro, cidadao associado ou categoria.
- Filtre por categoria, data de carregamento ou tipo de ficheiro.

---

## 6. Relatorios

### 6.1 Painel de Indicadores (Dashboard)

O painel de relatorios apresenta os seguintes indicadores-chave (KPIs):

| Indicador               | Descricao                                        |
|--------------------------|--------------------------------------------------|
| Cidadaos Registados      | Numero total de cidadaos no sistema               |
| Vistos Processados       | Total de vistos processados no periodo seleccionado|
| Agendamentos Realizados  | Numero de agendamentos concluidos                 |
| Taxa de Aprovacao        | Percentagem de vistos aprovados face ao total      |
| Tempo Medio de Analise   | Tempo medio entre submissao e decisao de visto     |

### 6.2 Filtros de Periodo

- Seleccione o periodo desejado: Hoje, Esta Semana, Este Mes, Este Ano, Personalizado.
- Os indicadores e graficos actualizam-se automaticamente conforme o filtro.

### 6.3 Opcoes de Exportacao

- **PDF** -- Relatorio formatado para impressao ou arquivo.
- **CSV** -- Dados tabulares para analise em folha de calculo.
- **Excel** -- Ficheiro .xlsx com formatacao preservada.

Para exportar, clique no botao **Exportar** e seleccione o formato desejado.

---

## 7. Referencia Rapida

### Tarefas Comuns e Caminhos de Navegacao

| Tarefa                        | Caminho de Navegacao                                      | Atalho         |
|-------------------------------|-----------------------------------------------------------|----------------|
| Registar cidadao              | Cidadaos > Novo Cidadao                                   | Alt + N        |
| Pesquisar cidadao             | Cidadaos > Barra de Pesquisa                              | Ctrl + K       |
| Criar pedido de visto         | Vistos > Novo Pedido                                      | Alt + V        |
| Aprovar visto                 | Vistos > [Pedido] > Aprovar                               | --             |
| Criar agendamento             | Agendamentos > Novo Agendamento                           | Alt + A        |
| Carregar documento            | Documentos > Carregar Documento                           | Alt + U        |
| Ver relatorios                | Relatorios > Painel                                       | Alt + R        |
| Exportar relatorio            | Relatorios > Exportar > [Formato]                         | --             |
| Terminar sessao               | Cabecalho > Icone do Utilizador > Terminar Sessao         | --             |
| Alternar idioma               | Cabecalho > Selector de Idioma                            | --             |

### Atalhos Globais

| Atalho         | Accao                                |
|----------------|--------------------------------------|
| Ctrl + K       | Abrir pesquisa global                |
| Alt + N        | Novo registo (contexto actual)       |
| Esc            | Fechar modal ou painel aberto        |
| Ctrl + S       | Guardar formulario actual            |

---

**Suporte Tecnico:** Em caso de duvidas ou problemas tecnicos, contacte a equipa de TI atraves do email suporte@embaixada-angola.site.
