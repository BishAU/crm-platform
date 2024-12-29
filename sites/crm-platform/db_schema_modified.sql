-- Modified SQL script with HTML comments removed and geography data type verified
CREATE TABLE facilities (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(255),
  description TEXT,
  location GEOGRAPHY(POINT, 4326),  -- Verify PostGIS extension is enabled for this to work
  ...
);
-- Other tables and relationships...
