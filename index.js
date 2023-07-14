import { httpServer } from "./src/http_server/index.js";
import { WebSocketServer} from 'ws';
import { Buffer } from 'node:buffer';

import createUser from './src/createUser.js'
import dataParsing from './src/dataParsing.js'
import createRoom from "./src/createRoom.js";
import startGame from "./src/startGame.js";
import createGame from "./src/createGame.js";

const HTTP_PORT = 8181;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

// WebSocket server event handlers
const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', function(ws) {
    ws.id = new Date().getTime() + Math.round(Math.random()*100)

    wss.isStart = 0
    wss.usersInfo = []

    ws.on('message', (message)=> {
        dataParsing(message, ws, wss)

        wss.clients.forEach(function each(client) {
            if(wss.isStart === 2){
                startGame(client, wss)
            }
            if(wss.isCreateRoom && !client.isCreateRoom){
                createRoom(client, wss)
            }
            if(wss.isCreateGame && !client.isCreateGame){
                createGame(client, wss)
            }
        });

    })

});
