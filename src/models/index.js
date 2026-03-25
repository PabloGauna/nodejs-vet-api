const sequelize = require('../db/sequelize');
const Client = require('./Client');
const Employee = require('./Employee');
const Pet = require('./Pet');
const PetVaccine = require('./PetVaccine');
const PetMedication = require('./PetMedication');

Client.hasMany(Pet, {
  foreignKey: 'client_id',
  as: 'pets',
});

Pet.belongsTo(Client, {
  foreignKey: 'client_id',
  as: 'client',
});

Pet.hasMany(PetVaccine, {
  foreignKey: 'pet_id',
  as: 'vaccines',
});

PetVaccine.belongsTo(Pet, {
  foreignKey: 'pet_id',
  as: 'pet',
});

Pet.hasMany(PetMedication, {
  foreignKey: 'pet_id',
  as: 'medications',
});

PetMedication.belongsTo(Pet, {
  foreignKey: 'pet_id',
  as: 'pet',
});

module.exports = {
  sequelize,
  Client,
  Employee,
  Pet,
  PetVaccine,
  PetMedication,
};
