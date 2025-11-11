# Arquitetura da Solução - Coffee CRM

Este documento descreve a arquitetura técnica da aplicação Coffee CRM, as tecnologias empregadas e a estrutura do banco de dados.

## 1. Visão Geral Tecnológica

A aplicação é uma [Single Page Application (SPA)](https://developer.mozilla.org/en-US/docs/Glossary/SPA) construída sobre a stack:

-   **Frontend:** [Next.js](https://nextjs.org/) (React Framework)
-   **Backend:** [Supabase](https://supabase.io/) (Backend-as-a-Service)
-   **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
-   **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
-   **Hospedagem:** [Vercel](https://vercel.com/) (recomendado para Next.js)

## 2. Estrutura do Projeto

O projeto segue a estrutura padrão do Next.js App Router:

```
/
├── supabase/
│   └── schema.sql        # Definição do esquema do banco de dados
├── src/
│   ├── app/              # Rotas da aplicação (App Router)
│   │   ├── api/          # Rotas de API para integrações
│   │   ├── dashboard/    # Rotas protegidas do CRM
│   │   ├── login/        # Rota de login
│   │   └── page.tsx      # Página inicial
│   ├── components/       # Componentes React reutilizáveis
│   ├── lib/              # Funções utilitárias (ex: cliente Supabase)
│   ├── utils/            # Utilitários de Supabase para SSR
│   └── middleware.ts     # Middleware de autenticação
├── .env.local            # Variáveis de ambiente (secretas)
├── next.config.mjs       # Configurações do Next.js
└── package.json          # Dependências e scripts
```

## 3. Banco de Dados (Supabase)

O banco de dados é modelado em PostgreSQL no Supabase. O esquema completo está definido em `supabase/schema.sql`.

### Tabelas Principais

-   `public.clients`: Armazena os dados principais dos clientes.
    -   `id` (uuid): Chave primária.
    -   `name`, `email`, `phone`, etc.: Dados do cliente.
    -   `knowledge_level` (enum): Nível de conhecimento de café, usando um tipo customizado.
    -   `source_channel` (text): Canal de aquisição (ex: 'Loja Física').

-   `public.interactions`: Registra cada ponto de contato com o cliente.
    -   `client_id` (uuid): Chave estrangeira para `clients`.
    -   `channel` (text): Canal da interação (ex: 'WhatsApp').
    -   `type` (text): Tipo de interação (ex: 'Compra', 'Dúvida').

-   `public.tags` e `public.client_tags`: Sistema de tags para segmentação (relação many-to-many).

## 4. Sistema de Autenticação

A autenticação é gerenciada pelo **Supabase Auth**.

-   **Perfis de Usuário:** A lógica de perfis (Admin, Gerente, etc.) foi planejada mas a implementação de um sistema de roles detalhado no banco de dados (tabela `users` e `roles`) é um próximo passo. No MVP, a autenticação é baseada em usuários do Supabase Auth.
-   **Segurança de Rotas:** O arquivo `src/middleware.ts` intercepta todas as requisições. Ele verifica se o usuário possui uma sessão ativa. Caso não tenha, ele é redirecionado para a página `/login`.
-   **Row Level Security (RLS):** Todas as tabelas foram criadas com RLS habilitado. As políticas de acesso que definem quais usuários podem ver ou modificar quais dados ainda precisam ser criadas no painel do Supabase. Esta é uma camada de segurança crucial no banco de dados.
