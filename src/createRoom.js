const createRoom = (ws, wss) => {
    const game = {
        type: "create_game",
        data: JSON.stringify({idGame: 0, idPlayer: ws.id}),
        id: 0
    }

    ws.send(JSON.stringify(game))
}

export default createRoom