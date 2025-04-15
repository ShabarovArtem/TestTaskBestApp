'use strict';

const { nanoid } = require('nanoid');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Participants', {
      participantId: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      fullName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Participants');
  },
};
