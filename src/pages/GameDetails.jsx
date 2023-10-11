import { Link, NavLink, Route, Routes, useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import '../App.css'
import metacritic from "../assets/metacritic.png"
import Navbar from '../components/Navbar'
const apiKey = "03d5981c38e0462b823b8533abbe6af3"
function GameDetails() {
    const [game, setGame] = useState([])
    const { id, gameId } = useParams()
    const navigate = useNavigate()
    const fetchAllGames = async () => {
        const response = await fetch(`https://api.rawg.io/api/games/${gameId}?key=${apiKey}`, {
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
            const response = await fetch(`https://gamejournal-backend-2023.adaptable.app/games`, {
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
            const response = await fetch(`https://gamejournal-backend-2023.adaptable.app/gamesNotPlaying`, {
                method: "POST",
                body: JSON.stringify(payload),
                headers: {
                    'Content-type': 'application/json',
                },
            })
            if (response.ok) {
                const currentGame = await response.json()
                console.log(currentGame)
                navigate(`/game-list/${id}`)

            }
        }
        catch (error) {
            console.log(error)
        }
    }


    return (

        (
            <>
                <Navbar id={id} />
                <div className='container'>
                    <img src={game.background_image} style={{ height: "200px" }} />
                    <p className='gameName'>{game.name}</p>
                    <div>About: {game.description_raw}</div>
                    <p className='score'><img className='metacritic' src={metacritic} />Metacritic score: {game.metacritic}</p>
                    <p>Average playtime: {game.playtime} hrs</p>
                    <button className='btnAdd' onClick={addGamePlaying}>Add to my games</button>
                    <button className='btnNotInterested' onClick={addGameNotPlaying}>I'm not interested</button>
                </div>
            </>
        ))

}

export default GameDetails;