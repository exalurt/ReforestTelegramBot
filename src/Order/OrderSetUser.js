let Order = require('./Order');

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
		this.validate(msg)
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
				return reject({
						message:{
							id: chatId,
							text: 'No hay lista de usuarios a actualizar.'
						}
					});
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
					return reject({
						message:{
							id: chatId,
							text: '¿santiagosd? ¿Donde vas bitter kas?'
						}
					});

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