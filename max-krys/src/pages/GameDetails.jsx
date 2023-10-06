import { Link, NavLink, Route, Routes, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
const apiKey = "03d5981c38e0462b823b8533abbe6af3"
function GameDetails() {
    const [game, setGame] = useState([])
    const { id } = useParams()
    const fetchAllGames = async () => {
        const response = await fetch(`https://api.rawg.io/api/games/${id}?key=${apiKey}`, {
            method: 'GET',
        })
        console.log(response)
        if (response.status === 200) {
            const thisGame = await response.json()
            setGame(thisGame)
            console.log(thisGame)
        }
    }
    useEffect(() => {
        try { fetchAllGames() }
        catch { (error) => { console.log(error) } }
    }, [])



    const addGame = async () => {
        const payload = {
            userId: 1,
            id: game.id,
            title: game.name,
            image: game.background_image,
        }
        try {
            const response = await fetch(`http://localhost:5000/games`, {
                method: "POST",
                body: JSON.stringify(payload),
                headers: {
                    'Content-type': 'application/json',
                },
            })
            if (response.ok) {
                const currentGame = await response.json()
                console.log(currentGame)
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    return (

        (<div>
            <img src={game.background_image} style={{ height: "200px" }} />
            <p>Name: {game.name}</p>
            <div>About: {game.description_raw}</div>
            <p>Metacritic score: {game.metacritic}</p>
            <p>Average playtime: {game.playtime} hrs</p>
            <button onClick={addGame}>Add to my games</button>
        </div>))

}

export default GameDetails;