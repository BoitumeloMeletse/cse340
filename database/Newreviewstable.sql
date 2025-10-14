CREATE TABLE public.reviews (
    review_id SERIAL PRIMARY KEY,
    review_text TEXT NOT NULL,
    review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    inv_id INT NOT NULL REFERENCES inventory(inv_id) ON DELETE CASCADE,
    account_id INT NOT NULL REFERENCES account(account_id) ON DELETE CASCADE
);
