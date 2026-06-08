-- CREATE
INSERT INTO products (name, description, category, price, stock)
VALUES ('Coleira ajustável', 'Coleira para cães de pequeno porte', 'Acessórios', 39.90, 30);

-- READ list
SELECT id, name, category, price, stock
FROM products
ORDER BY id
LIMIT 10 OFFSET 0;

-- READ get
SELECT *
FROM products
WHERE id = 1;

-- UPDATE
UPDATE products
SET price = 42.90, stock = 35, updated_at = CURRENT_TIMESTAMP
WHERE id = 1;

-- DELETE
DELETE FROM products
WHERE id = 1;
