DROP DATABASE IF EXISTS fb_messenger_bot;
CREATE DATABASE fb_messenger_bot;

\c fb_messenger_bot;

CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(40) PRIMARY KEY UNIQUE
);

CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  date_created TIMESTAMP DEFAULT now() NOT NULL,
  date_modified TIMESTAMP DEFAULT NULL,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  description VARCHAR (300) NOT NULL,
  user_id VARCHAR(40) NOT NULL REFERENCES users ON DELETE CASCADE
);

INSERT INTO users (id) VALUES ('12345abcde');
INSERT INTO tasks (description, user_id) VALUES ('Wash car', '12345abcde');
INSERT INTO tasks (description, user_id) VALUES ('Buy milk, veggies, meat, bread, grapes, and watermelon at Safeway', '12345abcde');
