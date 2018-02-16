'use strict';
module.exports = (sequelize, DataTypes) => {
  var topictask = sequelize.define('topictask', {
    taskdesc: DataTypes.STRING,
    topicid: DataTypes.INTEGER,
    prioritydesc: DataTypes.STRING,
    statusdesc: DataTypes.STRING,
    userid: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return topictask;
};