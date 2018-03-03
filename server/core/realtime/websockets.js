"use strict";

var utils = require("../../libs/utils"),
    consts = require("../../libs/consts"),
    config = require("../../config"),
    ConversationV1 = require('watson-developer-cloud/conversation/v1');

var conversation = new ConversationV1({
        username: config.get('watson:username'),
        password: config.get('watson:password'),
        url: 'https://gateway.watsonplatform.net/conversation/api/',
        version_date: '2017-05-26'
    });
   
exports.run = function(io, sessionParameters) {
    io.use(require("express-socket.io-session")(sessionParameters));

    io.sockets.on("connection", function (socket) {
        console.log("SOCKET_CONNECTED: " +socket.id);
        socket.emit('connected',{socketId: socket.id, success: true});

        socket.on('pe_app:to_watson', function (data) {
            if(data.type == 'ecommerce'){
                data.message = data.message.indexOf('www.') < 0 ? 'www.' + data.message : data.message
            }

            conversation.message({
                input: {
                    'text': data.message
                },
                workspace_id: config.get('watson:workspace_id'),
            }, function(err, response){
                if(err){
                    console.log(err)
                }else{
                    socket.emit('pe_app:from_watson', {message: response, success:true})
                    // console.log(JSON.stringify(response, null, 2))
                }
            })
        });
        
        socket.on("disconnect", function () {
            console.log("SOCKET_DISCONNECT: " + socket.id);
        });
    });

};