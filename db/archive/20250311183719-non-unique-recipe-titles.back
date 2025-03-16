'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.removeConstraint('Recipes', "Recipes_title_key")
  },

  async down (queryInterface, Sequelize) {
    queryInterface.addConsraint('Recipes', ['title'], {type: 'unique'})
  }
};
