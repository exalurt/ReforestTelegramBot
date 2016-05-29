let Order = require('./Order');

module.exports = function(db, reforest, rango){
	return new orderRemoveUserEvent(db,reforest, rango);
}

class orderRemoveUserEvent extends Order {
	constructor(db, reforest, rango) {
		super(db, reforest, 'jefazo admin');
		this._rango = rango;
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
			this.removeUser(event, cmd);
		});
	}

	removeUser(event,cmd) {
		for(var i=2; i<cmd.length; i++){
			this._db.User.find({
				where: {username: cmd[i]}
			}).then((user)=>{
				if(user === null){
					this._reforest._sendMessage(this.chatId, 'Lo siento, el usuario que quieres añadir al evento no existe.');
					return;
				}
				user.removeEvent(event);
				user.save();
				this._reforest._sendMessage(this.chatId, user.username + ' eliminado del evento: ' + event.name + '.');
			});
		}
	}
}