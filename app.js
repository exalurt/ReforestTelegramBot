'use strict';

var botijo = require('./build/reforest');
var db = require('./models/index');
/*db.sequelize.sync({force:true}).then(()=>{
	db.User.bulkCreate([
	{
		username: 'santiagosd',
		roll:'jefazo'
	},{
		username:'felinux',
		roll:'admin'
	}]).then(()=>{
		console.log("hecho");
	})
})*/
var photoDir = __dirname + '/photos/'
var botijin = new botijo(process.env.TOKEN, photoDir,db);