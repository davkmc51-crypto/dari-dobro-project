CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    rating SMALLINT NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
    text TEXT NOT NULL,
    is_approved BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_reviews_approved ON reviews (is_approved, created_at DESC);
