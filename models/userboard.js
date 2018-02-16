'use strict';
module.exports = (sequelize, DataTypes) => {
  var userboard = sequelize.define('userboard', {
    boardtopic: DataTypes.STRING,
    userid: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return userboard;
};