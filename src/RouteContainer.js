
import React from 'react';
import { 
    BrowserRouter as Router,
    Routes,
    Route
 } from 'react-router-dom';
import Home from './pages/home/Home';
import Players from './pages/players/Players';
import Games from './pages/games/Games';
import Scores from './pages/scores/Scores';

const RouteContainer = (props) => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/players" element={<Players/>} />
        <Route path='/games' element={<Games />} />
        <Route path='/scores' element={<Scores />} />
      </Routes>
    </Router>
  );
};

export default RouteContainer;