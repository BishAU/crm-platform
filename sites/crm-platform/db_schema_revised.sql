-- Revised database schema (without geospatial elements)

CREATE TABLE facilities (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(255),
  description TEXT,
  location_name VARCHAR(255),  -- Replaced GEOGRAPHY with VARCHAR
  ...
);

-- Other tables with geospatial elements removed or updated...
