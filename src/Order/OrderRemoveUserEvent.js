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
		var cmd = msg.text.split(' ');

		return this.checkUser(msg)
		.then(user =>{
			return this.validateUser(user);
		})
		.then(user =>{
			return this._db.Event.find({
				where:{
					name: cmd[1]
				}
			})
		})
		.then(event =>{
			this.removeUser(msg.chat.id, event, cmd);
		})
		.catch(err=>this.error(err));
	}

	removeUser(chatId, event,cmd) {
		for(var i=2; i<cmd.length; i++){
			this._db.User.find({
				where: {username: cmd[i]}
			}).then((user)=>{
				if(user === null){
					this._reforest._sendMessage(chatId, 'Lo siento, el usuario que quieres añadir al evento no existe.');
					return;
				}
				user.removeEvent(event);
				user.save();
				this._reforest._sendMessage(chatId, user.username + ' eliminado del evento: ' + event.name + '.');
			});
		}
	}
}