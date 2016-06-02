let Order = require('./Order');

module.exports = function(db, reforest){
	return new orderDeleteUser(db,reforest);
}

class orderDeleteUser extends Order {
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
		.then(cmd =>{
			for(var i=1;i<cmd.length;i++){
				this.deleteUser(chatId, cmd[i]);
			}
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
						text: 'No hay lista de usuarios para eliminar.'
					}
				});
			}

			return resolve(cmd);
		});
	}

	deleteUser(chatId, username) {
		if(username === 'santiagosd'){
			this._reforest._sendMessage(chatId, '¿Donde vas bitter kas?');
			return;
		}

		this._db.User.find({
			where: {username: username}
		}).then((user)=>{
			user.destroy().then(()=>{
				this._reforest._sendMessage(chatId, username + ' eliminado.');
			})
		});
	}
}