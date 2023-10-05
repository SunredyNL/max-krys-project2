import { useState } from 'react'
import { Link, NavLink, Route, Routes, useParams } from 'react-router-dom'
import HomePage from "./pages/HomePage"
import GameList from "./pages/GameList"
import GamesPlayed from "./pages/GamesPlayed"
import GamesPlaying from "./pages/GamesPlaying"
import GamesNotPlaying from "./pages/GamesNotPlaying"
import Profile from "./pages/Profile"
import Navbar from './components/Navbar'
import './App.css'

function App() {

  return (
    <>
      <div className="App">
        <Navbar />
        <h1>Gaming BMO</h1>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/profile/:profileId' element={<Profile />} />
          <Route path='/game-list' element={<GameList />} />
          <Route path='/games-played' element={<GamesPlayed />} />
          <Route path='/games-playing' element={<GamesPlaying />} />
          <Route path='/games-not-playing' element={<GamesNotPlaying />} />
          <Route path='*' element={<h1>404 Page Not Found</h1>} />
        </Routes>
      </div>
    </>
  )
}

export default App
