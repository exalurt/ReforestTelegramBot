const TelegramBot = require('node-telegram-bot-api');
const tesseract = require('node-tesseract');
const PaserLines = require('./PaserLines');

module.exports = class reforest{
  constructor(token,photoDir,db){
    this._photoDir = photoDir;
    this._db = db;
    this._bot = new TelegramBot(token, {polling: {timeout:10, interval:2000}});

    this._orders = require('./Order/OrdersArray');

    this._bot.onText(/\/activeEvent (.+)/,
      (msg)=>this._order(this._orders.get('stateEvent'),msg, true));

    this._bot.onText(/\/addUserEvent (.+)/,
      (msg)=>this._order(this._orders.get('addUserEvent'),msg));

    this._bot.onText(/\/createEvent (.+)/,
      (msg)=>this._order(this._orders.get('createEvent'),msg));

    this._bot.onText(/\/createUser (.+)/,
      (msg)=>this._order(this._orders.get('createUser'),msg));

    this._bot.onText(/\/deActiveEvent (.+)/,
      (msg)=>this._order(this._orders.get('stateEvent'),msg, false));

    this._bot.onText(/\/deleteEvent (.+)/,
      (msg)=>this._order(this._orders.get('deleteEvent'),msg));

    this._bot.onText(/\/deleteUser (.+)/,
      (msg)=>this._order(this._orders.get('deleteUser'),msg));

    this._bot.onText(/\/help/,
      (msg)=>this._order(this._orders.get('help'),msg));

    this._bot.onText(/\/listEvents/,
      (msg)=>this._order(this._orders.get('listEvents'),msg));

    this._bot.onText(/\/listUsers/,
      (msg)=>this._order(this._orders.get('listUsers'),msg));

    this._bot.onText(/\/listUserEvent/,
      (msg)=>this._order(this._orders.get('listUserEvent'),msg));

    this._bot.onText(/\/removeUserEvent (.+)/,
      (msg)=>this._order(this._orders.get('removeUserEvent'),msg));

    this._bot.onText(/\/setAdmin (.+)/,
      (msg)=>this._order(this._orders.get('setUser'),msg, 'asistente'));

    this._bot.onText(/\/setJefazo (.+)/, 
      (msg)=>this._order(this._orders.get('setUser'),msg, 'jefazo'));

    this._bot.onText(/\/setRaso (.+)/,
      (msg)=>this._order(this._orders.get('setUser'),msg, 'normal'));

    this._bot.on('document',
      (msg)=>this._order(this._orders.get('sendImage'),msg, 'normal'));
  }

  _sendMessage(chatId,msg){
    this._bot.sendMessage(chatId,msg);
  }

  _sendLog(msg) {
    console.log(msg);
  }

  _downLoadFile(file_id) {
    return this._bot.downloadFile(file_id, this._photoDir);
  }

  _tesseract(chatId, resp, eventName) {
    return new Promise((resolve,reject)=>{
      tesseract.process(resp,(err,text)=>{
        if(err){
          return reject({
            message:{
              id: chatId,
              text: 'La foto no valia lo siento.'
            }
          });
        }else{
          const paserLines = new PaserLines(eventName);
          const profile = paserLines.scannerLine(text.split("\n"));
          let image = resp.split('/');
          profile.image = image[image.length-1];
          resolve(profile);
        }
      });
    });
  }

  _order(lib, msg, rango) {
    let order = require(lib)(this._db, this, rango);
    order.execute(msg);
  }
}
