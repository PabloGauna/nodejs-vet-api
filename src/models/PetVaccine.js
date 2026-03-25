const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

const PetVaccine = sequelize.define(
  'PetVaccine',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    pet_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    application_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    next_due_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'pet_vaccines',
    createdAt: 'created_at',
    updatedAt: false,
  },
);

module.exports = PetVaccine;
