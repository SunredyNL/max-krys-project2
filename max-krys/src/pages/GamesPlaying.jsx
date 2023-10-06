import { Link, NavLink, Route, Routes, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
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
    return (
        <>
            <div>
                {gamesPlaying.map(game => (
                    <Link to={`/game-playing/${game.id}`}><GamePlaying title={game.title} key={game.id} id={game.id} image={game.image} /></Link>
                ))}
            </div>
        </>)
}

export default GamesPlaying;