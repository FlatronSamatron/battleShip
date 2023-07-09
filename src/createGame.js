const createGame = (ws, wss) => {

    const room =  {
        type: "update_room",
        data: JSON.stringify([{roomId:0,roomUsers:[{name:ws.user.name,index:ws.id}]}]),
        id: 0,
    }

    ws.send(JSON.stringify(room))
}

export default createGame