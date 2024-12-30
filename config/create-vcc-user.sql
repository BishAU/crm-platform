-- Create new user for VCC platform
CREATE USER vcc_user WITH PASSWORD 'vcc_password_here';

-- Grant connect permission to the database
GRANT CONNECT ON DATABASE postgres TO vcc_user;

-- Grant usage on schema
GRANT USAGE ON SCHEMA public TO vcc_user;

-- Grant permissions only to VCC-related tables
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE 
    users,
    products,
    orders,
    subscriptions
TO vcc_user;

-- Grant sequence usage for ID generation
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO vcc_user;

-- Revoke access to non-VCC tables
REVOKE ALL PRIVILEGES ON TABLE 
    educational_facilities,
    indigenous_communities,
    land_councils,
    master_outfalls,
    outfall_observations,
    outfall_types,
    people,
    politicians,
    postcodes,
    states,
    water_authorities
FROM vcc_user;
