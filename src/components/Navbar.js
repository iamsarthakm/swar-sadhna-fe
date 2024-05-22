import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Player from './MusicPlayer';
import Create from './Create';
import { useState, useEffect } from 'react';
import SheetMusic from './SheetMusic';
import SavedMusic from './savedMusic'
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
const drawerWidth = 240;


export default function Navbar() {
    const navigate = useNavigate();
    const [tanpuraPlayer, setTanpuraPlayer] = useState(true); // State to track selected item
    const [create, setCreate] = useState(false); // State to track selected item
    const [practice, setPractice] = useState(false);

    const handleTanpuraClick = () => {
        setTanpuraPlayer(true);
        setCreate(false);
        setPractice(false)
    };
    const handleCreateClick = () => {
        setCreate(true);
        setTanpuraPlayer(false)
        setPractice(false)
    };
    const handlePracticeClick = () => {
        setCreate(false);
        setTanpuraPlayer(false)
        setPractice(true)
    };
    function handleLogout() {

        console.log("hehehehehehehe");
        let token = window.localStorage.getItem("token")
        console.log(token)
        window.localStorage.setItem("token", null)
        console.log(token)
        navigate('/login');
    };

    const renderSelectedComponent = () => {
        if (tanpuraPlayer) {
            return <Player />;
        }
        if (create) {
            return <Create />;
        }
        if (practice) {
            return <SavedMusic />;
        }
    };
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Swar Saadhna
                    </Typography>
                    <Button variant="contained" onClick={() => handleLogout()}>Log out</Button>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>

                        <ListItem onClick={() => handleTanpuraClick()} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                <ListItemText primary="Tanpura" />
                            </ListItemButton>
                        </ListItem>

                        <ListItem onClick={() => handleCreateClick()} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                <ListItemText primary="Create" />
                            </ListItemButton>
                        </ListItem>

                        <ListItem onClick={() => handlePracticeClick()} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                <ListItemText primary="Practice" />
                            </ListItemButton>
                        </ListItem>

                    </List>



                </Box>
            </Drawer>
            <Box
                height={900}
                width={600}
                my={10}
                display="flex"
                // alignItems="up"
                gap={4}
                p={2}
            >
                {renderSelectedComponent()}
            </Box>
        </Box>
    );
}