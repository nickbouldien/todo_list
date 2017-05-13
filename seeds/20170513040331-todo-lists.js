'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('TodoLists',
      [
        {
          name: 'House Chores',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Work Tasks',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ])
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('TodoLists', null, {})
  }
};
