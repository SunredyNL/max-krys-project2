import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
function Profile() {
    const [profile, setProfile] = useState({})
    const [likes, setLikes] = useState(0)
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState("")
    const { id } = useParams()
    const fetchThisProfile = async () => {
        const response = await fetch(`http://localhost:5000/users/${id}`, {
            method: 'GET',
        })
        console.log(response)
        if (response.status === 200) {
            const thisUser = await response.json()
            setProfile(thisUser)
            setComments(thisUser.comments)
            console.log(thisUser)
        }
    }
    useEffect(() => {
        try { fetchThisProfile() }
        catch { (error) => { console.log(error) } }
    }, [])
    const addComment = async event => {
        event.preventDefault()
        const updatedComments = { comments: [...comments, newComment] }
        console.log(updatedComments)
        try {
            const response = await fetch(
                `http://localhost:5000/users/${id}`,
                {
                    method: 'PATCH',
                    body: JSON.stringify(updatedComments),
                    headers: {
                        'Content-type': 'application/json',
                    },
                }
            )
            if (response.ok) {
                const currentComments = await response.json()
                console.log(currentComments)
                window.location.reload(false);
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div>
                <img src={profile.avatarUrl} style={{ height: "100px" }} />
                {profile.name}
                <p>Comments:</p>
                {comments.map(comment => (
                    <div>
                        <p>{comment}</p>
                    </div>
                )
                )}
                <form onSubmit={addComment}>
                    <label htmlFor="newComment">
                        New note
                        <input name="newComment" value={newComment} type="text" onChange={event => setNewComment(event.target.value)} required />
                    </label>
                    <button type="submit">Add</button>
                </form>
            </div>

        </>)
}

export default Profile;