let Order = require('./Order');

module.exports = function(db, reforest){
	return new orderList(db,reforest);
}

class orderList extends Order {
	constructor(db, reforest) {
		super(db, reforest, 'jefazo');
	}

	execute(msg) {
		super.execute(msg, this);
	}

	callback(msg) {
		this._reforest._sendMessage(this.chatId, 'Eres el puto amo');
		this._db.User.findAll().then((users) =>{
			var message ="";
			for(var i in users) {
				message += users[i].username + ", tiene un nivel de " + users[i].roll+ "\n";
			}
			this._reforest._sendMessage(this.chatId, message);
		});
	}
}