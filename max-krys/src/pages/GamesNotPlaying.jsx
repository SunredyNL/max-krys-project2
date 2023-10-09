import { useEffect, useState } from 'react'
import GamePlaying from '../components/GamePlaying';
function GamesNotPlaying() {
    const [gamesNotPlaying, setGamesNotPlaying] = useState([]);
    const fetchGamesIDontPlay = async () => {
        const response = await fetch(`http://localhost:5000/users/1?_embed=gamesNotPlaying`, {
            method: 'GET',
        })
        console.log(response)
        if (response.status === 200) {
            const user = await response.json()
            setGamesNotPlaying(user.gamesNotPlaying)
            console.log(user.gamesNotPlaying)
        }
    }
    useEffect(() => {
        try { fetchGamesIDontPlay() }
        catch { (error) => { console.log(error) } }
    }, [])


    const handleDelete = async (game) => {
        try {
            const response = await fetch(`http://localhost:5000/gamesNotPlaying/${game.id}`, {
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
            <div>
                {gamesNotPlaying.map(game => (
                    <div>
                        <GamePlaying title={game.title} key={game.id} id={game.id} image={game.image} /> <button onClick={() => { handleDelete(game) }}>Delete</button>
                    </div>
                ))}
            </div>
        </>)
}

export default GamesNotPlaying;