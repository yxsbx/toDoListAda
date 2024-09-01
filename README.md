# To-Do List Application

Este é um projeto de aplicação de lista de tarefas (To-Do List) construído usando HTML, CSS (TailwindCSS), JavaScript, Webpack, Babel, e outras ferramentas modernas. A aplicação suporta Hot Module Replacement (HMR) e Live Reloading, facilitando o desenvolvimento.

## Funcionalidades

-   **Adicionar Tarefas:** Adicione novas tarefas à sua lista.
-   **Organização em Quadros:** Organize suas tarefas em quadros de Kanban.
-   **Navegação Dinâmica:** Navegue entre diferentes páginas e visualizações sem recarregar a página.
-   **Interface Responsiva:** Layout adaptável a diferentes tamanhos de tela.
-   **Deploy Fácil:** Pronto para ser hospedado em GitHub Pages.

## Tecnologias Utilizadas

-   **HTML**: Estrutura da aplicação.
-   **TailwindCSS**: Estilização da interface de forma rápida e responsiva.
-   **JavaScript (ES6)**: Lógica da aplicação.
-   **Webpack**: Bundler utilizado para empacotar e otimizar os arquivos.
-   **Babel**: Transpilador que converte o código ES6+ para ES5, garantindo compatibilidade com mais navegadores.
-   **ESLint e Prettier**: Ferramentas para garantir qualidade e consistência no código.

## Pré-requisitos

Antes de começar, certifique-se de ter o Node.js instalado em sua máquina. Você pode baixar e instalar o Node.js a partir de [nodejs.org](https://nodejs.org/).

## Instalação

Siga os passos abaixo para configurar o ambiente de desenvolvimento:

1. **Clone o repositório:**

    ```bash
    git clone (link do repositório)
    ```

2. **Instale as dependências:**

    ```bash
    npm install
    ```

## Scripts Disponíveis

No diretório do projeto, você pode executar os seguintes comandos:

### `npm run build`

Compila e empacota os arquivos da aplicação para produção. Gera um build otimizado na pasta `public`.

### `npm start`

Inicia o servidor de desenvolvimento com Webpack Dev Server, incluindo Hot Module Replacement e Live Reloading.

### `npm run format`

Formata o código utilizando Prettier.

### `npm run lint`

Verifica o código em busca de problemas de estilo e sintaxe utilizando ESLint.

### `npm run deploy`

Compila a aplicação e faz o deploy para GitHub Pages (necessita configuração prévia do repositório para usar o GitHub Pages).

## Estrutura do Projeto

Aqui está uma visão geral da estrutura do projeto:

├── public/ # Arquivos estáticos para deploy
├── src/ # Código-fonte da aplicação
│ ├── components/ # Componentes HTML
│ ├── styles/ # Arquivos CSS
│ └── utils/ # Arquivos JavaScript (lógica de negócios, roteamento, layout, etc.)
├── .eslintrc.js # Configuração do ESLint
├── .prettierrc # Configuração do Prettier
├── tailwind.config.js # Configuração do TailwindCSS
├── webpack.config.js # Configuração do Webpack
└── package.json # Dependências e scripts

## Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Autor

-   **Yasmin Barcelos**
-   **Gabriel Leite**
-   **Matheus Evaristo**
-   **Matheus Quintanilha**
