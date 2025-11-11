# Coffee CRM

Este é um projeto de CRM (Customer Relationship Management) customizado, desenhado especificamente para as necessidades de uma cafeteria de cafés especiais. A aplicação é construída com Next.js, TypeScript, Tailwind CSS e utiliza Supabase como backend.

## Visão Geral

O objetivo deste CRM é unificar a gestão de clientes de múltiplos canais (loja física, e-commerce Nuvemshop, redes sociais) em uma única plataforma, permitindo uma visão 360º do cliente e a criação de estratégias de marketing e vendas mais eficazes.

## Funcionalidades (MVP)

- **Autenticação de Usuários:** Sistema de login seguro para a equipe da cafeteria.
- **Dashboard de Clientes:** Visualização centralizada de todos os clientes cadastrados.
- **Perfil do Cliente:** Página de detalhes para cada cliente, com seu histórico de interações.
- **Cadastro de Clientes:** Formulários para a equipe adicionar clientes manualmente.
- **Formulário Público:** Página de cadastro para clientes da loja física (via QR Code) com geração de cupom.
- **API Segura:** Endpoints para integrações com serviços de automação como o N8N.

## Primeiros Passos

Siga as instruções abaixo para configurar e rodar o projeto em seu ambiente de desenvolvimento.

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/)

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone <url-do-seu-repositorio>
    cd <nome-do-repositorio>
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as Variáveis de Ambiente:**
    - Crie uma cópia do arquivo `.env.example` e renomeie para `.env.local`:
      ```bash
      cp .env.example .env.local
      ```
    - Abra o arquivo `.env.local` e preencha com as suas credenciais do Supabase. Você pode encontrá-las em "Project Settings" > "API" no seu painel do Supabase.

    ```env
    NEXT_PUBLIC_SUPABASE_URL=SUA_URL_DO_PROJETO_SUPABASE
    NEXT_PUBLIC_SUPABASE_ANON_KEY=SUA_CHAVE_ANON_PUBLICA
    SUPABASE_SERVICE_ROLE_KEY=SUA_CHAVE_SERVICE_ROLE
    # Opcional: Crie uma chave secreta longa e aleatória para a API
    # Se não for definida, a chave de serviço do Supabase será usada como fallback.
    API_SECRET_KEY=SUA_CHAVE_SECRETA_PARA_A_API
    ```

### Rodando a Aplicação

Para iniciar o servidor de desenvolvimento, execute:

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver a aplicação em funcionamento.

- A página de login da equipe estará em `/login`.
- O formulário público de cadastro estará em `/cadastro`.
- O dashboard principal estará em `/dashboard`.
