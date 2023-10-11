import { Link, NavLink, Route, Routes, useParams } from 'react-router-dom'
import '../App.css'
import bmoadventure from "../assets/bmo-adventure.gif"

function HomePage() {
    const { id } = useParams();

    return (
        <div className='container'>
            <img className="gif" src={bmoadventure} />
            <div className="buttons">
                <div>
                    <Link to={`/game-list/${id}`}>
                        <button className='btnList'>Games</button>
                    </Link>
                </div>

                <div>
                    <Link to={`/games-playing/${id}`}>
                        <button className='btnPlay'>Games I currently play</button>
                    </Link>
                </div>
            </div>

            <div className='up'></div>
            <div className='middle'><Link className='linkText' to={`/profile/${id}`}><span className='textDPad'>Profile</span></Link></div>
            <div className='down'></div>
            <div className="buttons2">
                <div className="buttons3">
                    <div>
                        <Link to={`/games-played/${id}`}>
                            <button className='btnPlayed'>Games I've played</button>
                        </Link>
                    </div>
                    <div>
                        <Link to={`/games-not-playing/${id}`}>
                            <button className='btnNo'>Games I am not interested in</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>)
}

export default HomePage;
