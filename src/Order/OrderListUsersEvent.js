let Order = require('./Order');

module.exports = function(db, reforest){
	return new orderListUsersEvent(db,reforest);
}

class orderListUsersEvent extends Order {
	constructor(db, reforest) {
		super(db, reforest, 'jefazo admin');
	}

	execute(msg) {
		super.execute(msg, this);
	}

	callback(msg){
		var cmd = msg.text.split(' ');

		this._db.Event.find({
			where:{
				name: cmd[1]
			}
		}).then((event)=>{
			if(event === null){
				this._reforest._sendMessage(this.chatId, 'Lo siento, el evento solicitado no existe.');
				return;
			}
			this.listUser(event);
		});
	}

	listUser(event) {
		event.getUsers().then((users)=>{
			var message = "Usuarios registrados en: " + event.name +"\n";
			for(var i in users){
				message += "@" + users[i].username + "\n";
			}
			this._reforest._sendMessage(this.chatId, message);
		});
	}
}