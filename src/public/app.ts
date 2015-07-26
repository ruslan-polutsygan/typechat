module app {
    export function start() {
        console.log('started');
    }
}

app.start();

////
var socket1 = new WebSocket('ws://localhost:3001');
socket1.onmessage = (message)=> {
    console.log('incoming message 1: ' + message.data);
};
var socket2 = new WebSocket('ws://localhost:3001');
socket2.onmessage = (message)=> {
    console.log('incoming message 2: ' + message.data);
};

//var socket3 = new WebSocket('ws://localhost:3001');
//socket1.onmessage = (message)=> {
//    console.log('3: ' + message);
//};

socket1.onopen = ()=> {
    socket1.send(JSON.stringify({type: 'new-user', body: 'John'}));
};

socket2.onopen = ()=> {
    socket2.send(JSON.stringify({type: 'new-user', body: 'Danny'}));
};

//socket3.onopen = ()=>{
//    socket3.send(JSON.stringify({type: 'new-user', name: 'Chris'}));
//};


