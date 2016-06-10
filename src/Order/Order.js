let ErrorMessage = require('../ErrorMessage');
let errorMessage = new ErrorMessage();

module.exports = class Order {
	constructor(db, reforest, rolls) {
		this._db = db;
		this._reforest = reforest;
		this.rolls = rolls;
	}

	checkUser(msg) {
		this.chatId = msg.chat.id;
		return new Promise((resolve, reject)=>{
			this._db.User.find({
				where:{username: msg.from.username}
			}).then((user) => {
				if(user == null){
					return reject(errorMessage.log('UserNoRegister'));
				}

				if(user.userid === undefined || user.userid != this.chatId){
					user.userid = this.chatId;
					user.save();
				}
				return resolve(user);
			});
		});
	}

	validateUser(user) {
		return new Promise((resolve, reject)=>{
			if(this.rolls.indexOf(user.roll)>-1) {
				return resolve(user);
			} else {
				return reject(errorMessage.message(this.chatId, 'NoPermission'));
			}
		});
	}

	error(err) {
		if (err.log !== undefined){
			this._reforest._sendLog(err.log);
		}
		if (err.message !== undefined && err.name === undefined) {
			this._reforest._sendMessage(err.message.id, err.message.text);
		}
		this._reforest._sendLog("llega un error como es posible"+JSON.stringify(err));
	}
}