# Consultas Críticas

As consultas críticas abaixo foram criadas para demonstrar uso real do banco PostgreSQL no sistema PetShop. Elas envolvem JOINs, agregações, relatórios, filtros por data e análise de desempenho com `EXPLAIN (ANALYZE, BUFFERS)`.

Para executar:

1. Abra o Beekeeper Studio.
2. Conecte no banco `unifaat_dw`.
3. Abra o arquivo `queries/consultas_avancadas.sql`.
4. Execute primeiro a versão com `EXPLAIN (ANALYZE, BUFFERS)`.
5. Tire print do plano de execução como evidência de otimização.
6. Execute a consulta sem `EXPLAIN` para mostrar o resultado do relatório.

## 1. Clientes com pedidos e valor total comprado

Essa consulta lista clientes, quantidade de pedidos e valor total comprado. Ela é importante para identificar clientes mais relevantes comercialmente, apoiar campanhas e entender quem gera mais faturamento.

Otimização: usa relacionamento `users -> orders`, com chave primária em `users.id` e índice `idx_orders_id_user` em `orders.id_user`.

## 2. Produtos mais vendidos

Essa consulta mostra os produtos com maior quantidade vendida e maior faturamento. Ela é importante para gestão de estoque, reposição de produtos e análise de vendas.

Otimização: usa JOIN entre `products` e `order_items`, com chave primária em `products.id` e índice `idx_order_items_id_product` em `order_items.id_product`.

## 3. Faturamento mensal dos últimos 12 meses

Essa consulta gera um relatório financeiro mensal considerando pedidos pagos, enviados ou entregues. Ela é importante para acompanhar evolução da receita e medir desempenho do negócio por período.

Otimização: usa filtro por data em `orders.created_at`, índice `idx_orders_created_at` e filtro por status com `idx_orders_status`.

## 4. Produtos com estoque baixo

Essa consulta lista produtos com estoque menor ou igual a 25. Ela é importante para evitar ruptura de estoque e priorizar compras de reposição.

Otimização: usa filtro em `products.stock`, apoiado pelo índice `idx_products_stock`.

## 5. Pets por espécie e cidade do tutor

Essa consulta agrupa pets por espécie e cidade do tutor. Ela é importante para campanhas segmentadas, por exemplo produtos para cães em determinada cidade.

Otimização: usa JOINs entre `pets`, `users` e `addresses`, aproveitando os índices `idx_pets_id_user`, `idx_addresses_id_user` e `idx_addresses_city`.

## Evidências de Otimização

As evidências podem ser apresentadas com prints do resultado do `EXPLAIN (ANALYZE, BUFFERS)`. No plano de execução, procure por:

- `Index Scan` ou `Bitmap Index Scan`: indica uso de índice.
- `Execution Time`: mostra o tempo total da consulta.
- `Planning Time`: mostra o tempo de planejamento.
- `Buffers`: mostra quantos blocos foram acessados em memória ou disco.
- Menor quantidade de linhas lidas em comparação com o total da tabela.

Observação: em tabelas pequenas, o PostgreSQL pode escolher `Seq Scan`, porque ler a tabela inteira pode ser mais barato que usar índice. Isso não significa erro; a evidência de otimização também pode ser demonstrada mostrando que os índices existem e que a consulta foi escrita usando colunas indexadas.
