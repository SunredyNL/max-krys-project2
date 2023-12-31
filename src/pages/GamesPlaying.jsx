import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import GamePlaying from "../components/GamePlaying";
import "../App.css";
function GamesPlaying() {
  const { id } = useParams();

  const [gamesPlaying, setGamesPlaying] = useState([]);
  const fetchGamesIPlay = async () => {
    const response = await fetch(
      `https://gamejournal-backend-2023.adaptable.app/users/${id}?_embed=games`,
      {
        method: "GET",
      }
    );
    console.log(response);
    if (response.status === 200) {
      const user = await response.json();
      setGamesPlaying(user.games);
      console.log(user.games);
    }
  };
  useEffect(() => {
    try {
      fetchGamesIPlay();
    } catch {
      (error) => {
        console.log(error);
      };
    }
  }, []);
  const handleDelete = async (game) => {
    const payload = {
      userId: game.userId,
      id: game.id,
      apiId: game.apiId,
      title: game.title,
      image: game.image,
    };
    try {
      const response = await fetch(
        `https://gamejournal-backend-2023.adaptable.app/gamesFinished`,
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if (response.ok) {
        const currentGame = await response.json();
        console.log(currentGame);
      }
    } catch (error) {
      console.log(error);
    }
    try {
      const response = await fetch(
        `https://gamejournal-backend-2023.adaptable.app/games/${game.id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        const parsed = await response.json();
        console.log(parsed);
        location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Navbar id={id} />
      <div className="gameListContainer">
        {gamesPlaying.map((game) => (
          <div className="gameContainerPlaying" key={game.id}>
            <Link
              className="gameDetailsLink"
              to={`/game-playing/${id}/${game.id}`}
            >
              <GamePlaying
                title={game.title}
                key={game.id}
                id={game.id}
                image={game.image}
              />
            </Link>
            <button
              className="gamePlayingFinish"
              onClick={() => {
                handleDelete(game);
              }}
            >
              I finished the game
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default GamesPlaying;
