'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {
      type:DataTypes.STRING,
      unique:true
    },
    userid: {
      type:DataTypes.STRING,
      unique:true
    },
    roll: DataTypes.ENUM('jefazo','asistente','normal')
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        User.belongsToMany(models.Event,{
          foreignKey:'id_user',
          as:'events',
          through:'events_users'
        });
      }
    }
  });
  return User;
};