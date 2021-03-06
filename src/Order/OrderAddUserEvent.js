let Order = require('./Order');

module.exports = function(db, reforest){
	return new orderAddUserEvent(db,reforest);
}

class orderAddUserEvent extends Order {
	constructor(db, reforest) {
		super(db, reforest, 'jefazo asistente');
	}

	execute(msg) {
		this.chatId = msg.chat.id;
		var cmd = '';
		return this.checkUser(msg)
		.then(user =>{
			return this.validateUser(user);
		})
		.then(user =>{
			cmd = msg.text.split(' ');

			return this._db.Event.find({
				where:{ name: cmd[1] }
			});
		})
		.then(event =>{
			if(event === null){
				this._reforest._sendMessage(this.chatId, 'Lo siento, el evento solicitado no existe.');
				return;
			}
			this.addUser(event, cmd);
		})
		.catch(err=>this.error(err));
	}

	addUser(event,cmd) {
		for(var i=2; i<cmd.length; i++){
			this._db.User.find({
				where: {username: cmd[i]}
			}).then((user)=>{
				if(user === null){
					this._reforest._sendMessage(this.chatId, 'Lo siento, el usuario que quieres añadir al evento no existe.');
					return;
				}
				user.addEvent(event);
				user.save();
				this._reforest._sendMessage(this.chatId, user.username + ' añadido al evento: ' + event.name + '.');
			});
		}
	}
}