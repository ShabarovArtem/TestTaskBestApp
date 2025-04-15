'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CookingTask', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
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
    await queryInterface.dropTable('CookingTask');
  },
};
