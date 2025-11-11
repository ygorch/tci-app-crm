# Documentação da API - Coffee CRM

Esta documentação descreve como interagir com a API do Coffee CRM, que foi projetada para permitir integrações com serviços de automação como [N8N](https://n8n.io/) ou [Zapier](https://zapier.com/).

## 1. Autenticação

Todas as requisições à API devem incluir um cabeçalho de autorização (`Authorization`) com um token do tipo "Bearer".

O token secreto deve ser a sua `API_SECRET_KEY` definida nas variáveis de ambiente do projeto. Se ela não for definida, o token será a sua `SUPABASE_SERVICE_ROLE_KEY`.

**Exemplo de Cabeçalho:**
```
Authorization: Bearer <SEU_TOKEN_SECRETO>
```

Se a autenticação falhar, a API retornará um status `401 Unauthorized`.

## 2. Endpoints

A URL base para os endpoints da API é o domínio da sua aplicação (ex: `https://crm.truecoffeeinc.com.br`).

---

### Clientes (`/api/clients`)

Este endpoint gerencia os recursos de clientes.

#### **`GET /api/clients`**

Retorna uma lista de todos os clientes cadastrados no CRM.

-   **Método:** `GET`
-   **Headers:** `Authorization: Bearer <SEU_TOKEN_SECRETO>`
-   **Resposta de Sucesso (200 OK):**
    -   Um array de objetos de clientes.

    ```json
    [
      {
        "id": "a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6",
        "created_at": "2024-10-27T10:00:00Z",
        "name": "João da Silva",
        "email": "joao.silva@example.com",
        "phone": "11999998888",
        "address": null,
        "birthday": "1990-05-15",
        "knowledge_level": "Coffee Lover",
        "source_channel": "Loja Física"
      },
      ...
    ]
    ```

#### **`POST /api/clients`**

Cria um novo cliente no CRM.

-   **Método:** `POST`
-   **Headers:**
    -   `Authorization: Bearer <SEU_TOKEN_SECRETO>`
    -   `Content-Type: application/json`
-   **Corpo da Requisição (Body):**
    -   Um objeto JSON contendo os dados do novo cliente. Apenas `name` é estritamente obrigatório pelo banco de dados.

    ```json
    {
      "name": "Maria Souza",
      "email": "maria.souza@example.com",
      "phone": "21987654321",
      "source_channel": "Nuvemshop"
    }
    ```
-   **Resposta de Sucesso (201 Created):**
    -   O objeto do cliente recém-criado, incluindo seu `id` gerado pelo sistema.

    ```json
    {
      "id": "b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6q7",
      "created_at": "2024-10-27T11:30:00Z",
      "name": "Maria Souza",
      "email": "maria.souza@example.com",
      "phone": "21987654321",
      "address": null,
      "birthday": null,
      "knowledge_level": null,
      "source_channel": "Nuvemshop"
    }
    ```
-   **Respostas de Erro:**
    -   `400 Bad Request`: Se o JSON enviado for inválido ou se os dados violarem alguma restrição do banco de dados (ex: email duplicado).
