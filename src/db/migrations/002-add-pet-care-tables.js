module.exports = {
  async up({ queryInterface, sequelize }) {
    await queryInterface.createTable('pet_vaccines', {
      id: {
        type: sequelize.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      pet_id: {
        type: sequelize.Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'pets',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      name: {
        type: sequelize.Sequelize.STRING(150),
        allowNull: false,
      },
      application_date: {
        type: sequelize.Sequelize.DATEONLY,
        allowNull: false,
      },
      next_due_date: {
        type: sequelize.Sequelize.DATEONLY,
        allowNull: true,
      },
      notes: {
        type: sequelize.Sequelize.TEXT,
        allowNull: true,
      },
      created_at: {
        type: sequelize.Sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.Sequelize.literal('NOW()'),
      },
    }).catch(() => null);

    await queryInterface.createTable('pet_medications', {
      id: {
        type: sequelize.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      pet_id: {
        type: sequelize.Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'pets',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      name: {
        type: sequelize.Sequelize.STRING(150),
        allowNull: false,
      },
      dosage: {
        type: sequelize.Sequelize.STRING(100),
        allowNull: true,
      },
      start_date: {
        type: sequelize.Sequelize.DATEONLY,
        allowNull: false,
      },
      end_date: {
        type: sequelize.Sequelize.DATEONLY,
        allowNull: true,
      },
      notes: {
        type: sequelize.Sequelize.TEXT,
        allowNull: true,
      },
      created_at: {
        type: sequelize.Sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.Sequelize.literal('NOW()'),
      },
    }).catch(() => null);
  },
};
