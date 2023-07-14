const createRoom = (ws, wss) => {
    const game = {
        type: "update_room",
        data: JSON.stringify([{roomId:0,roomUsers:[{name:ws.user.name,index:ws.id}]}]),
        id: 0
    }

    ws.isCreateRoom = true
    wss.isCreateRoom = !wss.isCreateRoom
    wss.createRoomUser = !wss.createRoomUser ? ws.id : wss.createRoomUser

    ws.send(JSON.stringify(game))
}

export default createRoom