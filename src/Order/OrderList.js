let Order = require('./Order');

module.exports = function(db, reforest){
	return new orderList(db,reforest);
}

class orderList extends Order {
	constructor(db, reforest) {
		super(db, reforest, 'jefazo');
	}

	execute(msg) {
		this.checkUser(msg)
		.then(user =>{
			return this.validateUser(user);
		})
		.then(user =>{
			return this._db.User.findAll();
		})
		.then(users =>{
			this.listUsers(msg.chat.id, users);
		})
		.catch(err=>this.error(err));
	}

	listUsers(chatId, users) {
		var message ="";
		for(var i in users) {
			message += "@" + users[i].username + ", tiene un nivel de " + users[i].roll+ "\n";
		}
		this._reforest._sendMessage(chatId, message);
	}
}