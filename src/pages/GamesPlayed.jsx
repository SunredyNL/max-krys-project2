import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import GamePlaying from '../components/GamePlaying';
import Navbar from '../components/Navbar';
import '../App.css'
function GamesPlayed() {

    const {id} = useParams();
    const [gamesPlayed, setGamesPlayed] = useState([]);
    const fetchGamesIPlayed = async () => {
        const response = await fetch(`https://gamejournal-backend-2023.adaptable.app/gamesFinished`, {
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
            <Navbar id={id}/>
            {gamesPlayed.map(game => (
                <div>
                    <GamePlaying title={game.title} key={game.id} id={game.id} image={game.image} />
                </div>
            ))}
        </>)
}

export default GamesPlayed;