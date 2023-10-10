import { Link, NavLink, Route, Routes, useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
const apiKey = "03d5981c38e0462b823b8533abbe6af3"
function GameDetails() {
    const [game, setGame] = useState([])
    const { id } = useParams()
    const navigate = useNavigate()
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



    const addGamePlaying = async () => {
        const payload = {
            userId: 1,
            id: game.id,
            title: game.name,
            image: game.background_image,
            notes: [],
            milestones: []
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

    const addGameNotPlaying = async () => {
        const payload = {
            userId: 1,
            id: game.id,
            title: game.name,
            image: game.background_image,
        }
        try {
            const response = await fetch(`http://localhost:5000/gamesNotPlaying`, {
                method: "POST",
                body: JSON.stringify(payload),
                headers: {
                    'Content-type': 'application/json',
                },
            })
            if (response.ok) {
                const currentGame = await response.json()
                console.log(currentGame)
                navigate("/game-list")

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
            <button onClick={addGamePlaying}>Add to my games</button>
            <button onClick={addGameNotPlaying}>I'm not interested</button>
        </div>))

}

export default GameDetails;