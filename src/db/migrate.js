const fs = require('fs');
const path = require('path');
const sequelize = require('./sequelize');

async function ensureMigrationsTable() {
  await sequelize.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE,
      run_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `);
}

async function getAppliedMigrationNames() {
  const [rows] = await sequelize.query(
    'SELECT name FROM schema_migrations ORDER BY name ASC',
  );

  return new Set(rows.map((row) => row.name));
}

async function runMigrations() {
  await ensureMigrationsTable();

  const migrationsDirectory = path.join(__dirname, 'migrations');
  const migrationFiles = fs
    .readdirSync(migrationsDirectory)
    .filter((fileName) => fileName.endsWith('.js'))
    .sort();

  const appliedMigrationNames = await getAppliedMigrationNames();
  const queryInterface = sequelize.getQueryInterface();

  for (const fileName of migrationFiles) {
    if (appliedMigrationNames.has(fileName)) {
      continue;
    }

    const migration = require(path.join(migrationsDirectory, fileName));

    await migration.up({ queryInterface, sequelize });
    await sequelize.query(
      'INSERT INTO schema_migrations (name) VALUES ($1)',
      {
        bind: [fileName],
      },
    );
  }
}

module.exports = {
  runMigrations,
};
