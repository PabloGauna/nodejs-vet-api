module.exports = {
  async up({ queryInterface, sequelize }) {
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

    await queryInterface.createTable('clients', {
      id: {
        type: sequelize.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      full_name: {
        type: sequelize.Sequelize.STRING(150),
        allowNull: false,
      },
      phone: {
        type: sequelize.Sequelize.STRING(30),
        allowNull: true,
      },
      email: {
        type: sequelize.Sequelize.STRING(150),
        allowNull: true,
      },
      created_at: {
        type: sequelize.Sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.Sequelize.literal('NOW()'),
      },
    }).catch(() => null);

    await queryInterface.createTable('employees', {
      id: {
        type: sequelize.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      full_name: {
        type: sequelize.Sequelize.STRING(150),
        allowNull: false,
      },
      role: {
        type: sequelize.Sequelize.STRING(100),
        allowNull: false,
      },
      phone: {
        type: sequelize.Sequelize.STRING(30),
        allowNull: true,
      },
      email: {
        type: sequelize.Sequelize.STRING(150),
        allowNull: true,
      },
      hire_date: {
        type: sequelize.Sequelize.DATEONLY,
        allowNull: true,
      },
      created_at: {
        type: sequelize.Sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.Sequelize.literal('NOW()'),
      },
    }).catch(() => null);

    await queryInterface.createTable('pets', {
      id: {
        type: sequelize.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: sequelize.Sequelize.STRING(100),
        allowNull: false,
      },
      species: {
        type: sequelize.Sequelize.STRING(80),
        allowNull: false,
      },
      breed: {
        type: sequelize.Sequelize.STRING(100),
        allowNull: true,
      },
      birth_date: {
        type: sequelize.Sequelize.DATEONLY,
        allowNull: true,
      },
      client_id: {
        type: sequelize.Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'clients',
          key: 'id',
        },
        onDelete: 'SET NULL',
      },
      created_at: {
        type: sequelize.Sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.Sequelize.literal('NOW()'),
      },
    }).catch(() => null);
  },
};
