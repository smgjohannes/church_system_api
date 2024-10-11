'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('payments', 'id', {
      autoIncrement: false,

      type: Sequelize.UUID,
      defaultValue: Sequelize.UUID,
    });
    await queryInterface.createTable('member_payments', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUID,
      },
      member_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'members',
          key: 'id',
        },
      },
      payment_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'payments',
          key: 'id',
        },
      },
      church_id: {
        type: Sequelize.UUID, // Assuming the `church_id` is a UUID
        allowNull: true, // Adjust this based on your requirements
        references: {
          model: 'churches', // Name of the table that `church_id` references
          key: 'id', // Primary key in the `churches` table
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('member_payments');
  },
};
