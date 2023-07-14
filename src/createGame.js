const createGame = (ws, wss) => {

    const room =  {
        type: "create_game",
        data: JSON.stringify({idGame: 0, idPlayer: ws.id}),
        id: 0,
    }

    ws.send(JSON.stringify(room))

    ws.isCreateGame = true
    wss.isCreateGame = !wss.isCreateGame
}

export default createGame