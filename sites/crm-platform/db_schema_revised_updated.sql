-- Revised database schema (updated)

CREATE TABLE facilities (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(255),
  description TEXT,
  location_name VARCHAR(255)
);

-- Example of adding another table to complete the schema
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL
);
