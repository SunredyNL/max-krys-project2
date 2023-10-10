import { Link, NavLink, Route, Routes, useParams } from 'react-router-dom'
import '../App.css'
import bmoadventure from "../assets/bmo-adventure.gif"
function HomePage() {
    return (
        <div className='container'>
            <img className="gif" src={bmoadventure} />
            <div className='middle'><Link className='linkText' to={"/profile/1"}><span className='textDPad'>Profile</span></Link></div>
            <div className="buttons">
                <div>
                    <Link to={"/game-list"}>
                        <button className='btnList'>Games</button>
                    </Link>
                </div>

                <div>
                    <Link to={"/games-playing"}>
                        <button className='btnPlay'>Games I currently play</button>
                    </Link>
                </div>
            </div>
            <div className="buttons2">
                <div className="buttons3">
                    <div>
                        <Link to={"/games-played"}>
                            <button className='btnPlayed'>Games I've played</button>
                        </Link>
                    </div>
                    <div>
                        <Link to={"/games-not-playing"}>
                            <button className='btnNo'>Games I am not interested in</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>)
}

export default HomePage;
