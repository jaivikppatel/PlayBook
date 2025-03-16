import React from 'react';
import './AppHeader.css';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Drawer, IconButton, List, ListItemButton, Tooltip, Menu, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RefreshIcon from '@mui/icons-material/Refresh';

const AppHeader = () => {
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);

    const [name, setName] = React.useState('');
    const [logo, setLogo] = React.useState('');

    const navigate = useNavigate();

    function handleLogout() {
        sessionStorage.removeItem('cred_code');
        sessionStorage.removeItem('name');
        sessionStorage.removeItem('admin');
        navigate('/');
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDialogClose = () => {
        setOpen(false);
    };

    const handleOpenDialoge = () => {
        setAnchorEl(null);
        setName(sessionStorage.getItem('name'));
        setLogo(sessionStorage.getItem('logo'));
        setOpen(true);
    };

    const handleChangeInfo = () => {
        let cred_code = sessionStorage.getItem('cred_code');

        fetch(`${sessionStorage.getItem('apiUrl')}/change_info`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, logo, cred_code })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
            }
            else {
                sessionStorage.setItem('name', name);
                sessionStorage.setItem('logo', logo);
                setOpen(false);
            }
        })
        .catch(error => console.error(error));
    };

    function refresh(){
        window.location.reload();
    }

    return (
        <div className="app-header">
            <img style={{ width: '120px' }} src={`${process.env.PUBLIC_URL}/playbook-logo.png`} alt="logo" />

            <div style={{ display: 'flex', flexDirection: 'row'}}> 
            <IconButton >
                <RefreshIcon onClick={() => refresh()} sx={{color:'#c7ae6a'}}/>
            </IconButton>
            
            {sessionStorage.getItem('admin') === 'true' ? <IconButton onClick={() => setDrawerOpen(true)} size='large'><MenuIcon sx={{ color: '#c7ae6a' }} /></IconButton> :
                <>{sessionStorage.getItem('cred_code') && <Tooltip title={sessionStorage.getItem('name')} arrow>
                    <img src={sessionStorage.getItem('logo')} alt='logo' onClick={(event) => handleMenu(event)} style={{ width: '60px', height: 'fit-content' }} />
                </Tooltip>}</>
            }
            </div>
            <Drawer anchor='right' open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <div className='drawer-content'>
                    <List sx={{ width: '100%' }}>
                        <ListItemButton onClick={() => navigate('/')}>Home</ListItemButton>
                        <ListItemButton onClick={() => navigate('/scores')}>Add Scores</ListItemButton>
                        <ListItemButton onClick={() => navigate('/players')}>Manage Players</ListItemButton>
                        <ListItemButton onClick={() => navigate('/games')}>Manage Games</ListItemButton>
                        <ListItemButton onClick={() => handleLogout()}>Logout</ListItemButton>
                    </List>
                </div>
            </Drawer>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <ListItemButton onClick={() => handleOpenDialoge()}>Change Name/Logo</ListItemButton>
                <ListItemButton onClick={() => handleLogout()}>Logout</ListItemButton>
            </Menu>
            <Dialog open={open} onClose={handleDialogClose}>
                <DialogTitle>Change Name/Logo</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <TextField label="Name" value={name} onChange={e => setName(e.target.value)} />
                    <TextField disabled label="Logo" value={logo} onChange={e => setLogo(e.target.value)} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Cancel</Button>
                    <Button onClick={handleChangeInfo}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AppHeader;