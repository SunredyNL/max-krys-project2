import { Link, NavLink, Route, Routes, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
function GamesPlayingDetails() {
    const [notes, setNotes] = useState([])
    const [game, setGame] = useState({})
    const [newNote, setNewNote] = useState("")
    const { id } = useParams()
    const fetchThisGame = async () => {
        const response = await fetch(`http://localhost:5000/games/${id}`, {
            method: 'GET',
        })
        console.log(response)
        if (response.status === 200) {
            const thisGame = await response.json()
            setGame(thisGame)
            setNotes(thisGame.notes)
            console.log(thisGame)
        }
    }

    const addNote = (event) => {
        event.preventDefault()
        const updatedNotes = [...notes]
        updatedNotes.push(newNote)
        console.log(updatedNotes)
    }
    useEffect(() => {
        try { fetchThisGame() }
        catch { (error) => { console.log(error) } }
    }, [])
    useEffect(() => {
        console.log(game)
    }, [game])
    return (
        <>
            <div>
                <img src={game.image} style={{ height: "200px" }} />
                <p>{game.title}</p>
                {notes.map(note => (
                    <p>{note}</p>
                )
                )}
                <form onSubmit={addNote}>
                    <label for="newNote">
                        New note
                        <input name="newNote" value={newNote} type="text" onChange={event => setNewNote(event.target.value)} required />
                    </label>
                    <button type="submit">Add</button>
                </form>
            </div>
        </>)
}

export default GamesPlayingDetails;