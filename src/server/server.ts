/// <reference path="../../typings/tsd.d.ts" />

import express = require('express');
import WebSocket = require('ws');

module server {
    var app = express();

    export function startWebServer(port:number):express.Application {
        app.set('view engine', 'jade');

        app.listen(port, () => {
            console.log('web: listening on '+port);
        });

        app.use(express.static('public'));

        return app;
    }

    export function startWebSocketServer(port: number):WebSocket.Server {
        return new WebSocket.Server({port: port}, ()=>{
            console.log('ws: listening on '+ port);
        });

    }
}

export = server;
