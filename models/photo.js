'use strict';
module.exports = function(sequelize, DataTypes) {
  var Photo = sequelize.define('Photo', {
    image: DataTypes.STRING,
    check: DataTypes.BOOLEAN,
    ap: DataTypes.INTEGER,
    level: DataTypes.INTEGER,
    control_Fields_Created: DataTypes.INTEGER,
    distance_Walked: DataTypes.INTEGER,
    enemy_Control_Fields_Destroyed: DataTypes.INTEGER,
    enemy_Links_Destroyed: DataTypes.INTEGER,
    glyph_Hack_Points: DataTypes.INTEGER,
    hacks: DataTypes.INTEGER,
    links_Created: DataTypes.INTEGER,
    mind_Units_Captured: DataTypes.INTEGER,
    mods_Deployed: DataTypes.INTEGER,
    portals_Captured: DataTypes.INTEGER,
    portals_Neutralized: DataTypes.INTEGER,
    resonators_Deployed: DataTypes.INTEGER,
    resonators_Destroyed: DataTypes.INTEGER,
    unique_Missions_Completed: DataTypes.INTEGER,
    unique_Portals_Captured: DataTypes.INTEGER,
    xM_Collected: DataTypes.INTEGER,
    xM_Recharged: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    instanceMethods: {
        addDataMap(dataMap) {
            this.agents_Successfully_Recruited  = dataMap.get("Agents Successfully Recruited");
            this.control_Fields_Created         = dataMap.get("Control Fields Created");
            this.distance_Walked                = dataMap.get("Distance Walked");
            this.enemy_Control_Fields_Destroyed = dataMap.get("Enemy Control Fields Destroyed");
            this.enemy_Links_Destroyed          = dataMap.get("Enemy Links Destroyed");
            this.glyph_Hack_Points              = dataMap.get("Glyph Hack Points");
            this.hacks                          = dataMap.get("Hacks");
            this.largest_Control_Field          = dataMap.get("Largest Control Field");
            this.largest_Field_MUs_x_Days       = dataMap.get("Largest Field MUs x Days");
            this.links_Created                  = dataMap.get("Links Created");
            this.longest_Hacking_Streak         = dataMap.get("Longest Hacking Streak");
            this.longest_Link_Ever_Created      = dataMap.get("Longest Link Ever Created");
            this.max_Link_Length_x_Days         = dataMap.get("Max Link Length x Days");
            this.max_Time_Field_Held            = dataMap.get("Max Time Field Held");
            this.max_Time_Link_Maintained       = dataMap.get("Max Time Link Maintained");
            this.max_Time_Portal_Held           = dataMap.get("Max Time Portal Held");
            this.mind_Units_Captured            = dataMap.get("Mind Units Captured");
            this.mods_Deployed                  = dataMap.get("Mods Deployed");
            this.portals_Captured               = dataMap.get("Portals Captured");
            this.portals_Discovered             = dataMap.get("Portals Discovered");
            this.portals_Neutralized            = dataMap.get("Portals Neutralized");
            this.resonators_Deployed            = dataMap.get("Resonators Deployed");
            this.resonators_Destroyed           = dataMap.get("Resonators Destroyed");
            this.unique_Missions_Completed      = dataMap.get("Unique Missions Completed");
            this.unique_Portals_Captured        = dataMap.get("Unique Portals Captured");
            this.unique_Portals_Visited         = dataMap.get("Unique Portals Visited");
            this.xM_Collected                   = dataMap.get("XM Collected");
            this.xM_Recharged                   = dataMap.get("XM Recharged");
        }
    }
  });
  return Photo;
};