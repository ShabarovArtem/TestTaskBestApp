'use strict';

const { nanoid } = require('nanoid');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Participants', {
      participantId: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true,
        defaultValue: () => nanoid(7),
      },
      fullName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Participants');
  },
};
