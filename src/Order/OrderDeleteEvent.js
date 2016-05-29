let Order = require('./Order');

module.exports = function(db, reforest){
	return new orderDeleteEvent(db,reforest);
}

class orderDeleteEvent extends Order {
	constructor(db, reforest) {
		super(db, reforest, 'jefazo admin');
	}

	execute(msg) {
		super.execute(msg, this);
	}

	callback(msg){
		var cmd = msg.text.split(' ');
		
		if(cmd.length<2){
			this._reforest._sendMessage(this.chatId, 'No has puesto ningún evento a borrar.');
		}

		this._db.Event.find({
			where: {name: cmd[1]}
		}).then((event)=>{
			event.destroy().then(()=>{
				this._reforest._sendMessage(this.chatId, 'Evento eliminado.');
			})
		});
	}
}