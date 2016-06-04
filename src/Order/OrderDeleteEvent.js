let Order = require('./Order');

module.exports = function(db, reforest){
	return new orderDeleteEvent(db,reforest);
}

class orderDeleteEvent extends Order {
	constructor(db, reforest) {
		super(db, reforest, 'jefazo admin');
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
		.then(cmd =>{
			return this._db.Event.find({
				where: {name: cmd[1]}
			});
		})
		.then((event)=>{
			return event.destroy();
		})
		.then(()=>{
			this._reforest._sendMessage(chatId, 'Evento eliminado.');
		})
		.catch(err=>this.error(err));
	}

	checkParams(msg){
		var cmd = msg.text.split(' ');
		var chatId = msg.chat.id;

		return new Promise(function(resolve,reject){
			if(cmd.length<2){
				return reject({
						message:{
							id: chatId,
							text: 'No has puesto ningún evento a borrar.'
						}
					});
			}
			return resolve(cmd);
		});
	}
}