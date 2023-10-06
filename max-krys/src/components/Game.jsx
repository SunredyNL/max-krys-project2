import { Link, NavLink, Route, Routes, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
function Game(props) {

    return (
        <div>
            <p>{props.name}</p>
            <img src={props.background_image} style={{ height: "100px" }} />
        </div>
    )
}

export default Game;