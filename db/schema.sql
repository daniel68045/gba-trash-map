-- Initial database schema

-- Meant to define the structure of database (e.g. CREATE TABLE elements)

-- Already handled by SQLAlchemy’s db.create_all(), so the file can serve as a backup or for manual database recreation

-- Create the trash_logs table
CREATE TABLE IF NOT EXISTS trash_logs (
  id SERIAL PRIMARY KEY,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL,
  description VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
