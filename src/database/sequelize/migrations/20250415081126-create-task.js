'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CookingTask', {
      idMeal: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      participantId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Participants',
          key: 'participantId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      timeMinutes: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('CookingTask');
  },
};
