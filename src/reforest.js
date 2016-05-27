const TelegramBot = require('node-telegram-bot-api');
const tesseract = require('node-tesseract');
const PaserLines = require('./PaserLines');
const CommandList = require('./Order/OrderList');
const CommandCreateUser = require('./Order/OrderCreateUser');

module.exports = class reforest{

  constructor(token,photoDir,db){
    this._photoDir = photoDir;
    this._db = db;
    this._bot = new TelegramBot(token, {polling: true});

    
    this._bot.onText(/\/createUser (.+)/, (msg)=>this._createUser(msg));
    this._bot.onText(/\/deleteUser (.+)/, (msg)=>this._deleteUser(msg));
    this._bot.onText(/\/list/, (msg)=>this._listado(msg));
    this._bot.on('document', (msg)=>this._recivePhoto(msg));
  }

  _sendMessage(chatId,msg){
    this._bot.sendMessage(chatId,msg);
  }

  _listado(msg){
    let orderList = require('./Order/OrderList')(this._db, this);
    orderList.execute(msg);
  }

  _createUser(msg){
    let orderCreateUser = require('./Order/OrderCreateUser')(this._db, this);
    orderCreateUser.execute(msg);
  }

  _deleteUser(msg){
    let orderDeleteUser = require('./Order/OrderDeleteUser')(this._db, this);
    orderDeleteUser.execute(msg);
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
