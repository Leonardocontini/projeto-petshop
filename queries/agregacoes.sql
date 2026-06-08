-- Ticket médio por status
SELECT
    status,
    COUNT(*) AS total_pedidos,
    AVG(total)::NUMERIC(10, 2) AS ticket_medio
FROM orders
GROUP BY status
ORDER BY total_pedidos DESC;

-- Faturamento por categoria
SELECT
    p.category,
    SUM(oi.quantity * oi.unit_price)::NUMERIC(10, 2) AS faturamento
FROM order_items oi
JOIN products p ON p.id = oi.id_product
JOIN orders o ON o.id = oi.id_order
WHERE o.status IN ('paid', 'sent', 'delivered')
GROUP BY p.category
ORDER BY faturamento DESC;

-- Clientes com mais pets cadastrados
SELECT
    u.id,
    u.name,
    COUNT(p.id) AS total_pets
FROM users u
JOIN pets p ON p.id_user = u.id
GROUP BY u.id, u.name
ORDER BY total_pets DESC, u.name ASC;
