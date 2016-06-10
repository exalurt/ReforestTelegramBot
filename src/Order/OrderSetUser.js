let Order = require('./Order');
let ErrorMessage = require('../ErrorMessage');
let errorMessage = new ErrorMessage();

module.exports = function(db, reforest, rango){
	return new orderSetUser(db,reforest, rango);
}

class orderSetUser extends Order {
	constructor(db, reforest, rango) {
		super(db, reforest, 'jefazo admin');
		this._rango = rango;
	}

	execute(msg) {
		var chatId = msg.chat.id;
		this.chatId = msg.chat.id;
		return this.checkUser(msg)
		.then(user =>{
			return this.validateUser(user);
		})
		.then(user =>{
			return this.checkParams(msg);
		})
		.then(cmd =>{
			return this.listUser(cmd)
		})
		.then(sqlObj=>{
			this._db.User.update({roll:this._rango},sqlObj)
			.spread((affectedCount, affectedRows)=>{
				console.log("affectedCount:" + affectedCount);
				console.log("affectedRows:" + affectedRows);
			})
		})
		.catch(err=>this.error(err));
	}

	checkParams(msg){
		var cmd = msg.text.split(' ');
		var chatId = msg.chat.id;

		return new Promise(function(resolve,reject){
			if(cmd.length<2){
				return reject(errorMessage.message(chatId, 'EmptyListUser'));
			}
			return resolve(cmd);
		});
	}

	listUser(cmd) {
		var chatId = this.chatId;
		return new Promise(function(resolve,reject){
			var userArray = [];
			for(var i=1;i<cmd.length;i++) {
				if(cmd[i] === 'santiagosd'){
					return reject(errorMessage.message(chatId, 'BitterKas'));

				} else {
					userArray.push({username:cmd[i]});
				}
			}

			var sqlObj = {
				where:{
					$or: userArray
				}
			};

			return resolve(sqlObj);
		});
	}
}