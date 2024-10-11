module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) =>
      Promise.all([
        queryInterface.addColumn(
          'users',
          'role',
          {
            type: Sequelize.ENUM,
            values: ['superadmin', 'admin', 'user'],
            defaultValue: 'user',
            after: 'password',
          },
          { transaction: t }
        ),
      ])
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) =>
      Promise.all([
        queryInterface.removeColumn('users', 'role', {
          transaction: t,
        }),
      ])
    );
  },
};
