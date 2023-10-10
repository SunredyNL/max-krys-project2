import { Link, NavLink, Route, Routes, useParams } from 'react-router-dom'

function Navbar() {
    return (
        <>
            <nav className="menu-container">
                <input type="checkbox" aria-label="Toggle menu" />
                <span></span>
                <span></span>
                <span></span>

                <div className="menu">
                    <ul>
                        <li>
                            <Link to={"/"}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to={"/game-list"}>
                                Game list
                            </Link>
                        </li>
                        <li>
                            <Link to={"/games-playing"}>
                                My games
                            </Link>
                        </li>
                        <li>
                            <Link to={"/games-played"}>
                                Played games
                            </Link>
                        </li>
                    </ul>
                    <ul>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar;