import { useEffect, useState } from 'react'
import GamePlaying from '../components/GamePlaying';
import Navbar from '../components/Navbar';
import '../App.css'
import { Link, NavLink, Route, Routes, useParams, useNavigate } from 'react-router-dom'
function GamesNotPlaying() {
    const { id } = useParams();

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
            <div className='gameListContainer'>
                {gamesNotPlaying.map(game => (
                    <div className='gameContainerPlaying'>
                        <GamePlaying title={game.title} key={game.id} id={game.id} image={game.image} /> <button className='gamesNotPlayingDelete' onClick={() => { handleDelete(game) }}>Delete</button>
                    </div>
                ))}
            </div>
        </>)
}

export default GamesNotPlaying;