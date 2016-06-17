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
        type: Sequelize.STRING
      },
      check: {
        type: Sequelize.BOOLEAN
      },
      ap: {
        type: Sequelize.INTEGER
      },
      level: {
        type: Sequelize.INTEGER
      },
      agents_Successfully_Recruited: {
        type: Sequelize.INTEGER
      },
      control_Fields_Created: {
        type: Sequelize.INTEGER
      },
      distance_Walked: {
        type: Sequelize.INTEGER
      },
      enemy_Control_Fields_Destroyed: {
        type: Sequelize.INTEGER
      },
      enemy_Links_Destroyed: {
        type: Sequelize.INTEGER
      },
      glyph_Hack_Points: {
        type: Sequelize.INTEGER
      },
      hacks: {
        type: Sequelize.INTEGER
      },
      largest_Control_Field: {
        type: Sequelize.INTEGER
      },
      largest_Field_MUs_x_Days: {
        type: Sequelize.INTEGER
      },
      links_Created: {
        type: Sequelize.INTEGER
      },
      longest_Hacking_Streak: {
        type: Sequelize.INTEGER
      },
      longest_Link_Ever_Created: {
        type: Sequelize.INTEGER
      },
      max_Link_Length_x_Days: {
        type: Sequelize.INTEGER
      },
      max_Time_Field_Held: {
        type: Sequelize.INTEGER
      },
      max_Time_Link_Maintained: {
        type: Sequelize.INTEGER
      },
      max_Time_Portal_Held: {
        type: Sequelize.INTEGER
      },
      mind_Units_Captured: {
        type: Sequelize.INTEGER
      },
      mods_Deployed: {
        type: Sequelize.INTEGER
      },
      portals_Captured: {
        type: Sequelize.INTEGER
      },
      portals_Discovered: {
        type: Sequelize.INTEGER
      },
      portals_Neutralized: {
        type: Sequelize.INTEGER
      },
      resonators_Deployed: {
        type: Sequelize.INTEGER
      },
      resonators_Destroyed: {
        type: Sequelize.INTEGER
      },
      unique_Missions_Completed: {
        type: Sequelize.INTEGER
      },
      unique_Portals_Captured: {
        type: Sequelize.INTEGER
      },
      unique_Portals_Visited: {
        type: Sequelize.INTEGER
      },
      xM_Collected: {
        type: Sequelize.INTEGER
      },
      xM_Recharged: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      EventId: {
        type: Sequelize.INTEGER,
        references:{
          model:'Events',
          key:'id'
        },
        onUpdate: 'cascade',
        onDelete: null
      },
      UserId: {
        type: Sequelize.INTEGER,
        references:{
          model:'Users',
          key:'id'
        },
        onUpdate: 'cascade',
        onDelete: null
      }
    },
    {
      engine: 'InnoDB',
      charset: 'latin1'
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Photos');
  }
};