/// <reference path="../../typings/tsd.d.ts" />

import WebSocket = require('ws');
import express = require('express');
import server = require('./server');


var app = server.startWebServer(process.env.PORT || 3000);
var ws = server.startWebSocketServer(process.env.WS_PORT || 3001);

ws.on('connection', (client:WebSocket) => {
    console.log('connected ' + client.toString());

    client.on('message', message => {
        console.log('message received: ' + message);
    });
});

app.get('/', function(request:express.Request, response:express.Response) {
    response.send('hello world from typescript');
});

app.get('/chat', function(request:express.Request, response:express.Response) {
    response.render('chat', {name: request.query.name});
});
