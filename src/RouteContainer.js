
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
import Login from './pages/login/Login';

const RouteContainer = (props) => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={sessionStorage.getItem("cred_code") ? <Home/> : <Login />} />
        <Route path="/players" element={sessionStorage.getItem("cred_code") ? (sessionStorage.getItem("admin") === 'true' ? <Players/> : <Home />) : <Login />} />
        <Route path='/games' element={sessionStorage.getItem("cred_code") ? (sessionStorage.getItem("admin") === 'true' ? <Games /> : <Home />) : <Login />} />
        <Route path='/scores' element={sessionStorage.getItem("cred_code") ? (sessionStorage.getItem("admin") === 'true' ? <Scores /> : <Home />) : <Login />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  );
};

export default RouteContainer;