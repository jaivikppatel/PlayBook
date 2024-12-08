import React from 'react';
import './AppHeader.css';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, IconButton, List, ListItemButton } from '@mui/material';

const AppHeader = () => {
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    return (
        <div className="app-header">
            <img src={`${process.env.PUBLIC_URL}/playbook-logo.png`} alt="logo" />
            <IconButton onClick={() => setDrawerOpen(true)} size='large'><MenuIcon sx={{ color: '#c7ae6a' }} /></IconButton>
            <Drawer anchor='right' open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <div className='drawer-content'>
                    <List sx={{ width: '100%' }}>
                        <ListItemButton>Home</ListItemButton>
                        <ListItemButton>Add Scores</ListItemButton>
                        <ListItemButton>Manage Teams</ListItemButton>
                        <ListItemButton>Manage Players</ListItemButton>
                        <ListItemButton>Manage Games</ListItemButton>
                    </List>
                </div>
            </Drawer>
        </div>
    );
};

export default AppHeader;