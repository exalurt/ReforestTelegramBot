var db = require('../models/index');
db.sequelize.sync({force:true}).then(function(){
	var users=[];
	users.push({
		username:'santiagosd',
		roll:'jefazo'
	});

	db.User.bulkCreate(users);
});