const TelegramBot = require('node-telegram-bot-api');
const tesseract = require('node-tesseract');
const PaserLines = require('./PaserLines');

module.exports = class reforest{

  constructor(token,photoDir,db){
    this._photoDir = photoDir;
    this._db = db;
    this._bot = new TelegramBot(token, {polling: true});
    
    this._bot.onText(/\/createUser (.+)/, (msg)=>this._createUser(msg));
    this._bot.onText(/\/deleteUser (.+)/, (msg)=>this._deleteUser(msg));
    this._bot.onText(/\/help/, (msg)=>this._help(msg));
    this._bot.onText(/\/list/, (msg)=>this._list(msg));
    this._bot.onText(/\/setAdmin (.+)/, (msg)=>this._setUser(msg, 'admin'));
    this._bot.onText(/\/setJefazo (.+)/, (msg)=>this._setUser(msg, 'jefazo'));
    this._bot.onText(/\/setRaso (.+)/, (msg)=>this._setUser(msg, 'raso'));
    //this._bot.on('document', (msg)=>this._recivePhoto(msg));
  }

  _sendMessage(chatId,msg){
    this._bot.sendMessage(chatId,msg);
  }

  _createUser(msg){
    let orderCreateUser = require('./Order/OrderCreateUser')(this._db, this);
    orderCreateUser.execute(msg);
  }

  _deleteUser(msg){
    let orderDeleteUser = require('./Order/OrderDeleteUser')(this._db, this);
    orderDeleteUser.execute(msg);
  }

  _help(msg){
    let orderHelp = require('./Order/OrderHelp')(this._db, this);
    orderHelp.execute(msg);
  }

  _list(msg){
    let orderList = require('./Order/OrderList')(this._db, this);
    orderList.execute(msg);
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

  _setUser(msg,rango) {
    let orderSetUser = require('./Order/OrderSetUser')(this._db, this, rango);
    orderSetUser.execute(msg);
  }
}
