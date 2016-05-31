const TelegramBot = require('node-telegram-bot-api');
const tesseract = require('node-tesseract');
const PaserLines = require('./PaserLines');



module.exports = class reforest{

  constructor(token,photoDir,db){
    this._photoDir = photoDir;
    this._db = db;
    this._bot = new TelegramBot(token, {polling: true});

    this._orders = require('./Order/OrdersArray');

    this._bot.onText(/\/addUserEvent (.+)/, (msg)=>this._order(this._orders.get('addUserEvent'),msg));
    this._bot.onText(/\/createEvent (.+)/, (msg)=>this._order(this._orders.get('createEvent'),msg));
    this._bot.onText(/\/createUser (.+)/, (msg)=>this._order(this._orders.get('createUser'),msg));
    this._bot.onText(/\/deleteEvent (.+)/, (msg)=>this._order(this._orders.get('deleteEvent'),msg));
    this._bot.onText(/\/deleteUser (.+)/, (msg)=>this._order(this._orders.get('deleteUser'),msg));
    this._bot.onText(/\/help/, (msg)=>this._order(this._orders.get('help'),msg));
    this._bot.onText(/\/listEvents/, (msg)=>this._order(this._orders.get('listEvents'),msg));
    this._bot.onText(/\/listUsers/, (msg)=>this._order(this._orders.get('listUsers'),msg));
    this._bot.onText(/\/listUserEvent/, (msg)=>this._order(this._orders.get('listUserEvent'),msg));
    this._bot.onText(/\/removeUserEvent (.+)/, (msg)=>this._order(this._orders.get('removeUserEvent'),msg));
    this._bot.onText(/\/setAdmin (.+)/, (msg)=>this._order(this._orders.get('setUser'),msg, 'admin'));
    this._bot.onText(/\/setJefazo (.+)/, (msg)=>this._order(this._orders.get('setUser'),msg, 'jefazo'));
    this._bot.onText(/\/setRaso (.+)/, (msg)=>this._order(this._orders.get('setUser'),msg, 'raso'));
    //this._bot.on('document', (msg)=>this._recivePhoto(msg));
  }

  _sendMessage(chatId,msg){
    this._bot.sendMessage(chatId,msg);
  }

  _order(lib, msg, rango) {
    let order = require(lib)(this._db, this, rango);
    order.execute(msg);
  }

  _recivePhoto (msg) {
    var chatId = msg.chat.id;
    this._sendMessage(chatId,'se ha recibido un documento');
    console.log(msg);

    this._bot.downloadFile(msg.document.file_id, _photoDir).then(resp => {
      tesseract.process(resp,function(err,text){
        if(err){
          this._sendMessage(chatId,"esta foto no valia lo siento");
        }else{
          const paserLines = new PaserLines("pueba");
          const profile = paserLines.scannerLine(text.split("\n"));
          this._sendMessage(chatId,text);
        }
      });

      this._sendMessage(chatId,"pero queeeeee");
    });
  }
}
