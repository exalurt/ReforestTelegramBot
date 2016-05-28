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
		super.execute(msg, this);
	}

	callback(msg){
		var cmd = msg.text.split(' ');
		if(cmd.length<2){
			this._reforest._sendMessage(this.chatId, 'no hay lista de usuarios a crear');
		}

		for(var i=1;i<cmd.length;i++){
			this.setUser(cmd[i]);
		}
	}

	setUser(username) {
		if(username === 'santiagosd'){
			this._reforest._sendMessage(this.chatId, '¿Donde vas bitter kas?');
			return;
		}

		this._db.User.find({
			where: {username: username}
		}).then((user)=>{
			user.roll = this._rango;
			user.save();
		});
	}
}