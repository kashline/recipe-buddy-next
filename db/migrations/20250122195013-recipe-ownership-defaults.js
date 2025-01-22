'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.bulkUpdate('Recipes', {owner: 'RecipeBuddy'}, {owner: null})
      ])
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.bulkUpdate('Recipes', {owner: null}, {owner: 'RecipeBuddy'})
      ]);
    });
  }
};
