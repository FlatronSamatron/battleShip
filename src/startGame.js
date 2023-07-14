const startGame = (ws, wss) => {

    const data =  {
        type: "start_game",
        data: JSON.stringify({ships: ws.ships, currentPlayerIndex: ws.id}),
        id: 0
    }

    const getShipInfo = (ship) => {
        const {length, direction, position: {x, y}} = ship;
        const positions = [...new Array(length)].map( (item, i) => {
            if(direction){
                return {x, y: y+i}
            } else {
                return {x: x+i, y}
            }
        })
        return {
            ...ship,
            positions,
            shoot: 0
        }
    }

    const shipsArray = ws.ships.map( ship => {
        return getShipInfo(ship)
    })

    wss.usersInfo = [...wss.usersInfo, {id: ws.id, ships: shipsArray, moves: []}]

    const turn = {
        type: "turn",
        data: JSON.stringify({currentPlayer: wss.createRoomUser})
    }

    ws.send(JSON.stringify(data))
    ws.send(JSON.stringify(turn))
}

export default startGame