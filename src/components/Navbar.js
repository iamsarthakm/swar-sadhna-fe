import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import Player from './MusicPlayer';
import Create from './Create';
import SavedMusic from './savedMusic';

export default function Navbar() {
    const navigate = useNavigate();
    const [tanpuraPlayer, setTanpuraPlayer] = useState(true);
    const [create, setCreate] = useState(false);
    const [practice, setPractice] = useState(false);

    const handleTanpuraClick = () => {
        setTanpuraPlayer(true);
        setCreate(false);
        setPractice(false);
    };
    const handleCreateClick = () => {
        setCreate(true);
        setTanpuraPlayer(false);
        setPractice(false);
    };
    const handlePracticeClick = () => {
        setCreate(false);
        setTanpuraPlayer(false);
        setPractice(true);
    };
    const handleLogout = () => {
        console.log("hehehehehehehe");
        let token = window.localStorage.getItem("token");
        console.log(token);
        window.localStorage.setItem("token", null);
        console.log(token);
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
        <Box sx={{ display: 'flex', flexDirection: 'column'}}>
            <CssBaseline />
            <Box
                sx={{
                    width: '70%',
                    mx: 'auto', // Center the Box horizontally
                    mt: 2, // Top margin for gap
                    p: 1,
                    borderRadius: 2,
                    bgcolor: 'background.paper',
                    boxShadow: 3,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 3 }}>
                    Swar Saadhna
                </Typography>
                <List sx={{ display: 'flex', flexDirection: 'row', padding: 0 }}>
                    <ListItem onClick={handleTanpuraClick} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Tanpura" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem onClick={handleCreateClick} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Create" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem onClick={handlePracticeClick} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Practice" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem onClick={handleLogout} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItemButton>
                    </ListItem>
                </List>
                {/* <Button variant="outlined" onClick={handleLogout}>Log out</Button> */}
            </Box>
            <Box
                sx={{
                    // width: '70%',
                    mx: 'auto', 
                    mt: 2, 
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                {renderSelectedComponent()}
            </Box>
        </Box>
    );
}
