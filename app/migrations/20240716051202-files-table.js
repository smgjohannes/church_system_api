'use strict';

const { sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('files', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUID,
      },
      name: {
        type: Sequelize.STRING,
      },
      file_type: {
        type: Sequelize.ENUM('pdf', 'excel', 'doc', 'csv'),
        defaultValue: 'pdf',
      },
      path: {
        type: Sequelize.STRING,
      },
      url: {
        type: Sequelize.STRING,
      },
      fileable_id: {
        type: Sequelize.STRING,
      },
      fileable_type: {
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('files');
  },
};
