let Order = require('./Order');

module.exports = function(db, reforest){
	return new orderDeleteUser(db,reforest);
}

class orderDeleteUser extends Order {
	constructor(db, reforest) {
		super(db, reforest, 'jefazo admin');
	}

	execute(msg) {
		super.execute(msg, this);
	}

	callback(msg){
		var cmd = msg.text.split(' ');
		
		if(cmd.length<2){
			this._reforest._sendMessage(this.chatId, 'no hay lista de usuarios a crear');
		}

		for(var i=1;i<cmd.length;i++){
			this.deleteUser(cmd[i]);
		}
	}

	deleteUser(username) {
		if(username === 'santiagosd'){
			this._reforest._sendMessage(this.chatId, '¿Donde vas bitter kas?');
			return;
		}

		this._db.User.find({
			where: {username: username}
		}).then((user)=>{
			user.destroy().then(()=>{
				this._reforest._sendMessage(this.chatId, username + ' eliminado.');
			})
		});
	}
}