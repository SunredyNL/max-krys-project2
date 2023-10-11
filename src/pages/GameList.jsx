import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Game from "../components/Game";
import "../App.css";
import { Link, NavLink, Route, Routes, useParams } from "react-router-dom";
const apiKey = "03d5981c38e0462b823b8533abbe6af3";
const url = `https://api.rawg.io/api/games?key=${apiKey}`;
function GameList() {
  const { id } = useParams();

  const [games, setGames] = useState([]);
  const [currPage, setCurrPage] = useState(url);
  const [previous, setPrevious] = useState("");
  const [next, setNext] = useState("");
  const [gamesNotPlaying, setGamesNotPlaying] = useState([]);
  const [gamesPlaying, setGamesPlaying] = useState([]);
  const fetchAllGames = async () => {
    const response = await fetch(currPage, {
      method: "GET",
    });
    console.log(response);
    if (response.status === 200) {
      const games = await response.json();
      setPrevious(games.previous);
      setNext(games.next);
      setGames(games.results);
      console.log(games);
    }
  };

  const fetchGamesIDontPlay = async () => {
    const response = await fetch(
      `https://gamejournal-backend-2023.adaptable.app/users/${id}?_embed=gamesNotPlaying`,
      {
        method: "GET",
      }
    );
    console.log(response);
    if (response.status === 200) {
      const user = await response.json();
      setGamesNotPlaying(user.gamesNotPlaying);
      console.log(user.gamesNotPlaying);
    }
  };
  const fetchGamesIDoPlay = async () => {
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
      fetchAllGames();
    } catch {
      (error) => {
        console.log(error);
      };
    }
    try {
      fetchGamesIDontPlay();
    } catch {
      (error) => {
        console.log(error);
      };
    }
    try {
      fetchGamesIDoPlay();
    } catch {
      (error) => {
        console.log(error);
      };
    }
  }, []);
  useEffect(() => {
    try {
      fetchAllGames();
    } catch {
      (error) => {
        console.log(error);
      };
    }
  }, [currPage]);

  const onNext = () => {
    if (next) {
      setCurrPage(next);
    }
  };
  const onPrevious = () => {
    if (previous) {
      setCurrPage(previous);
    }
  };
  const filterNotPlaying = (game) => {
    for (let i = 0; i < gamesNotPlaying.length; i += 1) {
      const currGame = gamesNotPlaying[i];
      if (currGame.apiId === game.id) {
        return true;
      }
    }
    return false;
  };
  const filterPlaying = (game) => {
    for (let i = 0; i < gamesPlaying.length; i += 1) {
      const currGame = gamesPlaying[i];
      if (currGame.apiId === game.id) {
        return true;
      }
    }
    return false;
  };
  

  return (
    <>
      <Navbar id={id} />
      <div className="gameListContainer">
        {games
          .filter((currentGame) => {
            return (
              !filterNotPlaying(currentGame) && !filterPlaying(currentGame)
            );
          })
          .map((game) => (
            <Link
              className="gameDetailsLink"
              to={`/game-details/${id}/${game.id}`}
            >
              {" "}
              <Game
                name={game.name}
                key={game.id}
                id={game.id}
                background_image={game.background_image}
              />{" "}
            </Link>
          ))}
      </div>
      {previous && <button onClick={onPrevious}>Previous page</button>}
      {next && <button onClick={onNext}>Next Page</button>}
    </>
  );
}

export default GameList;
