let Order = require('./Order');
let ErrorMessage = require('../ErrorMessage');
let errorMessage = new ErrorMessage();

module.exports = function(db, reforest){
	return new orderCreateUser(db,reforest);
}

class orderCreateUser extends Order {
	constructor(db, reforest) {
		super(db, reforest, 'jefazo asistente');
	}

	execute(msg) {
		var chatId = msg.chat.id;
		return this.checkUser(msg)
		.then(user =>{
			return this.validateUser(user);
		})
		.then(user =>{
			return this.checkParams(msg);
		})
		.then(newUsers =>{
			var bulk = this.listNewUsers(newUsers);

			return this._db.User.bulkCreate(bulk);
		})
		.then((users)=>{
			var message = "Usuario creado";
			if(users.length > 1)
				message = users.length + " Usuarios creados";
			this._reforest._sendMessage(chatId, message);
		})
		.catch(err=>this.error(err));
	}

	checkParams(msg){
		var cmd = msg.text.split(' ');
		var chatId = msg.chat.id;

		return new Promise((resolve,reject)=>{
			if(cmd.length<2){
				return reject(errorMessage.message(chatId, 'EmptyListUser'));
			}
			return resolve(cmd);
		});
	}

	listNewUsers(cmd) {
		var bulk = [];
		for(var i=1;i<cmd.length;i++){
			if(cmd[i]!=="")
				bulk.push({
					username: cmd[i],
					roll:'normal'
				});
		}
		return bulk;
	}
}
