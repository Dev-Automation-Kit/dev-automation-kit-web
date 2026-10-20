# Dev Automation Kit — site web

Este repositório contém a página de apresentação e a documentação web do Dev Automation Kit. O aplicativo desktop é um projeto separado; seu código não está incluído aqui. A janela interativa na página inicial é uma demonstração com dados simulados.

## Tecnologias e serviços

O site usa HTML, CSS e JavaScript sem processo de build. Tailwind CSS e Lucide são carregados por CDN, e as fontes Inter e JetBrains Mono pelo Google Fonts. Os avatares vêm do GitHub. O formulário de contato envia os dados ao Formspree. Esses recursos dependem de serviços externos; isso é independente do processamento anunciado para o aplicativo desktop.

## Execução local

Na raiz do repositório, execute:

```sh
python3 -m http.server 8080
```

Acesse <http://localhost:8080/>. A conexão com a internet é necessária para carregar os recursos externos.

## Arquivos

- `index.html`: apresentação, demonstração, downloads, equipe e contato.
- `docs.html`: documentação e sumário de tópicos.
- `styles.css`: estilos compartilhados, da demonstração e das páginas.
- `script.js`: navegação e interações das duas páginas.
- `README.md`: instruções deste repositório.

## Edição e publicação

Edite `index.html` para alterar a apresentação e `docs.html` para atualizar a documentação. Os estilos estão em `styles.css`; preserve as regras do mockup ao alterar a aparência das páginas. As interações são implementadas em `script.js`.

Para publicar no GitHub Pages, envie os arquivos para o repositório e, em **Settings > Pages**, selecione **Deploy from a branch**, a branch desejada e a pasta raiz. Salve a configuração e consulte o endereço exibido pelo GitHub.

## Créditos e licença

A página apresenta Alan Clímaco, Amizael e Wernnon como co-criadores e desenvolvedores. Não há arquivo de licença neste repositório; confirme os termos de uso na fonte oficial antes de redistribuir o projeto.
