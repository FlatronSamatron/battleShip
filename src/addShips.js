const addShips = (ws, wss, data) => {
    ws.ships = data.ships
    wss.isStart = wss.isStart + 1
}

export default addShips