import { Link, NavLink, Route, Routes, useParams } from 'react-router-dom'

function Navbar() {
    return (
        <>
            <Link to={"/"}>
                <button>Home</button>
            </Link>
        </>)
}

export default Navbar;