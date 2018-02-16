'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('topictasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      taskdesc: {
        type: Sequelize.STRING
      },
      topicid: {
        type: Sequelize.INTEGER
      },
      prioritydesc: {
        type: Sequelize.STRING
      },
      statusdesc: {
        type: Sequelize.STRING
      },
      userid: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('topictasks');
  }
};