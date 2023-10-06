import { Link, NavLink, Route, Routes, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
function GamesPlayingDetails() {
    const [game, setGame] = useState({})
    const { id } = useParams()
    const fetchThisGame = async () => {
        const response = await fetch(`http://localhost:5000/games/${id}`, {
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
        try { fetchThisGame() }
        catch { (error) => { console.log(error) } }
    }, [])
    return (
        <>
            <div>
                <img src={game.image} style={{ height: "200px" }} />
                <p>{game.title}</p>
            </div>
        </>)
}

export default GamesPlayingDetails;