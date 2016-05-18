const TelegramBot = require('node-telegram-bot-api');
const tesseract = require('node-tesseract');
let _bot;
module.exports = class reforest{
    constructor(token){
        _bot = new TelegramBot(token, {polling: true});
        
        _bot.on('text', this.messages);
        _bot.on('message', this.recivePhoto);
    }
    
    messages(msg){
        var chatId = msg.chat.id;
        console.log("esto es la hostia: "+msg);
        _bot.sendMessage(chatId,'peroooo');

    }
    
    recivePhoto (msg) {
        var chatId = msg.chat.id;
        console.log(msg.document);
        _bot.downloadFile(msg.document.file_id, __dirname).then(function (resp) {
            console.log(resp);
            tesseract.process(resp,function(err,text){
                if(err){
                    _bot.sendMessage(chatId,"esta foto no valia lo siento");
                    }else{
                        console.log(text);
                        _bot.sendMessage(chatId,text);
                    }
                });
            _bot.sendMessage(chatId,"pero queeeeee");
        });
    }
}