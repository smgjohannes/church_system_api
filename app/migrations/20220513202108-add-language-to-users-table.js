"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) =>
      Promise.all([
        queryInterface.addColumn(
          "users",
          "language",
          {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: "en",
          },
          { transaction: t }
        ),
      ])
    );
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) =>
      Promise.all([
        queryInterface.removeColumn("users", "language", {
          transaction: t,
        }),
      ])
    );
  },
};
