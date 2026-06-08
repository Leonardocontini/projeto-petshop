# Arquitetura de Banco de Dados

## Escolha Tecnológica

**Tipo escolhido:** SQL relacional.

**Provedor/SGBD:** PostgreSQL 18 no Docker, compatível com o requisito de PostgreSQL 17 ou superior.

## Justificativa Técnica

O sistema de petshop trabalha com dados transacionais: clientes, endereços, pets, produtos, pedidos, itens de pedido, estoque e totalização financeira. Esse domínio exige integridade referencial, consistência entre baixa de estoque e criação de pedido, consultas com JOINs e relatórios por período/categoria/status.

PostgreSQL foi escolhido porque oferece:

- ACID para pedidos e estoque.
- Chaves estrangeiras e constraints para integridade.
- Índices B-Tree eficientes para filtros comuns.
- Boa performance em JOINs e agregações.
- Facilidade de uso com Sequelize e driver `pg`.
- Persistência simples via named volume no Docker.

Redis aparece na infraestrutura como cache, mas não é o banco principal porque os dados do sistema precisam de persistência relacional, consistência e histórico.

## Requisitos do Sistema

**Objetivo:** fornecer uma API REST para operação de uma loja de petshop, permitindo cadastro de clientes, pets, catálogo de produtos, pedidos e baixa de estoque.

**Principais entidades:**

- `users`: clientes/usuários autenticáveis.
- `addresses`: endereços dos clientes.
- `pets`: animais vinculados aos clientes.
- `products`: catálogo de produtos.
- `orders`: pedidos dos clientes.
- `order_items`: tabela pivô entre pedidos e produtos.

**Volume estimado inicial:**

- 1.000 a 10.000 clientes.
- 1.000 a 20.000 pets.
- 500 a 5.000 produtos.
- 10.000 a 100.000 pedidos por ano.
- 20.000 a 300.000 itens de pedido por ano.

**Usuários estimados:**

- 5 a 20 operadores administrativos.
- Centenas ou milhares de clientes consultados/cadastrados pela API.

**Principais consultas:**

- Login por email.
- Listagem paginada de produtos por categoria.
- Consulta de pedidos por cliente.
- Relatórios de faturamento por período.
- Produtos com baixo estoque.
- Produtos mais vendidos.

## Normalização

### 1FN

Todas as tabelas usam campos atômicos. Itens de pedido não são armazenados como array dentro de `orders`; ficam em `order_items`.

### 2FN

Os atributos dependem da chave primária de sua própria tabela. Dados de produto, cliente e pedido não ficam duplicados em entidades indevidas.

### 3FN

Não há dependências transitivas relevantes: endereço depende do cliente, pedido depende do cliente, item depende do pedido e do produto. O preço unitário em `order_items` é uma desnormalização controlada para preservar o preço histórico do produto no momento da compra.

## Desnormalização Justificada

`order_items.unit_price` armazena o preço praticado no momento do pedido. Mesmo que `products.price` mude depois, o histórico financeiro do pedido continua correto.
