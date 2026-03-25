const renameOwnerToClient = require('../src/db/migrations/003-rename-pet-owner-id-to-client-id');
const addPetCareTables = require('../src/db/migrations/002-add-pet-care-tables');

describe('Migration: 003-rename-pet-owner-id-to-client-id', () => {
  test('renames owner_id to client_id when needed', async () => {
    const queryInterface = {
      describeTable: jest.fn().mockResolvedValue({ owner_id: {}, client_id: undefined }),
      renameColumn: jest.fn().mockResolvedValue(undefined),
    };

    await renameOwnerToClient.up({ queryInterface });

    expect(queryInterface.renameColumn).toHaveBeenCalledWith('pets', 'owner_id', 'client_id');
  });

  test('does not rename if client_id already exists', async () => {
    const queryInterface = {
      describeTable: jest.fn().mockResolvedValue({ owner_id: {}, client_id: {} }),
      renameColumn: jest.fn().mockResolvedValue(undefined),
    };

    await renameOwnerToClient.up({ queryInterface });

    expect(queryInterface.renameColumn).not.toHaveBeenCalled();
  });
});

describe('Migration: 002-add-pet-care-tables', () => {
  test('creates vaccines and medications tables', async () => {
    const queryInterface = {
      createTable: jest.fn().mockResolvedValue(undefined),
    };

    const sequelize = {
      Sequelize: {
        INTEGER: 'INTEGER',
        STRING: () => 'STRING',
        DATEONLY: 'DATEONLY',
        TEXT: 'TEXT',
        DATE: 'DATE',
        literal: () => 'NOW()',
      },
    };

    await addPetCareTables.up({ queryInterface, sequelize });

    expect(queryInterface.createTable).toHaveBeenCalledWith('pet_vaccines', expect.any(Object));
    expect(queryInterface.createTable).toHaveBeenCalledWith('pet_medications', expect.any(Object));
  });
});
