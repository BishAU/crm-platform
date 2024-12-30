-- Create VCC platform tables if they don't exist
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT,
    name TEXT,
    role TEXT DEFAULT 'USER',
    stripeCustomerId TEXT UNIQUE,
    subscriptionId TEXT UNIQUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL NOT NULL,
    stripePriceId TEXT UNIQUE NOT NULL,
    metadata JSONB,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    userId TEXT REFERENCES users(id),
    productId TEXT REFERENCES products(id),
    status TEXT DEFAULT 'pending',
    amount DECIMAL NOT NULL,
    stripePaymentIntentId TEXT,
    xeroInvoiceId TEXT,
    metadata JSONB,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS subscriptions (
    id TEXT PRIMARY KEY,
    userId TEXT UNIQUE REFERENCES users(id),
    productId TEXT REFERENCES products(id),
    stripeSubscriptionId TEXT UNIQUE NOT NULL,
    status TEXT NOT NULL,
    currentPeriodEnd TIMESTAMP NOT NULL,
    cancelAtPeriodEnd BOOLEAN DEFAULT false,
    metadata JSONB,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Grant permissions to vcc_user
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO vcc_user;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO vcc_user;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_products_stripePriceId ON products(stripePriceId);
CREATE INDEX IF NOT EXISTS idx_orders_userId ON orders(userId);
CREATE INDEX IF NOT EXISTS idx_orders_productId ON orders(productId);
CREATE INDEX IF NOT EXISTS idx_subscriptions_userId ON subscriptions(userId);
CREATE INDEX IF NOT EXISTS idx_subscriptions_productId ON subscriptions(productId);
