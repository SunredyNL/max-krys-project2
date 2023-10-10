import { Link, NavLink, Route, Routes, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import GamePlaying from '../components/GamePlaying';
function GamesPlaying() {
    const [gamesPlaying, setGamesPlaying] = useState([]);
    const fetchGamesIPlay = async () => {
        const response = await fetch(`http://localhost:5000/users/1?_embed=games`, {
            method: 'GET',
        })
        console.log(response)
        if (response.status === 200) {
            const user = await response.json()
            setGamesPlaying(user.games)
            console.log(user.games)
        }
    }
    useEffect(() => {
        try { fetchGamesIPlay() }
        catch { (error) => { console.log(error) } }
    }, [])
    const handleDelete = async (game) => {
        const payload = {
            userId: 1,
            id: game.id,
            title: game.title,
            image: game.image,
        }
        try {
            const response = await fetch(`http://localhost:5000/gamesFinished`, {
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
        try {
            const response = await fetch(`http://localhost:5000/games/${game.id}`, {
                method: 'DELETE',
            })
            if (response.ok) {
                const parsed = await response.json()
                console.log(parsed)
                location.reload()
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <Navbar />
            <div>
                {gamesPlaying.map(game => (
                    <div>
                        <Link to={`/game-playing/${game.id}`}><GamePlaying title={game.title} key={game.id} id={game.id} image={game.image} /></Link>
                        <button onClick={() => { handleDelete(game) }}>I finished the game</button>
                    </div>
                ))}
            </div>
        </>)
}

export default GamesPlaying;