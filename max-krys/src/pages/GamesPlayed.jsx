import { useEffect, useState } from 'react'
import GamePlaying from '../components/GamePlaying';
function GamesPlayed() {
    const [gamesPlayed, setGamesPlayed] = useState([]);
    const fetchGamesIPlayed = async () => {
        const response = await fetch(`http://localhost:5000/gamesFinished`, {
            method: 'GET',
        })
        console.log(response)
        if (response.status === 200) {
            const games = await response.json()
            setGamesPlayed(games)
            console.log(games)
        }
    }
    useEffect(() => {
        try { fetchGamesIPlayed() }
        catch { (error) => { console.log(error) } }
    }, [])
    return (
        <>
            {gamesPlayed.map(game => (
                <div>
                    <GamePlaying title={game.title} key={game.id} id={game.id} image={game.image} />
                </div>
            ))}
        </>)
}

export default GamesPlayed;