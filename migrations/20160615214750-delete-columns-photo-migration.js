'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return Promise.all([
      queryInterface.removeColumn('Photos', 'agents_Successfully_Recruited'),
      queryInterface.removeColumn('Photos', 'largest_Control_Field'),
      queryInterface.removeColumn('Photos', 'largest_Field_MUs_x_Days'),
      queryInterface.removeColumn('Photos', 'longest_Hacking_Streak'),
      queryInterface.removeColumn('Photos', 'longest_Link_Ever_Created'),
      queryInterface.removeColumn('Photos', 'max_Link_Length_x_Days'),
      queryInterface.removeColumn('Photos', 'max_Time_Field_Held'),
      queryInterface.removeColumn('Photos', 'max_Time_Link_Maintained'),
      queryInterface.removeColumn('Photos', 'max_Time_Portal_Held'),
      queryInterface.removeColumn('Photos', 'portals_Discovered'),
      queryInterface.removeColumn('Photos', 'unique_Portals_Visited')
    ]);
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return Promise.all([
      queryInterface.addColumn('Photos',
        'agents_Successfully_Recruited',
        {
          type: Sequelize.INTEGER
        }),
      queryInterface.addColumn('Photos',
        'largest_Control_Field',
        {
          type: Sequelize.INTEGER
        }),
      queryInterface.addColumn('Photos',
        'largest_Field_MUs_x_Days',
        {
          type: Sequelize.INTEGER
        }),
      queryInterface.addColumn('Photos',
        'longest_Hacking_Streak',
        {
          type: Sequelize.INTEGER
        }),
      queryInterface.addColumn('Photos',
        'longest_Link_Ever_Created',
        {
          type: Sequelize.INTEGER
        }),
      queryInterface.addColumn('Photos',
        'max_Link_Length_x_Days',
        {
          type: Sequelize.INTEGER
        }),
      queryInterface.addColumn('Photos',
        'max_Time_Field_Held',
        {
          type: Sequelize.INTEGER
        }),
      queryInterface.addColumn('Photos',
        'max_Time_Link_Maintained',
        {
          type: Sequelize.INTEGER
        }),
      queryInterface.addColumn('Photos',
        'max_Time_Portal_Held',
        {
          type: Sequelize.INTEGER
        }),
      queryInterface.addColumn('Photos',
        'portals_Discovered',
        {
          type: Sequelize.INTEGER
        }),
      queryInterface.addColumn('Photos',
        'unique_Portals_Visited',
        {
          type: Sequelize.INTEGER
        })
    ]);
  }
};
