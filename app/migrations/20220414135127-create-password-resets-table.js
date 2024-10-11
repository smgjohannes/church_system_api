module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('password_resets', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      user_agent: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      ip_address: {
        allowNull: false,
        type: Sequelize.STRING(45),
      },
      timestamp: {
        allowNull: false,
        type: Sequelize.BIGINT,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('password_resets');
  },
};
