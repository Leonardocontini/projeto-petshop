-- Consultas críticas do sistema PetShop
-- Execute cada bloco no Beekeeper Studio.
-- Para evidência de otimização, tire print do resultado do EXPLAIN,
-- observando tempo de execução, uso de índices e quantidade de linhas lidas.

-- 1. Relatório de clientes com pedidos e valor total comprado
-- Importância:
--   Identifica os clientes mais importantes para vendas, atendimento e campanhas.
-- Otimização esperada:
--   Usa PK de users e índice idx_orders_id_user para relacionar pedidos por cliente.
EXPLAIN (ANALYZE, BUFFERS)
SELECT
    u.id,
    u.name,
    u.email,
    COUNT(o.id) AS total_pedidos,
    COALESCE(SUM(o.total), 0)::NUMERIC(10, 2) AS valor_total
FROM users u
LEFT JOIN orders o ON o.id_user = u.id
GROUP BY u.id, u.name, u.email
ORDER BY valor_total DESC, total_pedidos DESC;

-- Consulta sem EXPLAIN, para visualizar o resultado final:
SELECT
    u.id,
    u.name,
    u.email,
    COUNT(o.id) AS total_pedidos,
    COALESCE(SUM(o.total), 0)::NUMERIC(10, 2) AS valor_total
FROM users u
LEFT JOIN orders o ON o.id_user = u.id
GROUP BY u.id, u.name, u.email
ORDER BY valor_total DESC, total_pedidos DESC;


-- 2. Produtos mais vendidos por quantidade e faturamento
-- Importância:
--   Mostra quais produtos têm maior saída e ajudam na decisão de reposição de estoque.
-- Otimização esperada:
--   Usa PK de products e índice idx_order_items_id_product no JOIN com order_items.
EXPLAIN (ANALYZE, BUFFERS)
SELECT
    p.id,
    p.name,
    p.category,
    SUM(oi.quantity) AS quantidade_vendida,
    SUM(oi.quantity * oi.unit_price)::NUMERIC(10, 2) AS faturamento
FROM products p
JOIN order_items oi ON oi.id_product = p.id
GROUP BY p.id, p.name, p.category
ORDER BY quantidade_vendida DESC, faturamento DESC
LIMIT 10;

SELECT
    p.id,
    p.name,
    p.category,
    SUM(oi.quantity) AS quantidade_vendida,
    SUM(oi.quantity * oi.unit_price)::NUMERIC(10, 2) AS faturamento
FROM products p
JOIN order_items oi ON oi.id_product = p.id
GROUP BY p.id, p.name, p.category
ORDER BY quantidade_vendida DESC, faturamento DESC
LIMIT 10;


-- 3. Faturamento mensal dos pedidos pagos, enviados ou entregues
-- Importância:
--   Gera relatório financeiro por mês e permite acompanhar evolução de receita.
-- Otimização esperada:
--   Usa índice idx_orders_created_at no filtro por data e idx_orders_status no filtro por status.
EXPLAIN (ANALYZE, BUFFERS)
SELECT
    DATE_TRUNC('month', o.created_at) AS mes,
    COUNT(*) AS total_pedidos,
    SUM(o.total)::NUMERIC(10, 2) AS faturamento
FROM orders o
WHERE o.status IN ('paid', 'sent', 'delivered')
  AND o.created_at >= CURRENT_DATE - INTERVAL '12 months'
GROUP BY DATE_TRUNC('month', o.created_at)
ORDER BY mes DESC;

SELECT
    DATE_TRUNC('month', o.created_at) AS mes,
    COUNT(*) AS total_pedidos,
    SUM(o.total)::NUMERIC(10, 2) AS faturamento
FROM orders o
WHERE o.status IN ('paid', 'sent', 'delivered')
  AND o.created_at >= CURRENT_DATE - INTERVAL '12 months'
GROUP BY DATE_TRUNC('month', o.created_at)
ORDER BY mes DESC;


-- 4. Produtos com estoque baixo
-- Importância:
--   Ajuda a evitar falta de produtos vendidos pela loja.
-- Otimização esperada:
--   Usa índice idx_products_stock para localizar rapidamente itens com baixo estoque.
EXPLAIN (ANALYZE, BUFFERS)
SELECT
    p.id,
    p.name,
    p.category,
    p.stock,
    p.price
FROM products p
WHERE p.stock <= 25
ORDER BY p.stock ASC, p.name ASC;

SELECT
    p.id,
    p.name,
    p.category,
    p.stock,
    p.price
FROM products p
WHERE p.stock <= 25
ORDER BY p.stock ASC, p.name ASC;


-- 5. Pets por espécie e cidade do tutor
-- Importância:
--   Apoia campanhas segmentadas, por exemplo produtos para cães/gatos por região.
-- Otimização esperada:
--   Usa idx_pets_id_user, idx_addresses_id_user e idx_addresses_city nos relacionamentos e agrupamentos.
EXPLAIN (ANALYZE, BUFFERS)
SELECT
    p.species,
    a.city,
    COUNT(*) AS total_pets
FROM pets p
JOIN users u ON u.id = p.id_user
JOIN addresses a ON a.id_user = u.id
GROUP BY p.species, a.city
ORDER BY total_pets DESC, p.species ASC, a.city ASC;

SELECT
    p.species,
    a.city,
    COUNT(*) AS total_pets
FROM pets p
JOIN users u ON u.id = p.id_user
JOIN addresses a ON a.id_user = u.id
GROUP BY p.species, a.city
ORDER BY total_pets DESC, p.species ASC, a.city ASC;
