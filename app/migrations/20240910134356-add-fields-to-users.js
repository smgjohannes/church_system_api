'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'username', {
      type: Sequelize.STRING,
      unique: true,
    });

    await queryInterface.addColumn('users', 'reset_at', {
      type: Sequelize.DATE,
      allowNull: true,
    });

    await queryInterface.addColumn('users', 'activation_token', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('users', 'activation_expires', {
      type: Sequelize.DATE,
      allowNull: true,
    });

    await queryInterface.addColumn('users', 'hash', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('users', 'active', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    });

    await queryInterface.addColumn('users', 'activated_at', {
      type: Sequelize.DATE,
      allowNull: true,
    });

    // Adding the new fields
    await queryInterface.addColumn('users', 'country', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('users', 'address', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('users', 'phone', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('users', 'city', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('users', 'state', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('users', 'email_verified_at', {
      type: Sequelize.DATE,
      allowNull: true,
    });

    await queryInterface.addColumn('users', 'last_verified_email', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('users', 'first_name', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn('users', 'last_name', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn('users', 'dob', {
      type: Sequelize.DATEONLY,
      allowNull: true,
    });

    await queryInterface.addColumn('users', 'gender', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('users', 'passport_no', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('users', 'picture', {
      allowNull: true,
      type: Sequelize.TEXT,
      defaultValue: 'DEFAULT_PROFILE_PICTURE', // Use actual default value
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'provider_id');
    await queryInterface.removeColumn('users', 'reset_hash');
    await queryInterface.removeColumn('users', 'reset_at');
    await queryInterface.removeColumn('users', 'activation_token');
    await queryInterface.removeColumn('users', 'activation_expires');

    await queryInterface.removeColumn('users', 'active');
    await queryInterface.removeColumn('users', 'activated_at');

    // Removing the new fields
    await queryInterface.removeColumn('users', 'country');
    await queryInterface.removeColumn('users', 'address');
    await queryInterface.removeColumn('users', 'phone');
    await queryInterface.removeColumn('users', 'city');
    await queryInterface.removeColumn('users', 'state');
    await queryInterface.removeColumn('users', 'email_verified_at');
    await queryInterface.removeColumn('users', 'last_verified_email');
    await queryInterface.removeColumn('users', 'first_name');
    await queryInterface.removeColumn('users', 'last_name');
    await queryInterface.removeColumn('users', 'dob');
    await queryInterface.removeColumn('users', 'gender');
    await queryInterface.removeColumn('users', 'passport_no');
    await queryInterface.removeColumn('users', 'picture');
  },
};
