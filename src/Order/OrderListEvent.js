let Order = require('./Order');

module.exports = function(db, reforest){
	return new orderListEvent(db,reforest);
}

class orderListEvent extends Order {
	constructor(db, reforest) {
		super(db, reforest, 'jefazo');
	}

	execute(msg) {
		super.execute(msg, this);
	}

	callback(msg) {
		this._db.Event.findAll().then((events) =>{
			var message ="";
			for(var i in events) {
				message += events[i].name + "\n";
			}
			this._reforest._sendMessage(this.chatId, message);
		});
	}
}