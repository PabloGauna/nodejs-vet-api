const pool = require('./pool');

async function initializeDatabase() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS people (
      id SERIAL PRIMARY KEY,
      full_name VARCHAR(150) NOT NULL,
      phone VARCHAR(30),
      email VARCHAR(150),
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS employees (
      id SERIAL PRIMARY KEY,
      full_name VARCHAR(150) NOT NULL,
      role VARCHAR(100) NOT NULL,
      phone VARCHAR(30),
      email VARCHAR(150),
      hire_date DATE,
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS pets (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      species VARCHAR(80) NOT NULL,
      breed VARCHAR(100),
      birth_date DATE,
      owner_id INTEGER REFERENCES people(id) ON DELETE SET NULL,
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `);
}

module.exports = {
  initializeDatabase,
};
