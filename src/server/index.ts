/// <reference path="../../typings/tsd.d.ts" />

import WebSocket = require('ws');
import express = require('express');
//import events = require('events');

import server = require('./server');
import chat = require('./chat');


var app = server.startWebServer(process.env.PORT || 3000);
app.get('/', function(request:express.Request, response:express.Response) {
    response.send('hello world from typescript');
});

app.get('/chat', function(request:express.Request, response:express.Response) {
    response.render('chat', {name: request.query.name});
});

var ws = server.startWebSocketServer(process.env.WS_PORT || 3001);
ws.on('connection', (client:WebSocket) => {

    client.on('message', (raw:string) => {
        console.log('message received: ', raw);

        var message = chat.parseMessage(raw);
       //console.log(message);
        chat.emitter.emit(message.type, message.body, client)
    });
});





