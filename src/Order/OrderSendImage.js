let Order = require('./Order');
let ErrorMessage = require('../ErrorMessage');
let errorMessage = new ErrorMessage();

module.exports = function(db, reforest){
	return new orderSendImage(db,reforest);
}

class orderSendImage extends Order {
	constructor(db, reforest) {
		super(db, reforest, 'jefazo asistente normal');
	}

	execute(msg) {
		let chatId = msg.chat.id;
		let user = null;
		let event = null;

		return this.checkUser(msg)
		.then(userActive => {
			return this.validateUser(userActive);
		})
		.then(userActive => {
			user = userActive;
			return this.checkEventActive(msg);
		})
		.then(eventActive => {
			event = eventActive;
			return event.getUsers();
		})
		.then(users => {
			return this.checkUserInEvent(users, chatId);
		})
		.then(() => {
			return this.checkDocument(msg);
		})
		.then(file_id => {
			return this._reforest._downLoadFile(file_id);
		})
		.then(resp => {
			return this._reforest._tesseract(chatId, resp, event.name);
		})
		.then(profile => {
			return this.saveProfile(chatId, profile, user, event);
		})
		.then(() =>{
			this._reforest._sendMessage(chatId, 'Imagen registrada. Gracias.');
		})
		.catch(err =>this.error(err));
	}

	checkEventActive(msg) {
		let chatId = msg.chat.id;

		return new Promise((resolve,reject)=>{
			this._db.Event.find({where:{active:true}})
			.then(event => {
				if (event === null) {
					return reject(errorMessage.message(chatId, 'NoActiveEvent'));
				}
				return resolve(event);
			})
		});
	}

	checkUserInEvent(users, chatId) {
		return new Promise((resolve,reject)=> {
			for (let userItem of users) {
				if (userItem.userid == chatId) {
					return resolve();
				}
			}

			return reject(errorMessage.message(chatId, 'NoUserInEvent'));			
		});
	}

	checkDocument(msg) {
		var chatId = msg.chat.id;
		var doc = msg.document;
		return new Promise((resolve,reject)=> {
			if (!this.isImageFile(doc.file_name)) {
				return reject(errorMessage.message(chatId, 'NoImageFile'));
			}
			return resolve(doc.file_id);
		});
	}

	isImageFile(fileName) {
		let name = fileName.toLowerCase();
		if (name.endsWith(".jpg") ||
			name.endsWith(".png") ||
			name.endsWith(".tif")) {
			return true;
		}
		return false;
	}

	saveProfile(chatId, profile, user, event) {
		return new Promise((resolve, reject)=>{
			user.getPhotos({
				where:{
					EventId: event.id
				}
			})
			.then(photos=>{
				if (photos !== null && photos.length > 1) {
					return reject(errorMessage.message(chatId, 'ManyImages'));
				}
				return this._db.Photo.create({
					ap: profile.ap,
					level: profile.level,
					image: profile.image,
					check: profile.isCheck()
				})
				.then(photo=>{
					photo.addDataMap(profile.DataMap);
					return photo.save()
				})
				.then(photo=>{
					user.addPhoto(photo)
					.then(()=>{
						return event.addPhoto(photo);
					})
					.then(()=>{
						return resolve();
					})
				});
			})
		});
	}
}
