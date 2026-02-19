# Guia do Utilizador — Site Institucional (SI) e Welwitschia Noticias (WN)

**Audiencia:** Assessor de Comunicacao
**Dominio:** embaixada-angola.site
**Ultima actualizacao:** 2026-02-19
**Versao:** 1.0

---

## Indice

- [PARTE A — Site Institucional (SI)](#parte-a--site-institucional-si)
  - [1. Gestao de Paginas](#1-gestao-de-paginas)
  - [2. Gestao de Eventos](#2-gestao-de-eventos)
  - [3. Menus](#3-menus)
  - [4. Contactos](#4-contactos)
  - [5. Media](#5-media)
- [PARTE B — Welwitschia Noticias (WN)](#parte-b--welwitschia-noticias-wn)
  - [6. Artigos](#6-artigos)
  - [7. Categorias](#7-categorias)
  - [8. Tags](#8-tags)
  - [9. Media WN](#9-media-wn)
  - [10. Newsletter](#10-newsletter)
- [11. Boas Praticas](#11-boas-praticas)

---

# PARTE A — Site Institucional (SI)

O Site Institucional (SI) e a presenca oficial da Embaixada de Angola na Alemanha na internet. Atraves do painel de administracao em **si.embaixada-angola.site**, o Assessor de Comunicacao gere paginas, eventos, menus, contactos e ficheiros media.

---

## 1. Gestao de Paginas

### 1.1 Criar uma nova pagina

1. Aceder ao painel SI e navegar ate **Paginas > Criar Nova**.
2. Preencher os campos obrigatorios:
   - **Slug**: identificador unico na URL (ex.: `servicos-consulares`). Usar apenas letras minusculas, numeros e hifens.
   - **Tipo de pagina**: seleccionar um dos seguintes:
     - `INSTITUTIONAL` — paginas institucionais (Sobre, Missao, Equipa)
     - `SERVICE` — paginas de servicos (Vistos, Legalizacao)
     - `FAQ` — perguntas frequentes
     - `LANDING` — paginas de destino para campanhas ou eventos
3. Clicar em **Guardar Rascunho**.

### 1.2 Adicionar traducoes

Cada pagina suporta quatro idiomas. A traducao em portugues (PT) e obrigatoria.

| Codigo | Idioma    | Obrigatorio |
|--------|-----------|-------------|
| PT     | Portugues | Sim         |
| EN     | Ingles    | Nao         |
| DE     | Alemao    | Nao         |
| CS     | Checo     | Nao         |

Para adicionar uma traducao:

1. Abrir a pagina existente.
2. Seleccionar o separador do idioma desejado (PT, EN, DE ou CS).
3. Preencher os campos: **Titulo**, **Conteudo** e **Meta Descricao**.
4. Clicar em **Guardar Traducao**.

### 1.3 Fluxo editorial

As paginas seguem um fluxo editorial com quatro estados:

```
DRAFT --> REVIEW --> PUBLISHED --> ARCHIVED
```

- **DRAFT**: rascunho inicial, visivel apenas para editores.
- **REVIEW**: submetido para revisao por um responsavel.
- **PUBLISHED**: publicado e visivel no site publico.
- **ARCHIVED**: removido do site publico, mantido no sistema para referencia.

Para alterar o estado, abrir a pagina e utilizar o botao **Alterar Estado** no canto superior direito.

### 1.4 Editar paginas existentes

1. Navegar ate **Paginas > Listar**.
2. Utilizar o campo de pesquisa ou os filtros por tipo e estado.
3. Clicar no titulo da pagina para abrir o editor.
4. Efectuar as alteracoes desejadas e clicar em **Guardar**.

**Nota:** Alteracoes em paginas publicadas ficam imediatamente visiveis no site publico.

---

## 2. Gestao de Eventos

### 2.1 Criar um evento

1. Aceder a **Eventos > Criar Novo**.
2. Preencher os campos obrigatorios:
   - **Titulo**: inserir o titulo nos idiomas disponiveis (PT obrigatorio, EN/DE/CS opcionais).
   - **Descricao**: texto descritivo do evento em cada idioma.
   - **Local**: endereco ou nome do local do evento.
   - **Data de Inicio**: data e hora do inicio do evento.
   - **Data de Fim**: data e hora do termino do evento.
   - **Tipo de evento**: seleccionar um dos seguintes:
     - `PROTOCOL` — eventos protocolares e oficiais
     - `CULTURAL` — eventos culturais e artisticos
     - `ACADEMIC` — eventos academicos e conferencias
3. Clicar em **Guardar**.

### 2.2 Publicar um evento

Apos a criacao, o evento encontra-se em estado de rascunho. Para publica-lo:

1. Abrir o evento na lista.
2. Clicar em **Publicar Evento**.
3. Confirmar a publicacao.

O evento ficara visivel na pagina publica de eventos do site institucional.

### 2.3 Vista de proximos eventos

A seccao **Eventos > Proximos** apresenta uma lista cronologica de todos os eventos com data de inicio futura. Esta vista permite uma visao geral rapida do calendario da Embaixada.

---

## 3. Menus

O site institucional possui dois menus principais: **HEADER** (navegacao superior) e **FOOTER** (rodape).

### 3.1 Gerir itens do menu

1. Aceder a **Menus** e seleccionar o menu desejado (HEADER ou FOOTER).
2. A lista de itens actuais e apresentada por ordem de posicao.

### 3.2 Adicionar um item

1. Clicar em **Adicionar Item**.
2. Preencher os labels em cada idioma:
   - **Label PT**: texto em portugues (obrigatorio)
   - **Label EN**: texto em ingles
   - **Label DE**: texto em alemao
3. Seleccionar a pagina de destino ou introduzir um URL externo.
4. Definir a posicao (ordem numerica).
5. Clicar em **Guardar**.

### 3.3 Remover e reordenar itens

- Para **remover** um item: clicar no icone de remocao junto ao item.
- Para **reordenar**: arrastar os itens para a posicao desejada ou alterar o valor numerico da posicao.

---

## 4. Contactos

### 4.1 Gerir informacoes de contacto

Aceder a **Contactos** para visualizar e editar os dados de contacto da Embaixada.

Cada registo de contacto inclui os seguintes campos:

| Campo        | Descricao                              |
|--------------|----------------------------------------|
| Departamento | Nome do departamento ou seccao         |
| Endereco     | Morada fisica                          |
| Telefone     | Numero de telefone com indicativo      |
| Email        | Endereco de correio electronico        |
| Horario      | Horario de atendimento ao publico      |

### 4.2 Activar e desactivar contactos

Cada contacto possui um interruptor **Activo/Inactivo**. Contactos inactivos nao sao apresentados no site publico mas permanecem no sistema. Para alternar o estado, clicar no interruptor na coluna **Estado**.

---

## 5. Media

### 5.1 Carregar imagens

1. Aceder a **Media > Carregar**.
2. Seleccionar o ficheiro de imagem (formatos aceites: JPG, PNG, WebP).
3. O tamanho maximo por ficheiro e de **20 MB**.
4. Clicar em **Carregar**.

### 5.2 Definir texto alternativo multilingue

Apos o carregamento, definir o texto alternativo (alt text) em cada idioma disponivel. O texto alternativo e essencial para acessibilidade e SEO.

1. Abrir a imagem na biblioteca de media.
2. Preencher os campos **Alt PT**, **Alt EN** e **Alt DE**.
3. Clicar em **Guardar**.

### 5.3 Utilizar media em paginas e eventos

Ao editar uma pagina ou evento, utilizar o botao **Inserir Imagem** no editor de conteudo. A biblioteca de media sera apresentada, permitindo seleccionar uma imagem ja carregada.

---

# PARTE B — Welwitschia Noticias (WN)

O Welwitschia Noticias (WN) e o portal de noticias da Embaixada, acessivel em **wn.embaixada-angola.site**. Permite publicar artigos, gerir categorias, tags e newsletters.

---

## 6. Artigos

### 6.1 Criar um artigo

1. Aceder ao painel WN e navegar ate **Artigos > Criar Novo**.
2. Preencher os campos:
   - **Slug**: identificador unico na URL (ex.: `visita-oficial-berlim-2026`).
   - **Titulo PT**: titulo em portugues (obrigatorio).
   - **Titulo EN**: titulo em ingles (opcional).
   - **Titulo DE**: titulo em alemao (opcional).
   - **Titulo CS**: titulo em checo (opcional).
   - **Conteudo**: corpo do artigo no editor de texto rico.
   - **Excerto**: resumo curto do artigo (exibido em listagens e partilhas).
   - **Meta SEO**: titulo SEO e meta descricao para motores de busca.
3. Clicar em **Guardar Rascunho**.

### 6.2 Atribuir categoria e imagem de destaque

1. No painel lateral do artigo, seleccionar a **Categoria** na lista suspensa.
2. Na seccao **Imagem de Destaque**, clicar em **Seleccionar Imagem** e escolher da biblioteca de media.
3. Clicar em **Guardar**.

### 6.3 Fluxo editorial dos artigos

Os artigos seguem um fluxo editorial com cinco estados:

```
DRAFT --> SUBMITTED --> IN_REVIEW --> PUBLISHED --> ARCHIVED
```

- **DRAFT**: rascunho inicial, criado pelo jornalista.
- **SUBMITTED**: submetido para avaliacao editorial.
- **IN_REVIEW**: em processo de revisao pelo editor.
- **PUBLISHED**: publicado e visivel no portal de noticias.
- **ARCHIVED**: removido do portal, mantido no sistema.

Para submeter um artigo para revisao, clicar em **Submeter**. O editor recebera uma notificacao para proceder a revisao.

---

## 7. Categorias

### 7.1 Criar uma categoria

1. Aceder a **Categorias > Criar Nova**.
2. Preencher os campos:
   - **Nome PT**: nome em portugues (obrigatorio).
   - **Nome EN**: nome em ingles.
   - **Nome DE**: nome em alemao.
   - **Cor**: cor hexadecimal para identificacao visual (ex.: `#1A5276`).
3. Clicar em **Guardar**.

### 7.2 Editar e activar/desactivar categorias

1. Na lista de categorias, clicar no nome da categoria desejada.
2. Alterar os campos necessarios.
3. Utilizar o interruptor **Activo/Inactivo** para controlar a visibilidade.
4. Clicar em **Guardar**.

Categorias inactivas nao aparecem na lista de seleccao ao criar artigos, mas os artigos ja atribuidos mantem a associacao.

---

## 8. Tags

### 8.1 Criar e gerir tags

As tags permitem classificar artigos de forma transversal, independentemente da categoria.

1. Aceder a **Tags > Criar Nova**.
2. Introduzir o nome da tag.
3. Clicar em **Guardar**.

Para gerir tags existentes:

- Aceder a **Tags > Listar** para ver todas as tags.
- Clicar numa tag para editar o nome.
- Eliminar tags que ja nao sao utilizadas.

Ao criar ou editar um artigo, as tags podem ser atribuidas no painel lateral, digitando o nome e seleccionando da lista de sugestoes.

---

## 9. Media WN

### 9.1 Carregar imagens

1. Aceder a **Media > Carregar**.
2. Seleccionar os ficheiros de imagem.
3. Tamanho maximo: **20 MB** por ficheiro.

### 9.2 Redimensionar imagens

O sistema oferece opcoes de redimensionamento automatico ao carregar:

- **Miniatura**: 150x150 px (para listagens).
- **Media**: 600x400 px (para previsualizacoes).
- **Grande**: 1200x800 px (para artigos).

Seleccionar o tamanho desejado ou manter o original.

### 9.3 Gerir imagens

Na biblioteca de media, e possivel:

- Pesquisar imagens por nome de ficheiro.
- Visualizar detalhes (dimensoes, tamanho, data de carregamento).
- Eliminar imagens nao utilizadas para libertar espaco.

---

## 10. Newsletter

### 10.1 Visualizar subscritores

Aceder a **Newsletter > Subscritores** para ver a lista completa de subscritores do Welwitschia Noticias.

A lista apresenta:

| Campo          | Descricao                            |
|----------------|--------------------------------------|
| Email          | Endereco de email do subscritor      |
| Data Inscricao | Data em que o subscritor se registou |
| Estado         | Activo ou Cancelado                  |

### 10.2 Contagem de subscritores

No topo da pagina de subscritores, e apresentado o **numero total de subscritores activos**. Este indicador e util para avaliar o alcance da newsletter.

---

## 11. Boas Praticas

### 11.1 Optimizacao para motores de busca (SEO)

- Definir sempre o **titulo SEO** e a **meta descricao** em cada idioma.
- O titulo SEO deve ter entre 50 e 60 caracteres.
- A meta descricao deve ter entre 150 e 160 caracteres.
- Utilizar slugs descritivos e curtos (ex.: `servicos-consulares` em vez de `pagina-1`).
- Preencher o texto alternativo de todas as imagens.

### 11.2 Optimizacao de imagens

- Redimensionar imagens antes de carregar: largura maxima recomendada de **1200 px**.
- Utilizar formato **WebP** ou **JPG** comprimido para reduzir o tempo de carregamento.
- Evitar carregar imagens com mais de 5 MB quando possivel.
- Utilizar nomes de ficheiro descritivos (ex.: `embaixador-conferencia-berlim.jpg`).

### 11.3 Fluxo de conteudo multilingue

Recomenda-se o seguinte fluxo para producao de conteudo multilingue:

1. Redigir o conteudo em portugues (idioma principal).
2. Submeter para revisao em portugues.
3. Apos aprovacao, traduzir para ingles e alemao.
4. Rever as traducoes.
5. Publicar todas as versoes linguisticas em simultaneo.

Este fluxo garante consistencia entre idiomas e evita a publicacao de conteudo parcialmente traduzido.

### 11.4 Convencoes de nomenclatura

- **Slugs**: letras minusculas, sem acentos, palavras separadas por hifens.
- **Ficheiros media**: nomes descritivos em minusculas, sem espacos (usar hifens).
- **Categorias**: nomes curtos e claros que descrevam o topico.

---

*Fim do guia. Para questoes tecnicas, contactar o IT Lead.*
