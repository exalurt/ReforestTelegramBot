'use strict';
module.exports = function(sequelize, DataTypes) {
  var Event = sequelize.define('Event', {
    name: DataTypes.STRING,
    start: DataTypes.DATE,
    end: DataTypes.DATE,
    active: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Event.belongsToMany(models.User,{
          foreignKey:'id_event',
          as:'users',
          through:'events_users'
        });
        Event.hasMany(models.Photo);
      }
    }
  });
  return Event;
};