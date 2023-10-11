import { Link, NavLink, Route, Routes, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import '../App.css'
import Navbar from '../components/Navbar'
function GamesPlayingDetails() {
    const [milestones, setMilestones] = useState([])
    const [newMilestone, setNewMilestone] = useState([])
    const [notes, setNotes] = useState([])
    const [game, setGame] = useState({})
    const [newNote, setNewNote] = useState("")
    const { id } = useParams()
    const fetchThisGame = async () => {
        const response = await fetch(`https://gamejournal-backend-2023.adaptable.app/games/${id}`, {
            method: 'GET',
        })
        console.log(response)
        if (response.status === 200) {
            const thisGame = await response.json()
            setGame(thisGame)
            setNotes(thisGame.notes)
            setMilestones(thisGame.milestones)
            console.log(thisGame)
        }
    }

    const addNote = async event => {
        event.preventDefault()
        const updatedNotes = { notes: [...notes, newNote] }
        console.log(updatedNotes)
        try {
            const response = await fetch(
                `https://gamejournal-backend-2023.adaptable.app/games/${id}`,
                {
                    method: 'PATCH',
                    body: JSON.stringify(updatedNotes),
                    headers: {
                        'Content-type': 'application/json',
                    },
                }
            )
            if (response.ok) {
                const currentNotes = await response.json()
                console.log(currentNotes)
                window.location.reload(false);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const addMilestone = async event => {
        event.preventDefault()
        const updatedMilestones = { milestones: [...milestones, newMilestone] }
        console.log(updatedMilestones)
        try {
            const response = await fetch(
                `https://gamejournal-backend-2023.adaptable.app/games/${id}`,
                {
                    method: 'PATCH',
                    body: JSON.stringify(updatedMilestones),
                    headers: {
                        'Content-type': 'application/json',
                    },
                }
            )
            if (response.ok) {
                const currentMilestones = await response.json()
                console.log(currentMilestones)
                window.location.reload(false);
            }
        } catch (error) {
            console.log(error)
        }
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
            <Navbar id={id} />
            <div className='container'>
                <img src={game.image} style={{ height: "200px" }} />
                <p className='gameName'>{game.title}</p>
                <p>Milestones:</p>
                {milestones.map(milestone => (
                    <div className='milestone'>
                        <input type="checkbox" id="cbox" value="checkbox" />
                        <p>{milestone}</p>
                    </div>
                )
                )}
                <form onSubmit={addMilestone}>
                    <label htmlFor="newMilestone">
                        New milestone
                        <input name="newMilestone" value={newMilestone} type="text" onChange={event => setNewMilestone(event.target.value)} required />
                    </label>
                    <button className='addButtonGames' type="submit">Add</button>
                </form>
                <p>Notes:</p>
                {notes.map(note => (
                    <div>
                        <p className='note'>{note}</p>
                    </div>
                )
                )}
                <form onSubmit={addNote}>
                    <label htmlFor="newNote">
                        New note
                        <input name="newNote" value={newNote} type="text" onChange={event => setNewNote(event.target.value)} required />
                    </label>
                    <button className='addButtonGames' type="submit">Add</button>
                </form>
            </div>
        </>)
}

export default GamesPlayingDetails;