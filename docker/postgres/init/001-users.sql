CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NULL,
    picture TEXT UNIQUE NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, email, password) VALUES
('Teste', 'teste@teste.com', '$2b$10$31/yfOZ2YjuAzdL.GHviguSpYa83mOcMtFloUge/CdK4Yr0EkBooq'),
('Bruno Souza', 'bruno.souza@email.com', '$2b$10$31/yfOZ2YjuAzdL.GHviguSpYa83mOcMtFloUge/CdK4Yr0EkBooq'),
('Carla Oliveira', 'carla.oliveira@email.com', '$2b$10$31/yfOZ2YjuAzdL.GHviguSpYa83mOcMtFloUge/CdK4Yr0EkBooq'),
('Daniel Santos', 'daniel.santos@email.com', '$2b$10$31/yfOZ2YjuAzdL.GHviguSpYa83mOcMtFloUge/CdK4Yr0EkBooq')