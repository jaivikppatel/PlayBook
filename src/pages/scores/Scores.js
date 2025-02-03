import React, { useEffect } from 'react';
import AppHeader from '../../components/header/AppHeader';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Dialog, IconButton, Paper, Typography, TextField, Button, Select } from '@mui/material';

const Scores = () => {
    const [games, setGames] = React.useState([]);
    const [game_id, setGameId] = React.useState(null);

    const [players, setPlayers] = React.useState([]);
    const [scores, setScores] = React.useState([]);



    useEffect(() => {
        fetch(`${sessionStorage.getItem('apiUrl')}/get_matches`)
            .then(response => response.json())
            .then(data => setGames(data))
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        fetch(`${sessionStorage.getItem('apiUrl')}/get_players`)
            .then(response => response.json())
            .then(data => setPlayers(data))
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        fetch(`${sessionStorage.getItem('apiUrl')}/get_scores`)
            .then(response => response.json())
            .then(data => setScores(data))
            .catch(error => console.error(error));
    }, []);

    function saveScores() {
        players.forEach(player => {
            const rank = document.getElementById(`rank-${player.id}`).value;
            fetch(`${sessionStorage.getItem('apiUrl')}/add_score`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ team_id: player.id, game_id, rank })
            })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    console.log('Score added');
                }
            })
            .catch(error => console.error(error));
        });
    }

    function selectGame(game_id) {
        setGameId(game_id);
        // get scores for the selected game
        fetch(`${sessionStorage.getItem('apiUrl')}/get_scores`)
            .then(response => response.json())
            .then(data => setScores(data.filter(score => score.game_id === game_id)))
            .catch(error => console.error(error));
    }


    return (
        <div className='app-home'>
            <AppHeader />
            <h1 style={{marginTop: '80px', color: '#14083d'}}>Scores</h1>

            <Select
                label="Game"
                style={{width: '200px'}}
                native
                value={game_id}
                onChange={(e) => selectGame(e.target.value)}
            >
                <option value="">Select a Game</option>
                {games.map(game => (
                    <option key={game.id} value={game.id}>{game.name}</option>
                ))}
            </Select>

            {game_id && players.map(player => (
                <table key={player.id} style={{ marginTop: '20px', border: '1px solid #ccc', padding: '10px' }}>
                    <tr>
                        <td>{player.name}</td>
                        <td>
                            <TextField
                                id={`rank-${player.id}`}
                                label="Rank"
                                type="number"
                                variant="outlined"
                                style={{width: '100px'}}
                                defaultValue={scores.find(score => score.team_id === player.id)?.rank}
                            />
                        </td>
                    </tr>
                </table>
            ))}
            <Button
                variant="contained"
                style={{marginTop: '20px'}}
                onClick={() => saveScores()}
            >
                Save Scores
            </Button>
        </div>
    )
};

export default Scores;