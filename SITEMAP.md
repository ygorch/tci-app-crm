# Sitemap - Coffee CRM

Este documento descreve as principais rotas (páginas) da aplicação, seu propósito e quem pode acessá-las.

## 1. Rotas Públicas

Estas páginas podem ser acessadas por qualquer pessoa, sem necessidade de login.

-   **/ (landing)**
    -   **Propósito:** Página inicial principal. No MVP, redireciona para o login se o usuário não estiver autenticado.
    -   **Acesso:** Público.

-   **/cadastro**
    -   **Propósito:** Formulário de cadastro para clientes da loja física (acessado via QR Code). Oferece um cupom de desconto após o envio bem-sucedido.
    -   **Acesso:** Público.

-   **/login**
    -   **Propósito:** Página de login para os membros da equipe (proprietários, gerente, marketing).
    -   **Acesso:** Público (redireciona para `/dashboard` se o usuário já estiver logado).

## 2. Rotas Protegidas (Dashboard)

Estas páginas exigem que o usuário esteja autenticado. O acesso é gerenciado pelo middleware.

-   **/dashboard**
    -   **Propósito:** A página principal do CRM. Exibe uma lista de todos os clientes cadastrados com informações chave. Permite a navegação para o perfil de um cliente e para a página de criação de novos clientes.
    -   **Acesso:** Autenticado.

-   **/dashboard/clients/new**
    -   **Propósito:** Contém o formulário para a equipe cadastrar um novo cliente manualmente no sistema.
    -   **Acesso:** Autenticado.

-   **/dashboard/clients/[id]**
    -   **Propósito:** Página de perfil de um cliente específico (rota dinâmica). Exibe os detalhes do cliente e, futuramente, a linha do tempo de suas interações.
    -   **Acesso:** Autenticado.

## 3. Rotas de API

Estas rotas são projetadas para serem consumidas por serviços externos (como o N8N) e são protegidas por uma chave de API secreta.

-   **GET /api/clients**
    -   **Propósito:** Retorna uma lista de todos os clientes em formato JSON.

-   **POST /api/clients**
    -   **Propósito:** Permite a criação de um novo cliente enviando seus dados no corpo da requisição em formato JSON.
