-- Rename columns to fix typos
ALTER TABLE facilities RENAME COLUMN longtitude TO longitude;
ALTER TABLE facilities RENAME COLUMN surburb TO suburb;