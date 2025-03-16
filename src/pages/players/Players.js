import React, { useEffect } from 'react';
import AppHeader from '../../components/header/AppHeader';
import './Players.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Dialog, IconButton, Paper, Typography, TextField, Button } from '@mui/material';

const Players = () => {
    const [players, setPlayers] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [formTitle, setFormTitle] = React.useState('');
    const [playerId, setPlayerId] = React.useState(null);
    const [playerName, setPlayerName] = React.useState('');
    const [playerLogo, setPlayerLogo] = React.useState('');

    useEffect(() => {
        fetch(`${sessionStorage.getItem('apiUrl')}/get_players`)
            .then(response => response.json())
            .then(data => setPlayers(data))
            .catch(error => console.error(error));
    }, []);

    function handleAddClick() {
        setFormTitle('Add Player');
        setOpen(true);
    }

    function handleSave() {
        if (formTitle === 'Add Player') {
            fetch(`${sessionStorage.getItem('apiUrl')}/add_player`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: playerName, logo: playerLogo })
            })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    setPlayerName('');
                    setPlayerLogo('');
                    setOpen(false);
                    fetch(`${sessionStorage.getItem('apiUrl')}/get_players`)
                    .then(response => response.json())
                    .then(data => setPlayers(data))
                    .catch(error => console.error(error));
                }
            })
            .catch(error => console.error(error));
        }
        else if (formTitle === 'Edit Player') {
            fetch(`${sessionStorage.getItem('apiUrl')}/update_player/${playerId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: playerName, logo: playerLogo })
            })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    setPlayerName('');
                    setPlayerLogo('');
                    setOpen(false);
                    fetch(`${sessionStorage.getItem('apiUrl')}/get_players`)
                    .then(response => response.json())
                    .then(data => setPlayers(data))
                    .catch(error => console.error(error));
                }
            })
            .catch(error => console.error(error));
        }
    }

    function handleDelete(id) {
        fetch(`${sessionStorage.getItem('apiUrl')}/delete_player/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                fetch(`${sessionStorage.getItem('apiUrl')}/get_players`)
                .then(response => response.json())
                .then(data => setPlayers(data))
                .catch(error => console.error(error));
            }
        })
        .catch(error => console.error(error));
    }

    function handleEditClick(id) {
        setFormTitle('Edit Player');
        setPlayerId(id);
        setPlayerName(players.find(player => player.id === id).name);
        setPlayerLogo(players.find(player => player.id === id).logo);
        setOpen(true);
    }

    return (
        <div className='app-home'>
            <AppHeader />
            <h1 style={{ marginTop: '80px', color: '#14083d' }}>Players</h1>
            
            {players.map(player => (
                <div key={player.id} className='player-card'>
                    <img src={player.logo} alt='player' />
                    <h2>{player.name}</h2>
                    <div className='button-group'>
                        <IconButton onClick={() => handleEditClick(player.id)}><EditIcon sx={{ color: '#b99a45' }} /></IconButton>
                        <IconButton onClick={() => handleDelete(player.id)}><DeleteIcon color='error'/></IconButton>
                    </div>
                </div>
            ))}

            {/** Add a button with matching theme to add a new player */}
            <IconButton onClick={() => handleAddClick()} sx={{ width: '50px', height: '50px', backgroundColor: '#b99a45', border: '2px solid #14083d', mt: '20px', mb: '20px' }}><AddIcon sx={{ color: '#14083d' }} /></IconButton>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <div className='dialog-content'>
                    <span style={{ color: '#14083d', fontSize: '24px' }}>{formTitle}</span>
                    <Paper component='form' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: '20px', mt: '20px', border: '2px solid #b99a45' }}>
                        <TextField value={playerName} onChange={(e) => setPlayerName(e.target.value)} label='Player Name' variant='outlined' sx={{ width: '300px', mb: '20px' }} />
                        <TextField value={playerLogo} onChange={(e) => setPlayerLogo(e.target.value)} label='Player Logo URL' variant='outlined' sx={{ width: '300px', mb: '20px' }} />
                        <Button onClick={() => handleSave()} variant='contained' sx={{ backgroundColor: '#b99a45', color: '#14083d' }}>Save</Button>
                    </Paper>
                </div>
            </Dialog>
        </div>
    );
};

export default Players;