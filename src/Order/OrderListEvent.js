let Order = require('./Order');

module.exports = function(db, reforest){
	return new orderListEvent(db,reforest);
}

class orderListEvent extends Order {
	constructor(db, reforest) {
		super(db, reforest, 'jefazo');
	}

	execute(msg) {
		this.checkUser(msg)
		.then(user =>{
			return this.validateUser(user);
		})
		.then(user =>{
			return this._db.Event.findAll();
		})
		.then(events =>{
			this.listEvents(msg.chat.id, events);
		})
		.catch(err=>this.error(err));
	}

	listEvents(chatId, events) {
		var message ="";
		for(var i in events) {
			message += events[i].name + "\n";
		}
		this._reforest._sendMessage(chatId, message);
	}
}