const TelegramBot = require('node-telegram-bot-api');
const tesseract = require('node-tesseract');
const PaserLines = require('./PaserLines');
let _bot;
module.exports = class reforest{
  constructor(token,photoDir){
    this.photoDir = photoDir;
    _bot = new TelegramBot(token, {polling: true});

    _bot.on('text', this.messages);
    _bot.onText(/\/echo (.+)/, this._echo);
    _bot.on('document', this.recivePhoto);
  }

  messages(msg){
    var chatId = msg.chat.id;
    console.log(msg);
    _bot.sendMessage(chatId,'mensaje recibido');
    _bot.getUpdates().then(resp =>{
      console.log(resp);
    });
    _bot.sendMessage('223945800','esto es un mensaje personalizado');
  }

  _echo(msg, match){
    var chatId = msg.chat.id;
    var resp = match[1];
    bot.sendMessage(chatId, resp);
  }

  recivePhoto (msg) {
    var chatId = msg.chat.id;
    _bot.sendMessage(chatId,'se ha recibido un documento');
    console.log(msg);

    _bot.downloadFile(msg.document.file_id, this.photoDir).then(resp => {
      tesseract.process(resp,function(err,text){
        if(err){
          _bot.sendMessage(chatId,"esta foto no valia lo siento");
        }else{
          const paserLines = new PaserLines("pueba");
          const profile = paserLines.scannerLine(text.split("\n"));
          _bot.sendMessage(chatId,text);
        }
      });

      _bot.sendMessage(chatId,"pero queeeeee");
    });
  }
}
