"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn("Ingredients", "recipeId", {
          transaction: t,
        }),
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          "Ingredients",
          "recipeId",
          { type: Sequelize.DataTypes.INTEGER },
          { transaction: t },
        ),
      ]);
    });
  },
};
