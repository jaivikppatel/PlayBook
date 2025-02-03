import React from 'react';
import './AppHeader.css';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Drawer, IconButton, List, ListItemButton, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AppHeader = () => {
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const navigate = useNavigate();

    return (
        <div className="app-header">
            <img style={{ width: '120px' }} src={`${process.env.PUBLIC_URL}/playbook-logo.png`} alt="logo" />
            {sessionStorage.getItem('admin') === 'true' ? <IconButton onClick={() => setDrawerOpen(true)} size='large'><MenuIcon sx={{ color: '#c7ae6a' }} /></IconButton> :
                <>{sessionStorage.getItem('cred_code') && <Tooltip title={sessionStorage.getItem('name')} arrow>
                    <Avatar sx={{ bgcolor: '#c7ae6a', mr: '9px' }}>{sessionStorage.getItem('name')?.charAt(0).toUpperCase()}</Avatar>
                </Tooltip>}</>
            }
            <Drawer anchor='right' open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <div className='drawer-content'>
                    <List sx={{ width: '100%' }}>
                        <ListItemButton onClick={() => navigate('/')}>Home</ListItemButton>
                        <ListItemButton onClick={() => navigate('/scores')}>Add Scores</ListItemButton>
                        <ListItemButton onClick={() => navigate('/players')}>Manage Players</ListItemButton>
                        <ListItemButton onClick={() => navigate('/games')}>Manage Games</ListItemButton>
                    </List>
                </div>
            </Drawer>
        </div>
    );
};

export default AppHeader;