const sequelize = require('../db/sequelize');
const Client = require('./Client');
const Employee = require('./Employee');
const Pet = require('./Pet');

Client.hasMany(Pet, {
  foreignKey: 'owner_id',
  as: 'pets',
});

Pet.belongsTo(Client, {
  foreignKey: 'owner_id',
  as: 'owner',
});

module.exports = {
  sequelize,
  Client,
  Employee,
  Pet,
};
