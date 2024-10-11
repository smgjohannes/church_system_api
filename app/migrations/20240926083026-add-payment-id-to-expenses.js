'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('expenses', 'payment_id', {
      type: Sequelize.UUID,
      allowNull: true, // You can adjust this based on your logic
      references: {
        model: 'payments', // name of the payments table
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL', // Adjust this based on your business logic
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('expenses', 'payment_id');
  },
};
