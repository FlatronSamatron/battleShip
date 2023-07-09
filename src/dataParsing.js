import { Buffer } from 'node:buffer';
import createUser from "./createUser.js";
import createRoom from "./createRoom.js";
import createGame from "./createGame.js";
import addShips from "./addShips.js";

const dataParsing = (message, ws, wss) => {
    const allData = JSON.parse(Buffer.from(message, 'utf-8').toString())
    const data = !!allData.data.length && JSON.parse(allData.data)

    const {type} = allData

    if(type === 'reg'){
        createUser(allData, data, ws)
    }

    if(type === 'create_room'){
        createRoom(ws, wss)
    }

    if(type === 'add_user_to_room'){
        createGame(ws, wss)
    }

    if(type === 'add_ships'){
        addShips(ws, wss, data)
    }
}

export default dataParsing