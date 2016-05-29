let Order = require('./Order');

module.exports = function(db, reforest){
	return new orderHelp(db,reforest);
}

class orderHelp extends Order {

	constructor(db, reforest) {
		super(db, reforest, 'jefazo admin raso');

		this.jefazo = {
			range: "jefazo",
			title: "Operaciones de jefazo.\n",
			op:[
				"/addUserEvent event [username username....]\nAñade tantos usuarios como quieras de una vez a un evento.\n",
				"/createEvent name startDate endDate\nCrea un evento. Es necesario poner un nombre (sin espacios) y una fecha de inicio y otra de finalización.\n",
				"/createUser [username username....]\nCrea tantos usuarios como quieras de una vez.\n",
				"/deleteUser [username username....]\nElimina tantos usuarios como quieras de una vez.\n",
				"/listEvents\nLista los los eventos registrados en el bot.\n",
				"/listUserEvent\nLista los usuarios registrados en el bot con su nivel.\n",
				"/listUsers\nLista los usuarios registrados en el bot con su nivel.\n",
				"/removeUserEvent\nLista los usuarios registrados en el bot con su nivel.\n",
				"/setAdmin [username username....]\n Da a los usuarios nivel de admin.\n",
				"/setJefazo [username username....]\n Da a los usuarios nivel de jefazo.\n",
				"/setRaso [username username....]\n Da a los usuarios nivel raso.\n"
			]
		};

		this.admin = {
			range: "jefazo admin",
			title: "Operaciones de admin.\n",
			op:[
				"Que me lio esto son las operaciones de admin.\n"
			]
		};

		this.raso = {
			range: "jefazo admin raso",
			title: "Operaciones de raso.\n",
			op:[
				"/help\n Da a los usuarios nivel raso.\n"
			]
		};
	}

	execute(msg) {
		super.execute(msg, this);
	}

	listaComandos(vec) {
		var message = "";
		if(vec.range.indexOf(this._user.roll)>-1) {
			message += vec.title;
			for(var i=0;i<vec.op.length;i++) {
				message += vec.op[i];
			}
		}
		return message;
	}

	callback(msg){
		var message = this.listaComandos(this.jefazo);
		message += "\n\n" + this.listaComandos(this.admin);
		message += "\n\n" + this.listaComandos(this.raso);
		this._reforest._sendMessage(this.chatId, message);
	}
}