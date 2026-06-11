# PetShop API - Desenvolvimento Web

## 1. Identificação do Projeto

**Sistema:** PetShop API.

**Descrição:** backend REST para uma loja de petshop, com clientes, endereços, pets, produtos, pedidos e itens de pedido. A aplicação possui autenticação JWT, senha criptografada com bcrypt, ORM Sequelize, PostgreSQL e documentação Swagger.

**Caminho escolhido:** Opção A - Docker/Orquestração Local.

Arquitetura:

```txt
Host -> Nginx -> Node Web Server -> PostgreSQL
                         |
                       Redis
```

O Node.js não é publicado diretamente no host. O acesso externo acontece pelo Nginx em `http://localhost:8080`.

## 2. Pré-requisitos

- Docker Desktop com integração WSL2 habilitada.
- Node.js 24 ou superior, caso rode localmente sem Docker.
- PostgreSQL 17 ou superior, caso rode localmente sem Docker.
- Arquivo `.env` somente se desejar sobrescrever as variáveis padrão.

Crie o `.env` a partir do exemplo quando quiser customizar:

```sh
cp .env.example .env
```

Nunca comite senhas, tokens ou chaves reais no repositório.

## 3. Como Subir

Build e execução completa:

```sh
docker compose up --build
```

Em segundo plano:

```sh
docker compose up -d --build
```

URL da API:

```txt
http://localhost:8080
```

Swagger:

```txt
http://localhost:8080/docs
```

## 4. Entrypoints e Commands

Entrypoint do servidor web:

```sh
node _web.js
```

Entrypoint de CLI:

```sh
node command.js
```

Executar migrations manualmente:

```sh
node command.js migrate
```

Via Docker:

```sh
docker compose --profile cli run --rm nodecli-container node command.js migrate
```

Ao subir o container web, o entrypoint também executa `node command.js migrate` antes de iniciar o servidor, para que `docker compose up --build` funcione em uma base limpa.

## 5. Entidades e Relacionamentos

Tabelas principais:

- `users`: clientes/usuários. Possui `email` único e `password` criptografado com bcrypt.
- `addresses`: endereços dos clientes.
- `pets`: pets vinculados aos clientes.
- `products`: catálogo e estoque da loja.
- `orders`: pedidos realizados pelos clientes.
- `order_items`: tabela pivô dos produtos dentro de cada pedido.

Relacionamentos:

- `users 1:N addresses`
- `users 1:N pets`
- `users 1:N orders`
- `orders N:N products` por meio da tabela pivô `order_items`

A tabela pivô `order_items` possui Model própria em `app/Models/OrderItemModel.js`.

## 5.1 Entrega de Banco de Dados

O banco escolhido para o sistema é **PostgreSQL**, um banco SQL relacional. A escolha está documentada em `justificativa/arquitetura.md`.

Artefatos de banco:

- `modelagem/der.png`: diagrama conceitual.
- `modelagem/modelo_logico.png`: diagrama lógico.
- `modelagem/dicionario_dados.md`: dicionário de dados, constraints e índices.
- `scripts/setup.sql`: DDL completo com PKs, FKs, constraints e índices.
- `scripts/seed/seed.sql`: carga inicial com mais de 100 registros coerentes.
- `queries/crud.sql`: exemplos CRUD.
- `queries/consultas_avancadas.sql`: 5 consultas críticas com `EXPLAIN ANALYZE`.
- `queries/consultas_criticas.md`: explicação das consultas críticas e evidências de otimização.
- `queries/agregacoes.sql`: consultas de relatório/agregação.

## 6. Rotas REST

Rota pública:

- `POST /login`: gera token JWT.

Rotas protegidas por JWT:

- `GET /users`, `GET /users/:id`, `POST /users`, `PUT /users/:id`, `DELETE /users/:id`
- `GET /addresses`, `GET /addresses/:id`, `POST /addresses`, `PUT /addresses/:id`, `DELETE /addresses/:id`
- `GET /pets`, `GET /pets/:id`, `POST /pets`, `PUT /pets/:id`, `DELETE /pets/:id`
- `GET /products`, `GET /products/:id`, `POST /products`, `PUT /products/:id`, `DELETE /products/:id`
- `GET /orders`, `GET /orders/:id`, `POST /orders`, `PUT /orders/:id`, `DELETE /orders/:id`

Também existe middleware próprio de autenticação JWT em `app/Http/Middlewares/AuthMiddleware.js`.

## 7. Login e JWT

Depois das migrations, um usuário inicial é criado:

```txt
email: admin@petshop.local
senha: admin123
```

Faça login:

```sh
curl -X POST http://localhost:8080/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@petshop.local","password":"admin123"}'
```

Use o token retornado:

```http
Authorization: Bearer SEU_TOKEN
```

Exemplo de criação de produto:

```sh
curl -X POST http://localhost:8080/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN" \
  -d '{"name":"Ração premium","description":"Ração para cães adultos","category":"Alimentação","price":129.90,"stock":25}'
```

Exemplo de criação de pedido:

```json
{
  "id_user": 1,
  "items": [
    {
      "id_product": 1,
      "quantity": 2
    }
  ]
}
```

## 8. Infraestrutura Docker

Containers:

- `nginx-container`: proxy reverso público na porta `8080`.
- `nodeweb-container`: servidor Node.js privado, sem porta publicada no host.
- `postgres-container`: banco PostgreSQL usado pela aplicação e publicado no host na porta `6789` para inspeção via Beekeeper Studio.
- `redis-container`: cache Redis privado na rede backend.
- `nodecli-container`: execução de comandos CLI via profile `cli`.

Redes:

- `frontend-network`: comunicação entre Nginx e Node.
- `backend-network`: rede interna para Node, PostgreSQL e Redis.

Persistência:

- `postgres-volume`: dados do PostgreSQL.
- `redis-volume`: dados do Redis.

Imagens:

- O Dockerfile do Node usa multi-stage build.
- Dependências são instaladas antes da cópia do código para aproveitar cache de camadas.
- `.dockerignore` evita envio de `node_modules`, `.env`, logs e pastas de IDE ao daemon.

## 9. Bibliotecas

- `express`: servidor HTTP e rotas REST.
- `sequelize`: ORM.
- `pg`: driver PostgreSQL.
- `bcrypt`: criptografia de senhas.
- `jsonwebtoken`: autenticação JWT.
- `dotenv`: variáveis de ambiente.
- `express-fileupload`: upload de imagem.
- `swagger-ui-express`: documentação Swagger.
- `chalk`: mensagens de terminal.

## 10. Verificação e Evidências

Validar containers:

```sh
docker compose ps
```

Validar logs:

```sh
docker compose logs nodeweb-container
docker compose logs nginx-container
```

Inspecionar rede:

```sh
docker network inspect unifaat-2026-dw-project_backend-network
```

Testar persistência:

```sh
docker compose restart postgres-container
docker compose exec nodeweb-container node command.js migrate
```

O acesso à API ocorre pelo Nginx. Para inspeção do banco em ferramentas como Beekeeper Studio, o PostgreSQL está publicado em `localhost:6789`.

Automação CI/CD:

- Workflow: `.github/workflows/docker-build.yml`
- O pipeline faz build das imagens Node e Nginx.
- Se as variáveis/segredos `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, `ECR_REGISTRY`, `ECR_NODE_REPOSITORY` e `ECR_NGINX_REPOSITORY` forem configurados no GitHub, o workflow também publica as imagens no Amazon ECR.

## 11. Troubleshooting e Limpeza

Se o Docker não estiver disponível dentro do WSL, habilite a integração em Docker Desktop > Settings > Resources > WSL Integration.

Parar containers:

```sh
docker compose down
```

Remover containers e volumes:

```sh
docker compose down -v
```
