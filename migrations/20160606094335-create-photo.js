'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Photos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      image: {
        type: DataTypes.STRING
      },
      check: {
        type: DataTypes.BOOLEAN
      },
      ap: {
        type: DataTypes.INTEGER
      },
      level: {
        type: DataTypes.INTEGER
      },
      agents_Successfully_Recruited: {
        type: DataTypes.INTEGER
      },
      control_Fields_Created: {
        type: DataTypes.INTEGER
      },
      distance_Walked: {
        type: DataTypes.INTEGER
      },
      enemy_Control_Fields_Destroyed: {
        type: DataTypes.INTEGER
      },
      enemy_Links_Destroyed: {
        type: DataTypes.INTEGER
      },
      glyph_Hack_Points: {
        type: DataTypes.INTEGER
      },
      hacks: {
        type: DataTypes.INTEGER
      },
      largest_Control_Field: {
        type: DataTypes.INTEGER
      },
      largest_Field_MUs_x_Days: {
        type: DataTypes.INTEGER
      },
      links_Created: {
        type: DataTypes.INTEGER
      },
      longest_Hacking_Streak: {
        type: DataTypes.INTEGER
      },
      longest_Link_Ever_Created: {
        type: DataTypes.INTEGER
      },
      max_Link_Length_x_Days: {
        type: DataTypes.INTEGER
      },
      max_Time_Field_Held: {
        type: DataTypes.INTEGER
      },
      max_Time_Link_Maintained: {
        type: DataTypes.INTEGER
      },
      max_Time_Portal_Held: {
        type: DataTypes.INTEGER
      },
      mind_Units_Captured: {
        type: DataTypes.INTEGER
      },
      mods_Deployed: {
        type: DataTypes.INTEGER
      },
      portals_Captured: {
        type: DataTypes.INTEGER
      },
      portals_Discovered: {
        type: DataTypes.INTEGER
      },
      portals_Neutralized: {
        type: DataTypes.INTEGER
      },
      resonators_Deployed: {
        type: DataTypes.INTEGER
      },
      resonators_Destroyed: {
        type: DataTypes.INTEGER
      },
      unique_Missions_Completed: {
        type: DataTypes.INTEGER
      },
      unique_Portals_Captured: {
        type: DataTypes.INTEGER
      },
      unique_Portals_Visited: {
        type: DataTypes.INTEGER
      },
      xM_Collected: {
        type: DataTypes.INTEGER
      },
      xM_Recharged: {
        type: DataTypes.INTEGER
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
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Photos');
  }
};