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
import Create from './CreateComposition';
import CreateAudio from './createAudio';
import SavedMusic from './savedMusic';

export default function Navbar() {
    const navigate = useNavigate();
    const [tanpuraPlayer, setTanpuraPlayer] = useState(true);
    const [createComposition, setCreateComposition] = useState(false);
    const [createAudio, setCreateAudio] = useState(false);
    const [practice, setPractice] = useState(false);

    const handleTanpuraClick = () => {
        setTanpuraPlayer(true);
        setCreateComposition(false)
        setCreateAudio(false);
        setPractice(false);
    };
    const handleCreateCompositionClick = () => {
        setCreateComposition(true)
        setCreateAudio(false);
        setTanpuraPlayer(false);
        setPractice(false);
    };
    const handleCreateAudioClick = () => {
        setCreateComposition(false)
        setCreateAudio(true);
        setTanpuraPlayer(false);
        setPractice(false);
    };
    const handlePracticeClick = () => {
        setCreateComposition(false)
        setCreateAudio(false);
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
        if (createAudio) {
            return <CreateAudio />;
        }
        if (createComposition) {
            return <Create />;
        }
        if (practice) {
            return <SavedMusic />;
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
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
                    <ListItem onClick={handleCreateAudioClick} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Create Audio" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem onClick={handleCreateCompositionClick} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Create Composition" />
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
