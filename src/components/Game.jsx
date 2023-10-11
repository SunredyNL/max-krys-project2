import { Link, NavLink, Route, Routes, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import '../App.css'
function Game(props) {

    return (
        <div className='gameContainer'>
            <p className='gameNameList'>{props.name}</p>
            <img className='gameImage' src={props.background_image} />
        </div>
    )
}

export default Game;