# Modelo Lógico

```txt
users (
  id PK,
  name,
  email UNIQUE,
  password,
  phone,
  picture,
  created_at,
  updated_at
)

addresses (
  id PK,
  id_user FK -> users.id,
  name,
  district,
  city,
  created_at,
  updated_at
)

pets (
  id PK,
  id_user FK -> users.id,
  name,
  species,
  breed,
  birth_date,
  created_at,
  updated_at
)

products (
  id PK,
  name,
  description,
  category,
  price,
  stock,
  created_at,
  updated_at
)

orders (
  id PK,
  id_user FK -> users.id,
  status,
  total,
  created_at,
  updated_at
)

order_items (
  id PK,
  id_order FK -> orders.id,
  id_product FK -> products.id,
  quantity,
  unit_price,
  created_at,
  updated_at,
  UNIQUE (id_order, id_product)
)
```

Relações:

- `users 1:N addresses`
- `users 1:N pets`
- `users 1:N orders`
- `orders N:N products` via `order_items`
