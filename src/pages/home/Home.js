import React from 'react';
import './Home.css';
import AppHeader from '../../components/header/AppHeader';
import RankingTable from '../../components/ranking/RankingTable';

const Home = () => {
    return (
        <div className='app-home'>
           <AppHeader />
           <RankingTable />
        </div>
    );
};

export default Home;