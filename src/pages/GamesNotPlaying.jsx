import { useEffect, useState } from 'react'
import GamePlaying from '../components/GamePlaying';
import Navbar from '../components/Navbar';
function GamesNotPlaying() {
    const { id } = userParams();

    const [gamesNotPlaying, setGamesNotPlaying] = useState([]);
    const fetchGamesIDontPlay = async () => {
        const response = await fetch(`https://gamejournal-backend-2023.adaptable.app/users/${id}?_embed=gamesNotPlaying`, {
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
            const response = await fetch(`https://gamejournal-backend-2023.adaptable.app/gamesNotPlaying/${game.id}`, {
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
            <Navbar id={id} />
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