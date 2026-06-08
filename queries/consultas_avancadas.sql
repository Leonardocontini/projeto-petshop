-- 1. Pedidos por cliente com quantidade de itens
EXPLAIN ANALYZE
SELECT
    u.id,
    u.name,
    COUNT(o.id) AS total_pedidos,
    COALESCE(SUM(o.total), 0) AS valor_total
FROM users u
LEFT JOIN orders o ON o.id_user = u.id
GROUP BY u.id, u.name
ORDER BY valor_total DESC;

-- 2. Produtos mais vendidos
EXPLAIN ANALYZE
SELECT
    p.id,
    p.name,
    p.category,
    SUM(oi.quantity) AS quantidade_vendida,
    SUM(oi.quantity * oi.unit_price) AS faturamento
FROM products p
JOIN order_items oi ON oi.id_product = p.id
GROUP BY p.id, p.name, p.category
ORDER BY quantidade_vendida DESC
LIMIT 10;

-- 3. Faturamento por período
EXPLAIN ANALYZE
SELECT
    DATE_TRUNC('month', created_at) AS mes,
    SUM(total) AS faturamento
FROM orders
WHERE status IN ('paid', 'sent', 'delivered')
GROUP BY DATE_TRUNC('month', created_at)
ORDER BY mes DESC;

-- 4. Produtos com baixo estoque
EXPLAIN ANALYZE
SELECT id, name, category, stock
FROM products
WHERE stock <= 25
ORDER BY stock ASC, name ASC;

-- 5. Pets por espécie e cidade do tutor
EXPLAIN ANALYZE
SELECT
    p.species,
    a.city,
    COUNT(*) AS total_pets
FROM pets p
JOIN users u ON u.id = p.id_user
JOIN addresses a ON a.id_user = u.id
GROUP BY p.species, a.city
ORDER BY total_pets DESC;
