let Order = require('./Order');

module.exports = function(db, reforest){
	return new orderCreateUser(db,reforest);
}

class orderCreateUser extends Order {
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

		var bulk = [];
		for(var i=1;i<cmd.length;i++){
			bulk.push({
				username: cmd[i],
				roll:'raso'
			});
		}
		this._db.User.bulkCreate(bulk).then((users)=>{
			var message = "Usuario creado";
			if(users.length > 1)
				message = users.length + " Usuarios creados";
			this._reforest._sendMessage(this.chatId, message);
		})
	}
}