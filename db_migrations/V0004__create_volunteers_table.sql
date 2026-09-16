CREATE TABLE IF NOT EXISTS volunteers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    skills VARCHAR(255),
    message TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT now()
);
