let Order = require('./Order');
let ErrorMessage = require('../ErrorMessage');
let errorMessage = new ErrorMessage();

module.exports = function(db, reforest, value){
	return new orderStateEvent(db, reforest, value);
}

class orderStateEvent extends Order {
	constructor(db, reforest, value) {
		super(db, reforest, 'jefazo');
		this._value = value;
	}

	execute(msg) {
		var chatId = msg.chat.id;
		return this.checkUser(msg)
		.then(user => {
			return this.validateUser(user);
		})
		.then(user => {
			return this.checkParams(msg);
		})
		.then(cmd => {
			return this.setEvent(chatId, cmd);
		})
		.then(event => {
			event.active = this._value;
			return event.save();
		})
		.then(event => {
			var message = ', se ha desactivado.';
			if(this._value) {
				message = ', se ha activado.';
			}
			this._reforest._sendMessage(chatId,event.name + message);
		})
		.catch(err => this.error(err));
	}

	setEvent(chatId, cmd) {
		return new Promise( (resolve, reject) => {
			this._db.Event.find({
				where: {
					name: cmd
				}
			})
			.then(event => {
				if (event === null) {
					return reject(errorMessage.message(chatId, 'NoEvent'));
				}
				return resolve(event);
			});
		});
	}

	checkParams(msg) {
		var cmd = msg.text.split(' ');
		var chatId = msg.chat.id;

		return new Promise((resolve,reject) => {
			if(cmd.length<2) {
				return reject(errorMessage.message(chatId, 'NoEvent'));
			}
			this._db.Event.find({
				where:{
					active: true
				}
			})
			.then(event => {
				if (event !== null && this._value) {
					return reject(errorMessage.message(chatId, 'ManyEvents'));
				}
				return resolve(cmd[1]);
			});
		});
	}
}
