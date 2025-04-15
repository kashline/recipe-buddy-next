"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn("Users", "name", { type: DataTypes.STRING }),
        queryInterface.addColumn("Users", "email", {
          type: DataTypes.STRING,
          unique: true,
        }),
        queryInterface.addColumn("Users", "emailVerified", {
          type: DataTypes.BOOLEAN,
        }),
        queryInterface.addColumn("Users", "image", { type: DataTypes.TEXT }),
        queryInterface.renameColumn("Users", "auth0Id", "sub"),
        queryInterface.removeColumn("Users", "firstName"),
        queryInterface.removeColumn("Users", "lastName"),
        // queryInterface.renameColumn("UserRecipes", "UserSub", "UserEmail"),
        // queryInterface.removeColumn("Users", "auth0Id"),
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn("Users", "name"),
        queryInterface.removeColumn("Users", "email"),
        queryInterface.removeColumn("Users", "emailVerified"),
        queryInterface.removeColumn("Users", "image"),
        queryInterface.renameColumn("Users", "sub", "auth0Id"),
        queryInterface.addColumn("Users", "firstName", {
          type: DataTypes.STRING,
        }),
        queryInterface.addColumn("Users", "lastName", {
          type: DataTypes.STRING,
        }),
        // queryInterface.renameColumn("UserRecipes", "UserEmail", "UserSub"),
        // queryInterface.addColumn("Users", "auth0Id", {
        //   type: DataTypes.STRING,
        // }),
      ]);
    });
  },
};
