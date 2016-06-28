let Order = require('./Order');

module.exports = function(db, reforest){
	return new orderListUsersEvent(db,reforest);
}

class orderListUsersEvent extends Order {
	constructor(db, reforest) {
		super(db, reforest, 'jefazo asistente');
	}

	execute(msg) {
		var chatId = msg.chat.id;
		var _event = null;
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
		.then((event)=>{
			if(event === null){
				this._reforest._sendMessage(chatId, 'Lo siento, el evento solicitado no existe.');
				return;
			}
			_event = event;
			return event.getUsers();
		})
		.then((users)=>{
			var message = "Usuarios registrados en: " + _event.name +"\n";
			for(var i in users){
				message += "@" + users[i].username + "\n";
			}
			this._reforest._sendMessage(chatId, message);
		})
		.catch(err=>this.error(err));
	}
}