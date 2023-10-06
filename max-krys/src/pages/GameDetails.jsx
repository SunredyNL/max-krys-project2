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
            const game = await response.json()
            setGame(game)
            console.log(game)
        }
    }
    useEffect(() => {
        try { fetchAllGames() }
        catch { (error) => { console.log(error) } }
    }, [])

    return (
        <div>
            <img src={game.background_image} style={{ height: "200px" }} />
            <p>Name: {game.name}</p>
            <div>About: {game.description_raw}</div>
            <p>Metacritic score: {game.metacritic}</p>
            <p>Average playtime: {game.playtime} hrs</p>
        </div>

    )
}

export default GameDetails;