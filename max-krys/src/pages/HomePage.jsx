import { Link, NavLink, Route, Routes, useParams } from 'react-router-dom'
function HomePage() {
    return (
        <>
            <div>
                <Link to={"/game-list"}>
                    <button>List of Games</button>
                </Link>
            </div>

            <div>
                <Link to={"/games-playing"}>
                    <button>Games I currently play</button>
                </Link>
            </div>

            <div>
                <Link to={"/games-played"}>
                    <button>Games I've played</button>
                </Link>
            </div>
            <div>
                <Link to={"/games-not-playing"}>
                    <button>Games I am not interested in</button>
                </Link>
            </div>
        </>)
}

export default HomePage;
