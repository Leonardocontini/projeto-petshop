INSERT INTO users (name, email, password, phone)
SELECT
    'Cliente ' || gs,
    'cliente' || gs || '@petshop.local',
    '$2b$10$31/yfOZ2YjuAzdL.GHviguSpYa83mOcMtFloUge/CdK4Yr0EkBooq',
    '1199000' || LPAD(gs::TEXT, 4, '0')
FROM generate_series(1, 40) AS gs;

INSERT INTO addresses (id_user, name, district, city)
SELECT
    id,
    'Rua Pet ' || id,
    CASE WHEN id % 3 = 0 THEN 'Centro' WHEN id % 3 = 1 THEN 'Jardim' ELSE 'Vila' END,
    CASE WHEN id % 2 = 0 THEN 'Atibaia' ELSE 'Bragança Paulista' END
FROM users
WHERE id <= 40;

INSERT INTO pets (id_user, name, species, breed, birth_date)
SELECT
    id,
    'Pet ' || id,
    CASE WHEN id % 2 = 0 THEN 'Cachorro' ELSE 'Gato' END,
    CASE WHEN id % 2 = 0 THEN 'SRD Canino' ELSE 'SRD Felino' END,
    DATE '2020-01-01' + (id * INTERVAL '15 days')
FROM users
WHERE id <= 40;

INSERT INTO products (name, description, category, price, stock)
SELECT
    'Produto Pet ' || gs,
    'Produto fictício para teste de performance ' || gs,
    CASE
        WHEN gs % 5 = 0 THEN 'Higiene'
        WHEN gs % 5 = 1 THEN 'Alimentação'
        WHEN gs % 5 = 2 THEN 'Brinquedos'
        WHEN gs % 5 = 3 THEN 'Medicamentos'
        ELSE 'Acessórios'
    END,
    (10 + (gs * 2.35))::NUMERIC(10, 2),
    20 + (gs % 80)
FROM generate_series(1, 60) AS gs;

INSERT INTO orders (id_user, status, total, created_at, updated_at)
SELECT
    ((gs - 1) % 40) + 1,
    CASE
        WHEN gs % 5 = 0 THEN 'delivered'
        WHEN gs % 5 = 1 THEN 'paid'
        WHEN gs % 5 = 2 THEN 'sent'
        WHEN gs % 5 = 3 THEN 'pending'
        ELSE 'cancelled'
    END,
    0,
    CURRENT_TIMESTAMP - (gs || ' days')::INTERVAL,
    CURRENT_TIMESTAMP - (gs || ' days')::INTERVAL
FROM generate_series(1, 80) AS gs;

INSERT INTO order_items (id_order, id_product, quantity, unit_price)
SELECT
    o.id,
    ((o.id - 1) % 60) + 1,
    (o.id % 3) + 1,
    p.price
FROM orders o
JOIN products p ON p.id = ((o.id - 1) % 60) + 1;

INSERT INTO order_items (id_order, id_product, quantity, unit_price)
SELECT
    o.id,
    ((o.id + 9) % 60) + 1,
    (o.id % 2) + 1,
    p.price
FROM orders o
JOIN products p ON p.id = ((o.id + 9) % 60) + 1
WHERE o.id <= 40;

UPDATE orders o
SET total = totals.total
FROM (
    SELECT id_order, SUM(quantity * unit_price)::NUMERIC(10, 2) AS total
    FROM order_items
    GROUP BY id_order
) totals
WHERE totals.id_order = o.id;
