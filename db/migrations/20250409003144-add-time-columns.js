"use strict";

const { DataTypes } = require("sequelize");
const tables = [
  "Recipes",
  "Ingredients",
  "RecipeIngredients",
  "RecipeComments",
  "RecipeSteps",
  "UserRecipes",
  "Users",
];


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        tables.map((table) => {
          queryInterface.addColumn(table, "createdAt", {
            type: DataTypes.DATE,
          });
          queryInterface.addColumn(table, "updatedAt", {
            type: DataTypes.DATE,
          });
          queryInterface.bulkUpdate(table, {createdAt: new Date(), updatedAt: new Date()}, {})
        }),
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        tables.map((table) => {
          queryInterface.removeColumn(table, "createdAt", {
            type: DataTypes.DATE,
          });
          queryInterface.removeColumn(table, "updatedAt", {
            type: DataTypes.DATE,
          });
        }),
      ]);
    });
  },
};
