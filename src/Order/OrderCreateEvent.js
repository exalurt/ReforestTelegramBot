let Order = require('./Order');

module.exports = function(db, reforest){
	return new orderCreateEvent(db,reforest);
}

class orderCreateEvent extends Order {
	constructor(db, reforest, rango) {
		super(db, reforest, 'jefazo');
	}

	execute(msg) {
		super.execute(msg, this);
	}

	callback(msg){
		var cmd = msg.text.split(' ');
		if(cmd.length!==4){
			this._reforest._sendMessage(this.chatId, 'El número de parámetros para crear un evento es incorrecto.');
		}

		this._db.Event.create({
			name:cmd[1],
			start:cmd[2],
			end:cmd[3]
		}).then(()=>{
			this._reforest._sendMessage(this.chatId, 'Evento creado');
		});
	}
}