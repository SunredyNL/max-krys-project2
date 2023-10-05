import { useEffect, useState } from 'react'
import Game from '../components/Game';
const url = 'https://corsproxy.io/?' + encodeURIComponent('https://api.igdb.com/v4/games/');
function GameList() {
    const [games, setGames] = useState([])
    const fetchAllGames = async () => {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': 'swixb3jjaevw3calu08m76vyljrgrx',
                'Authorization': 'Bearer 6r8792oqm71v0knbuwzcjgn1l8vhn8'
            },
            body: "fields platforms, name; limit 20; where rating >90;"
        })
        console.log(response)
        if (response.ok) {
            const allGames = await response.json()
            setGames(allGames)
            console.log(allGames)
        }
    }
    useEffect(() => {
        fetchAllGames()
    }, [])
    return (
        <>
            {games.map(game => (
                <Game name={game.name} key={game.id} id={game.id} />
            ))}
        </>)
}

export default GameList;