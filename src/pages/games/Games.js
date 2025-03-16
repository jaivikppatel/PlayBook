import React, { useEffect } from 'react';
import AppHeader from '../../components/header/AppHeader';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Dialog, IconButton, Paper, Typography, TextField, Button } from '@mui/material';

const Games = () => {
    const [matches, setMatches] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [formTitle, setFormTitle] = React.useState('');
    const [matchId, setMatchId] = React.useState(null);
    const [matchName, setMatchName] = React.useState('');
    const [matchNumber, setMatchNumber] = React.useState(null); // must be a number

    useEffect(() => {
        fetch(`${sessionStorage.getItem('apiUrl')}/get_matches`)
            .then(response => response.json())
            .then(data => setMatches(data))
            .catch(error => console.error(error));
    }, []);

    function handleAddClick() {
        setFormTitle('Add Match');
        setOpen(true);
    }

    function handleSave() {
        if (formTitle === 'Add Match') {
            fetch(`${sessionStorage.getItem('apiUrl')}/add_match`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ match_number: matchNumber, name: matchName })
            })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    setMatchNumber(null);
                    setMatchName('');
                    setOpen(false);
                    fetch(`${sessionStorage.getItem('apiUrl')}/get_matches`)
                    .then(response => response.json())
                    .then(data => setMatches(data))
                    .catch(error => console.error(error));
                }
            })
            .catch(error => console.error(error));
        }
        else if (formTitle === 'Edit Match') {
            fetch(`${sessionStorage.getItem('apiUrl')}/update_match/${matchId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ match_number: matchNumber, name: matchName })
            })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    setMatchNumber(null);
                    setMatchName('');
                    setOpen(false);
                    fetch(`${sessionStorage.getItem('apiUrl')}/get_matches`)
                    .then(response => response.json())
                    .then(data => setMatches(data))
                    .catch(error => console.error(error));
                }
            })
            .catch(error => console.error(error));
        }
    }

    function handleDelete(id) {
        fetch(`${sessionStorage.getItem('apiUrl')}/delete_match/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                fetch(`${sessionStorage.getItem('apiUrl')}/get_matches`)
                .then(response => response.json())
                .then(data => setMatches(data))
                .catch(error => console.error(error));
            }
        })
        .catch(error => console.error(error));
    }

    function handleEditClick(id) {
        setFormTitle('Edit Match');
        setMatchId(id);
        setMatchNumber(matches.find(match => match.id === id).match_number);
        setMatchName(matches.find(match => match.id === id).name);
        setOpen(true);
    }

    return (
        <div className='app-home'>
            <AppHeader />
            <h1 style={{ marginTop: '80px', color: '#14083d' }}>Games</h1>
            
            {matches.map(match => (
                <div key={match.id} className='player-card'>
                    <h2>{match.match_number}:</h2> &nbsp;&nbsp;&nbsp;
                    <h2>{match.name}</h2>
                    <div className='button-group'>
                        <IconButton onClick={() => handleEditClick(match.id)}><EditIcon sx={{ color: '#b99a45' }} /></IconButton>
                        <IconButton onClick={() => handleDelete(match.id)}><DeleteIcon color='error'/></IconButton>
                    </div>
                </div>
            ))}

            {/** Add a button with matching theme to add a new player */}
            <IconButton onClick={() => handleAddClick()} sx={{ width: '50px', height: '50px', backgroundColor: '#b99a45', border: '2px solid #14083d', mt: '20px', mb: '20px' }}><AddIcon sx={{ color: '#14083d' }} /></IconButton>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <div className='dialog-content'>
                    <span style={{ color: '#14083d', fontSize: '24px' }}>{formTitle}</span>
                    <Paper component='form' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: '20px', mt: '20px', border: '2px solid #b99a45' }}>
                        <TextField value={matchNumber} onChange={(e) => setMatchNumber(e.target.value)} label='Match Number' variant='outlined' sx={{ width: '300px', mb: '20px' }} />
                        <TextField value={matchName} onChange={(e) => setMatchName(e.target.value)} label='Match Name' variant='outlined' sx={{ width: '300px', mb: '20px' }} />
                        <Button onClick={() => handleSave()} variant='contained' sx={{ backgroundColor: '#b99a45', color: '#14083d' }}>Save</Button>
                    </Paper>
                </div>
            </Dialog>
        </div>
    );
};

export default Games;
