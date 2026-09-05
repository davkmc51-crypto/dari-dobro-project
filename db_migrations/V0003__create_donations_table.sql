CREATE TABLE IF NOT EXISTS donations (
    id SERIAL PRIMARY KEY,
    external_id VARCHAR(255) UNIQUE,
    amount NUMERIC(12, 2) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'paid',
    fundraiser_slug VARCHAR(255),
    raw_payload JSONB,
    created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_donations_status ON donations(status);
