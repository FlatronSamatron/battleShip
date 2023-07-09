const createUser = (allData, data, ws) => {
    const user = {
        type: "reg",
        data: {
            name: data.name,
            index: ws.id,
            error: false,
        },
        id: ws.id
    }

    const newUser = {
        ...user,
        data: JSON.stringify(user.data)
    }

    ws.user = user.data

    ws.send(JSON.stringify(newUser))
}

export default createUser