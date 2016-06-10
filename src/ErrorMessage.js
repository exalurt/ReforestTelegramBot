const errorsMessage = new Map();
errorsMessage.set('UserNoRegister',		'No  esta registrado el usuario.');
errorsMessage.set('NoPermission',		'No tienes permiso para esta operación.');
errorsMessage.set('EmptyListUser',		'No hay lista de usuarios.');
errorsMessage.set('NoEvent',			'No has puesto ningún evento a borrar.');
errorsMessage.set('NumParamsError',		'El número de parámetros para crear un evento es incorrecto.');
errorsMessage.set('BitterKas',			'¿Donde vas bitter kas?');
errorsMessage.set('NoActiveEvent',		'Lo siento no hay evento activo.');
errorsMessage.set('NoUserInEvent',		'Habla con algún administrador pues no apareces en la lista del evento.');
errorsMessage.set('NoImageFile',		'El fichero que has mandado parece que no es un fichero de imagen.');
errorsMessage.set('ManyImages',			'Ya has enviado las fotos necesarias para el evento.');
errorsMessage.set('IncompleteImage',	'El reconocimiento ha fallado y se han recogido datos incompletos de la imágen que mandaste, ponte en contacto con un administrador.');

module.exports = class ErrorMessage {
	log(msg) {
		return {log: errorsMessage.get(msg)};
	}

	message(chatId,msg) {
		return {
					message:{
						id: chatId,
						text: errorsMessage.get(msg)
					}
				}
	}
}