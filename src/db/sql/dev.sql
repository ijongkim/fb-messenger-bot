\c fb_messenger_bot;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR (80) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS addresses (
  id SERIAL PRIMARY KEY,
  full_address text NOT NULL,
  user_id INTEGER NOT NULL REFERENCES users ON DELETE CASCADE
);

INSERT INTO users (username) VALUES ('admin');
INSERT INTO users (username) VALUES ('guest');
INSERT INTO addresses (full_address, user_id) VALUES ('1 Market St, San Francisco CA 94105', 1);
INSERT INTO addresses (full_address, user_id) VALUES ('1 Telegraph Hill Blvd, San Francisco, CA 94133', 2);
