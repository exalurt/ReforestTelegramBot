module.exports = class Order {
	constructor(db, reforest, rolls) {
		this._db = db;
		this._reforest = reforest;
		this.rolls = rolls;
	}

	validate(msg){
		var chatId = msg.chat.id;
		var  userDB = this._db.User;
		var rolls = this.rolls;

		return new Promise(function(resolve,reject){
			userDB.find({
				where:{username: msg.from.username}
			}).then((user) => {
				if(user == null){
					return reject({log:'No  esta registrado el usuario.'});
				}

				if(user.userid === 'undefined' || user.userid != chatId){
					user.userid = chatId;
					user.save();
				}

				if(rolls.indexOf(user.roll)>-1) {
					return resolve(user);
				} else {
					return reject({
						message:{
							id: chatId,
							text: 'No tienes permiso para esta operación.'
						}
					});
				}
			});
		});
	}

	error(err) {
		if (err.log !== undefined){
			console.log(err.log);
		}
		if (err.message !== undefined) {
			this._reforest._sendMessage(err.message.id, err.message.text);
		}
	}
}