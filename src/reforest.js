const TelegramBot = require('node-telegram-bot-api');
const tesseract = require('node-tesseract');
const PaserLines = require('./PaserLines');

module.exports = class reforest{

  constructor(token,photoDir,db){
    this._photoDir = photoDir;
    this._db = db;
    this._bot = new TelegramBot(token, {polling: true});

    this._bot.onText(/\/addUserEvent (.+)/, (msg)=>this._addUserEvent(msg));
    this._bot.onText(/\/createEvent (.+)/, (msg)=>this._createEvent(msg));
    this._bot.onText(/\/createUser (.+)/, (msg)=>this._createUser(msg));
    this._bot.onText(/\/deleteEvent (.+)/, (msg)=>this._deleteEvent(msg));
    this._bot.onText(/\/deleteUser (.+)/, (msg)=>this._deleteUser(msg));
    this._bot.onText(/\/help/, (msg)=>this._help(msg));
    this._bot.onText(/\/listEvents/, (msg)=>this._listEvents(msg));
    this._bot.onText(/\/listUsers/, (msg)=>this._listUsers(msg));
    this._bot.onText(/\/listUserEvent/, (msg)=>this._listUserEvent(msg));
    this._bot.onText(/\/removeUserEvent (.+)/, (msg)=>this._removeUserEvent(msg));
    this._bot.onText(/\/setAdmin (.+)/, (msg)=>this._setUser(msg, 'admin'));
    this._bot.onText(/\/setJefazo (.+)/, (msg)=>this._setUser(msg, 'jefazo'));
    this._bot.onText(/\/setRaso (.+)/, (msg)=>this._setUser(msg, 'raso'));
    //this._bot.on('document', (msg)=>this._recivePhoto(msg));
  }

  _sendMessage(chatId,msg){
    this._bot.sendMessage(chatId,msg);
  }

  _addUserEvent(msg){
    let orderAddUserEvent = require('./Order/OrderAddUserEvent')(this._db, this);
    orderAddUserEvent.execute(msg);
  }

  _createEvent(msg){
    let orderCreateEvent = require('./Order/OrderCreateEvent')(this._db, this);
    orderCreateEvent.execute(msg);
  }

  _createUser(msg){
    let orderCreateUser = require('./Order/OrderCreateUser')(this._db, this);
    orderCreateUser.execute(msg);
  }

  _deleteEvent(msg){
    let orderDeleteEvent = require('./Order/OrderDeleteEvent')(this._db, this);
    orderDeleteEvent.execute(msg);
  }

  _deleteUser(msg){
    let orderDeleteUser = require('./Order/OrderDeleteUser')(this._db, this);
    orderDeleteUser.execute(msg);
  }

  _help(msg){
    let orderHelp = require('./Order/OrderHelp')(this._db, this);
    orderHelp.execute(msg);
  }

  _listEvents(msg){
    let orderListEvent = require('./Order/OrderListEvent')(this._db, this);
    orderListEvent.execute(msg);
  }

  _listUsers(msg){
    let orderList = require('./Order/OrderList')(this._db, this);
    orderList.execute(msg);
  }

  _listUserEvent(msg){
    let orderListUsersEvent = require('./Order/OrderListUsersEvent')(this._db, this);
    orderListUsersEvent.execute(msg);
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

  _removeUserEvent(msg){
    let orderRemoveUserEvent = require('./Order/OrderRemoveUserEvent')(this._db, this);
    orderRemoveUserEvent.execute(msg);
  }

  _setUser(msg,rango) {
    let orderSetUser = require('./Order/OrderSetUser')(this._db, this, rango);
    orderSetUser.execute(msg);
  }
}
