# Template LaTeX — Embaixada de Angola

Template para documentação técnica oficial.

## Utilização

```bash
# Compilar
pdflatex documento-embaixada.tex

# Com índice completo
pdflatex documento-embaixada.tex && pdflatex documento-embaixada.tex
```

## Personalização

Editar os metadados no ficheiro `.tex`:

```latex
\newcommand{\doctitulo}{Título do Documento}
\newcommand{\docautor}{Nome do Autor}
\newcommand{\docversao}{1.0}
\newcommand{\docdepartamento}{Secção Consular}
```

## Cores Institucionais

| Cor | Hex | Utilização |
|-----|-----|-----------|
| Vermelho Angola | `#CE1126` | Títulos, links, destaque |
| Preto | `#000000` | Subtítulos, texto |
| Dourado | `#F9D616` | Acentos em código |
