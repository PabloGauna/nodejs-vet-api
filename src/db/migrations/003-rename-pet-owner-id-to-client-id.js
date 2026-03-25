module.exports = {
  async up({ queryInterface }) {
    const tableDefinition = await queryInterface.describeTable('pets');

    if (tableDefinition.owner_id && !tableDefinition.client_id) {
      await queryInterface.renameColumn('pets', 'owner_id', 'client_id');
    }
  },
};
