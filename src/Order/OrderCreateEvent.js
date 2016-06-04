let Order = require('./Order');

module.exports = function(db, reforest){
	return new orderCreateEvent(db,reforest);
}

class orderCreateEvent extends Order {
	constructor(db, reforest, rango) {
		super(db, reforest, 'jefazo');
	}

	execute(msg) {
		var chatId = msg.chat.id;
		return this.checkUser(msg)
		.then(user =>{
			return this.validateUser(user);
		})
		.then(user =>{
			return this.checkParams(msg);
		})
		.then(newEvent =>{
			return this._db.Event.create({
				name: newEvent[1],
				start: newEvent[2],
				end: newEvent[3]
			})
		})
		.then(()=>{
			this._reforest._sendMessage(chatId, 'Evento creado');
		})
		.catch(err=>this.error(err));
	}

	checkParams(msg){
		var cmd = msg.text.split(' ');
		var chatId = msg.chat.id;

		return new Promise(function(resolve,reject){
			if(cmd.length!==4){
				return reject({
						message:{
							id: chatId,
							text: 'El número de parámetros para crear un evento es incorrecto.'
						}
					});
			}
			return resolve(cmd);
		});
	}
}