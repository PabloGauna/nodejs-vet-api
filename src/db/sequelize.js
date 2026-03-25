const { Sequelize } = require('sequelize');

const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      logging: false,
    })
  : new Sequelize(
      process.env.PGDATABASE || 'vet_clinic',
      process.env.PGUSER || 'postgres',
      process.env.PGPASSWORD || 'postgres',
      {
        host: process.env.PGHOST || 'localhost',
        port: Number(process.env.PGPORT || 5432),
        dialect: 'postgres',
        logging: false,
      },
    );

module.exports = sequelize;
