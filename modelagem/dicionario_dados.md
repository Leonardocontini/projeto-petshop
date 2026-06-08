# Dicionário de Dados

## users

| Campo | Tipo | Restrições | Descrição |
|---|---|---|---|
| id | SERIAL/INTEGER | PK | Identificador do cliente |
| name | TEXT | NOT NULL | Nome do cliente |
| email | TEXT | NOT NULL, UNIQUE | Email usado para login |
| password | TEXT | NOT NULL | Senha criptografada com bcrypt |
| phone | TEXT | NULL | Telefone do cliente |
| picture | TEXT | NULL | Nome do arquivo de imagem |
| created_at | TIMESTAMPTZ | NOT NULL | Data de criação |
| updated_at | TIMESTAMPTZ | NOT NULL | Data de atualização |

## addresses

| Campo | Tipo | Restrições | Descrição |
|---|---|---|---|
| id | SERIAL/INTEGER | PK | Identificador do endereço |
| id_user | INTEGER | FK users(id), NOT NULL | Cliente dono do endereço |
| name | TEXT | NOT NULL | Logradouro ou nome do endereço |
| district | TEXT | NOT NULL | Bairro |
| city | TEXT | NOT NULL | Cidade |
| created_at | TIMESTAMPTZ | NOT NULL | Data de criação |
| updated_at | TIMESTAMPTZ | NOT NULL | Data de atualização |

## pets

| Campo | Tipo | Restrições | Descrição |
|---|---|---|---|
| id | SERIAL/INTEGER | PK | Identificador do pet |
| id_user | INTEGER | FK users(id), NOT NULL | Cliente tutor |
| name | TEXT | NOT NULL | Nome do pet |
| species | TEXT | NOT NULL | Espécie |
| breed | TEXT | NULL | Raça |
| birth_date | DATE | NULL | Data de nascimento |
| created_at | TIMESTAMPTZ | NOT NULL | Data de criação |
| updated_at | TIMESTAMPTZ | NOT NULL | Data de atualização |

## products

| Campo | Tipo | Restrições | Descrição |
|---|---|---|---|
| id | SERIAL/INTEGER | PK | Identificador do produto |
| name | TEXT | NOT NULL | Nome do produto |
| description | TEXT | NULL | Descrição |
| category | TEXT | NOT NULL | Categoria |
| price | NUMERIC(10,2) | NOT NULL, CHECK > 0 | Preço de venda |
| stock | INTEGER | NOT NULL, CHECK >= 0 | Quantidade em estoque |
| created_at | TIMESTAMPTZ | NOT NULL | Data de criação |
| updated_at | TIMESTAMPTZ | NOT NULL | Data de atualização |

## orders

| Campo | Tipo | Restrições | Descrição |
|---|---|---|---|
| id | SERIAL/INTEGER | PK | Identificador do pedido |
| id_user | INTEGER | FK users(id), NOT NULL | Cliente do pedido |
| status | TEXT | NOT NULL | Situação do pedido |
| total | NUMERIC(10,2) | NOT NULL, CHECK >= 0 | Total financeiro |
| created_at | TIMESTAMPTZ | NOT NULL | Data de criação |
| updated_at | TIMESTAMPTZ | NOT NULL | Data de atualização |

## order_items

| Campo | Tipo | Restrições | Descrição |
|---|---|---|---|
| id | SERIAL/INTEGER | PK | Identificador do item |
| id_order | INTEGER | FK orders(id), NOT NULL | Pedido |
| id_product | INTEGER | FK products(id), NOT NULL | Produto |
| quantity | INTEGER | NOT NULL, CHECK > 0 | Quantidade comprada |
| unit_price | NUMERIC(10,2) | NOT NULL, CHECK > 0 | Preço histórico do item |
| created_at | TIMESTAMPTZ | NOT NULL | Data de criação |
| updated_at | TIMESTAMPTZ | NOT NULL | Data de atualização |

## Índices

| Tabela | Campo | Tipo | Motivo |
|---|---|---|---|
| users | email | UNIQUE B-Tree | Login e garantia de email único |
| addresses | id_user | B-Tree | Consulta de endereços por cliente |
| addresses | city | B-Tree | Filtros por cidade |
| pets | id_user | B-Tree | Consulta de pets por tutor |
| pets | species | B-Tree | Filtros por espécie |
| products | category | B-Tree | Catálogo por categoria |
| products | stock | B-Tree | Relatório de baixo estoque |
| orders | id_user | B-Tree | Pedidos por cliente |
| orders | status | B-Tree | Filtros operacionais |
| orders | created_at | B-Tree | Relatórios por período |
| order_items | id_order, id_product | UNIQUE B-Tree | Evita produto duplicado no mesmo pedido |
| order_items | id_product | B-Tree | Produtos mais vendidos |
