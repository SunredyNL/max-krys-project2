import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import "../App.css";
import firstlike from "../assets/firstlike.png";
import firstcomment from "../assets/firstcomment.png";
import likeandcomment from "../assets/likeandcomment.png";
import tenComments from "../assets/10comments.png";
import tenLikes from "../assets/10likes.png";
import tenPlayed from "../assets/10played.png";
import hunLikes from "../assets/100likes.png";
import gamePlayed from "../assets/gameplayed.png";
import sendHelp from "../assets/sendhelp.png";
import trueGamer from "../assets/truegamer.png";
import defaultAvatar from "../assets/uavatar.png";

function Profile() {
  const [profile, setProfile] = useState({});
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [finishedGames, setFinishedGames] = useState([]);
  const [playingGames, setPlayingGames] = useState([]);
  const { id } = useParams();
  const fetchThisProfile = async () => {
    const response = await fetch(
      `https://gamejournal-backend-2023.adaptable.app/users/${id}?_embed=games`,
      {
        method: "GET",
      }
    );
    console.log(response);
    if (response.status === 200) {
      const thisUser = await response.json();
      setProfile(thisUser);
      setComments(thisUser.comments);
      setLikes(thisUser.likes);
      setPlayingGames(thisUser.games);
      console.log(thisUser);
    }
  };
  const fetchFinishedGames = async () => {
    const response = await fetch(
      `https://gamejournal-backend-2023.adaptable.app/users/${id}?_embed=gamesFinished`,
      {
        method: "GET",
      }
    );
    console.log(response);
    if (response.status === 200) {
      const finished = await response.json();
      setFinishedGames(finished.gamesFinished);
      console.log(finished);
    }
  };
  useEffect(() => {
    try {
      fetchThisProfile();
    } catch {
      (error) => {
        console.log(error);
      };
    }
  }, []);
  useEffect(() => {
    try {
      fetchFinishedGames();
    } catch {
      (error) => {
        console.log(error);
      };
    }
  }, []);
  useEffect(() => {
    try {
      fetchThisProfile();
    } catch {
      (error) => {
        console.log(error);
      };
    }
  }, [likes]);
  const addComment = async (event) => {
    event.preventDefault();
    const updatedComments = { comments: [...comments, newComment] };
    console.log(updatedComments);
    try {
      const response = await fetch(
        `https://gamejournal-backend-2023.adaptable.app/users/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify(updatedComments),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if (response.ok) {
        const currentComments = await response.json();
        console.log(currentComments);
        window.location.reload(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const addLike = async () => {
    const newLikes = likes + 1;
    const updatedLikes = { likes: newLikes };
    console.log(updatedLikes);
    try {
      const response = await fetch(
        `https://gamejournal-backend-2023.adaptable.app/users/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify(updatedLikes),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if (response.ok) {
        const currentLikes = await response.json();
        console.log(currentLikes);
      }
      setLikes(likes + 1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar id={id} />
      <div className="container">
        {profile.avatarUrl === "default" ? (
          <img className="profilePic" src={defaultAvatar} />
        ) : (
          <img
            className="profilePic"
            src={profile.avatarUrl}
            alt="User Avatar"
          />
        )}
        <div className="profileLikeContainer">
          <div className="profileName">{profile.name}</div>
          <button className="btnLike" onClick={addLike}>
            Likes: {profile.likes}{" "}
          </button>
        </div>
        <div className="stats">
          <div>Stats</div>
          <div>Number of games currently playing: {playingGames.length} </div>
          <div>Number of finished games: {finishedGames.length}</div>
        </div>
        <p className="comments">Comments:</p>
        {comments.map((comment) => (
          <div>
            <p className="comment">{comment}</p>
          </div>
        ))}
        <form onSubmit={addComment}>
          <label htmlFor="newComment">
            <span className="newComment">New comment</span>
            <input
              name="newComment"
              value={newComment}
              type="text"
              onChange={(event) => setNewComment(event.target.value)}
              required
            />
          </label>
          <button className="addButton" type="submit">
            Add
          </button>
        </form>
        <p>Badges:</p>
        <div className="badges">
          {likes >= 1 && (
            <div className="achi">
              <img src={firstlike} alt="First like!" />
              <p className="descr"> First like! </p>
            </div>
          )}
          {likes >= 10 && (
            <div className="achi">
              <img src={tenLikes} alt="10 likes!" />
              <p className="descr"> 10 likes!</p>
            </div>
          )}
          {likes >= 100 && (
            <div className="achi">
              <img src={hunLikes} alt="100 likes!" />
              <p className="descr"> 100 likes! </p>
            </div>
          )}
          {comments.length >= 1 && (
            <div className="achi">
              <img src={firstcomment} alt="First comment!" />
              <p className="descr"> First comment! </p>
            </div>
          )}
          {comments.length >= 10 && (
            <div className="achi">
              <img src={tenComments} alt="Ten comments!" />
              <p className="descr"> Ten comments! </p>
            </div>
          )}
          {comments.length >= 1 && likes >= 1 && (
            <div className="achi">
              <img src={likeandcomment} alt="Comment and a like!" />
              <p className="descr"> Comment and a like! </p>
            </div>
          )}
          {finishedGames.length >= 1 && (
            <div className="achi">
              <img src={gamePlayed} alt="Finished the first game!" />
              <p className="descr"> Finished the first game! </p>
            </div>
          )}
          {finishedGames.length >= 10 && (
            <div className="achi">
              <img src={tenPlayed} alt="Finished 10 games!" />
              <p className="descr"> Finished 10 games! </p>
            </div>
          )}
          {finishedGames.length >= 30 && (
            <div className="achi">
              <img src={trueGamer} alt="True gamer!" />
              <p className="descr"> True Gamer! </p>
            </div>
          )}
          {playingGames.length >= 5 && (
            <div className="achi">
              <img src={sendHelp} alt="Send help" />
              <p className="descr"> Send help! </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
