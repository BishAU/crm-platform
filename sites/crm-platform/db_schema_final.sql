-- Final revised SQL schema
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    registration_date TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INTEGER NOT NULL
);

CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    event_time TIME,
    is_upcoming BOOLEAN NOT NULL
);

CREATE TABLE resources (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    download_url VARCHAR(255)
);

CREATE TABLE coupons (
    id SERIAL PRIMARY KEY,
    code VARCHAR(255) UNIQUE NOT NULL,
    discount DECIMAL(5, 2) NOT NULL,
    expiry_date DATE NOT NULL
);

CREATE TABLE sales (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL REFERENCES products(id),
    customer_id INTEGER NOT NULL REFERENCES users(id),
    quantity INTEGER NOT NULL,
    revenue DECIMAL(10, 2) NOT NULL,
    sale_date DATE NOT NULL
);

CREATE TABLE educational_facilities (
    id SERIAL PRIMARY KEY,
    facility_name VARCHAR(255),
    address TEXT,
    contact_email VARCHAR(255),
    phone_number VARCHAR(255),
    surburb VARCHAR(255),
    postcode VARCHAR(255),
    type VARCHAR(255),
    sector VARCHAR(255),
    region_type VARCHAR(255),
    latitude DECIMAL(10, 6),
    longtitude DECIMAL(10, 6),
    affiliated_programs TEXT,
    photos TEXT,
    established_date VARCHAR(255),
    number_of_students INTEGER,
    indigenous_community_collaboration TEXT,
    water_authority_partnership TEXT,
    people TEXT
);
