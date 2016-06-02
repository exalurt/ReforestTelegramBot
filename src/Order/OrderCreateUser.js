let Order = require('./Order');

module.exports = function(db, reforest){
	return new orderCreateUser(db,reforest);
}

class orderCreateUser extends Order {
	constructor(db, reforest) {
		super(db, reforest, 'jefazo admin');
	}

	execute(msg) {
		var chatId = msg.chat.id;
		this.checkUser(msg)
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

		return new Promise(function(resolve,reject){
			if(cmd.length<2){
				return reject({
						message:{
							id: chatId,
							text: 'No hay lista de usuarios a crear.'
						}
					});
			}
			return resolve(cmd);
		});
	}

	listNewUsers(cmd) {
		var bulk = [];
		for(var i=1;i<cmd.length;i++){
			bulk.push({
				username: cmd[i],
				roll:'raso'
			});
		}
		return bulk;
	}
}