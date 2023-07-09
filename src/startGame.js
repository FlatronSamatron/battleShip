const startGame = (ws) => {

    console.log(ws.ships, JSON.stringify(ws.ships), JSON.stringify(ws.ships.map(item => JSON.stringify(item))))

    const data =  {
        type: "start_game",
        data: JSON.stringify({ships: ws.ships, currentPlayerIndex: ws.id}),
        id: 0
    }
    ws.send(JSON.stringify(data))
}

export default startGame