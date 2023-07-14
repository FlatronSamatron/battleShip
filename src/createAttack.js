import startGame from "./startGame.js";
import createRoom from "./createRoom.js";
import createGame from "./createGame.js";

const createAttack = (ws, wss, data, type) => {
    // console.log(wss.usersInfo)
    wss.isStart = 0
    const turnId = wss.usersInfo.filter( user => user.id !== ws.id)[0]['id']

    const turn = {
        type: "turn",
        data: JSON.stringify({currentPlayer: turnId})
    }

    const setTurn = (id) => {
        const turn = {
            type: "turn",
            data: JSON.stringify({currentPlayer: id})
        }
        ws.send(JSON.stringify(turn))
    }


    const createRandomAttack = () => {
        const x = Math.floor(Math.random()*10)
        const y = Math.floor(Math.random()*10)

        const shootedArray = wss.usersInfo.filter( user => user.id === ws.id)[0]['moves']

        const isShooted = shootedArray.some( shoot => shoot.x === x && shoot.y === y)

        if(isShooted){
            createRandomAttack()
        } else {
            return {x, y}
        }
    }

    const getStatus = (coord) => {
        const ships = wss.usersInfo.filter( user => user.id !== ws.id)[0]['ships']
        let isShoot = false
        let isKill = false
        let isMiss = false
        // let newShip
        console.log('------------------------------------')

        const newShips = ships.map((ship, index) => {
            const isShot = ship.positions.some(item => item.x === coord.x && item.y === coord.y)

            if(isShot){
                if(ship.shoot + 1 >= ship.length){
                    isKill = true
                } else {
                    isShoot = true
                }

                return {...ship, shoot: ship.shoot+1}
            } else {
                isMiss = true
                return ship
            }
        })

        newShips.map( item => {
            console.log(item.shoot)
        })

        wss.usersInfo = wss.usersInfo.map( item => {
            return item.id === ws.id ? {...item, moves: [...item.moves, coord]} : {...item, ships: newShips}
        })

        return isKill ? 'killed' : isShoot ? 'shot' : 'miss'
    }

    const createAttack = (coord) => {
        const status = getStatus(coord)
        const attack = {
            type: 'attack',
            data: JSON.stringify({position: coord, currentPlayer: ws.id, status: killed ? 'killed' : status}),
            id: 0
        }

        // ws.send(JSON.stringify(attack))
        // setTurn(turnId)

        wss.clients.forEach(function each(client) {
            client.send(JSON.stringify(attack))
            // setTurn(ws.id)
        });
    }

    if(type === 'randomAttack'){
        const coord = createRandomAttack()
        createAttack(coord)
    } else {
        createAttack({x: data.x, y: data.y})
    }

}

export default createAttack