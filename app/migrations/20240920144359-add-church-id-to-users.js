'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'church_id', {
      type: Sequelize.UUID, // or Sequelize.BIGINT, depending on your case
      allowNull: true, // Set to true if church_id can be null
      references: {
        model: 'Churches', // name of the related table
        key: 'id', // key in the related table
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL', // Adjust based on your requirements
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'church_id');
  },
};
