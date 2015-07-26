import events = require('events');
import WebSocket = require('ws');

module chat {
    export class Message {
        constructor(public type:string, public body:any) {}
    }

    export function parseMessage(raw:string):Message{
        var obj = JSON.parse(raw);

        return new Message(obj.type, obj.body);
    }

    class User {
        constructor(public name:string, public client:WebSocket){
        }
    }
    var users:Array<User> = [];

    export var Events = {
        NEW_USER: 'new-user',
        MESSAGE: 'message'
    };

    export var emitter = new events.EventEmitter();

    function broadcast(type, data){
        users.forEach(user => {
            user.client.send(JSON.stringify({
                type: type,
                data: data
            }));
        })
    }

    function findUser(client:WebSocket) {
        for(var user of users) {
            if(user.client === client) {
                return user;
            }
        }
    }

    emitter.addListener(Events.NEW_USER, (name:string, client:WebSocket) => {
        console.log('connected;' + name);

        users.push(new User(name, client));
        console.log(users.length);

        broadcast(Events.NEW_USER, name + ' has just connected! greetings!')
    });

    emitter.addListener('test', (data:string, client:WebSocket) => {
        console.log('test;' + data);

        broadcast('test', 'back: ' + data);
    });

    emitter.addListener(Events.MESSAGE, (data:string, client:WebSocket) => {
        console.log('mew message received;' + data);

        broadcast(Events.MESSAGE, {message: data, from: findUser(client).name});
    });



}

export = chat;
