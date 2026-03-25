const { sequelize } = require('../models');

async function initializeDatabase() {
  await sequelize.authenticate();

  await sequelize.query(`
    DO $$
    BEGIN
      IF to_regclass('public.people') IS NOT NULL
         AND to_regclass('public.clients') IS NULL THEN
        ALTER TABLE people RENAME TO clients;
      END IF;
    END
    $$;

  `);

  await sequelize.sync();
}

module.exports = {
  initializeDatabase,
};
