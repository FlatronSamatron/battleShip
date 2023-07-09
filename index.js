import { httpServer } from "./src/http_server/index.js";
import { WebSocketServer} from 'ws';
import { Buffer } from 'node:buffer';

import createUser from './src/createUser.js'
import dataParsing from './src/dataParsing.js'
import createRoom from "./src/createRoom.js";
import startGame from "./src/startGame.js";

const HTTP_PORT = 8181;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

// WebSocket server event handlers
const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', function(ws) {
    ws.id = new Date().getTime() + Math.round(Math.random()*100)

    wss.isStart = 0

    ws.on('message', (message)=> {
        dataParsing(message, ws, wss)

        wss.clients.forEach(function each(client) {
            if(wss.isStart === 2){
                // wss.isStart = 0
                startGame(client)
            }
            if(client.user && client.user.name && client.id !== ws.id && !client.isCreateRoom){
                client.isCreateRoom = true
                createRoom(client)
            }
        });

    })

});
