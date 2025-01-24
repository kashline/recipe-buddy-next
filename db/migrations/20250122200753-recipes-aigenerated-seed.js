'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.bulkUpdate('Recipes', {aigenerated: true}, {aigenerated: null})
      ])
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.bulkUpdate('Recipes', {aigenerated: null}, {aigenerated: null})
      ]);
    });
  }
};
