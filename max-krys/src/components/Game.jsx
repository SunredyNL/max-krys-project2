import { Link, NavLink, Route, Routes, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
const url2 = 'https://corsproxy.io/?' + encodeURIComponent('https://api.igdb.com/v4/covers');
function Game(props) {
    const [cover, setCover] = useState("");
    console.log(props.id)
    const fetchCover = async () => {
        const response = await fetch(url2, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': 'swixb3jjaevw3calu08m76vyljrgrx',
                'Authorization': 'Bearer 6r8792oqm71v0knbuwzcjgn1l8vhn8'
            },
            body: `fields url; where game=${props.id};`
        })

        if (response.ok) {
            const cover = await response.json()
            setCover(cover)
            console.log(cover)
        }
    }
    useEffect(() => {
        try { fetchCover() }
        catch { (error) => { console.log(error) } }
    }, [])
    return (
        <div>
            <p>{props.name}</p>
        </div>
    )
}

export default Game;