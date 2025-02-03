import React from 'react';
import './AppHeader.css';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, IconButton, List, ListItemButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AppHeader = () => {
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const navigate = useNavigate();

    return (
        <div className="app-header">
            <img src={`${process.env.PUBLIC_URL}/playbook-logo.png`} alt="logo" />
            <IconButton onClick={() => setDrawerOpen(true)} size='large'><MenuIcon sx={{ color: '#c7ae6a' }} /></IconButton>
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