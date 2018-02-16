'use strict';
module.exports = (sequelize, DataTypes) => {
  var boardtopics = sequelize.define('boardtopics', {
    topicdesc: DataTypes.STRING,
    boardtopic: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return boardtopics;
};