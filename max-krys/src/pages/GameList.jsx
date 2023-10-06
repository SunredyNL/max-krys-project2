import { useEffect, useState } from 'react'
import Game from '../components/Game';
import { Link, NavLink, Route, Routes, useParams } from 'react-router-dom'
const apiKey = "03d5981c38e0462b823b8533abbe6af3"
const url = `https://api.rawg.io/api/games?key=${apiKey}`
function GameList() {
    const [games, setGames] = useState([])
    const [currPage, setCurrPage] = useState(url)
    const [previous, setPrevious] = useState("")
    const [next, setNext] = useState("")
    const fetchAllGames = async () => {
        const response = await fetch(currPage, {
            method: 'GET',
        })
        console.log(response)
        if (response.status === 200) {
            const games = await response.json()
            setPrevious(games.previous)
            setNext(games.next)
            setGames(games.results)
            console.log(games)
        }
    }
    useEffect(() => {
        try { fetchAllGames() }
        catch { (error) => { console.log(error) } }
    }, [])
    useEffect(() => {
        try { fetchAllGames() }
        catch { (error) => { console.log(error) } }
    }, [currPage])

    const onNext = () => {
        if (next) {
            setCurrPage(next)
        }
    }
    const onPrevious = () => {
        if (previous) {
            setCurrPage(previous)
        }
    }

    return (
        <>
            {games.map(game => (
                <Link to={`/game-details/${game.id}`}> <Game name={game.name} key={game.id} id={game.id} background_image={game.background_image} /> </Link>
            ))}
            {previous && <button onClick={onPrevious}>Previous page</button>}
            {next && <button onClick={onNext}>Next Page</button>}
        </>)
}

export default GameList;