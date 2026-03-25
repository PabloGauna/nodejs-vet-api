const sequelize = require('./sequelize');
const { runMigrations } = require('./migrate');

async function initializeDatabase() {
  await sequelize.authenticate();
  await runMigrations();
}

module.exports = {
  initializeDatabase,
};
