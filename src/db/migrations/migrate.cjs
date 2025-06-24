'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Reservation', 'id', {
      type: Sequelize.STRING(36),
      primaryKey: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Reservation', 'id');
  }
};
