module.exports = class Order {
	constructor(db, reforest, rolls) {
		this._db = db;
		this._reforest = reforest;
		this.rolls = rolls;
	}

	execute(msg, obj) {
		this.chatId = msg.chat.id;
		this._db.User.find({
			where:{username: msg.from.username}
		}).then((user) => {
			if(user == null){
				return;
			}

			if(user.userid === 'undefined' || user.userid != this.chatId){
				user.userid = this.chatId;
				user.save();
			}

			if(this.rolls.indexOf(user.roll)>-1) {
				obj.callback(msg);
			} else {
				this._reforest._sendMessage(this.chatId, 'No tienes permiso para esta operación.');
			}
		})
	}
}