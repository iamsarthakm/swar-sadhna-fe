import * as React from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
export default function SavedMusic() {
    const [data, setData] = React.useState([]);
    const [audioState, setAudioState] = React.useState({ url: null, playing: false, audio: null });

    React.useEffect(() => {
        // Fetch data from API

        const headers = {
            // Your parameters here
            
            Authorization: window.localStorage.getItem("token"),
            // param2: 'value2',
        };

        axios.get('http://127.0.0.1:8000/sound/', { headers })
            .then(response => {
                console.log(response)
                setData(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const playAudio = (url) => {
        if (audioState.audio) {
            // Pause the currently playing audio before starting a new one
            audioState.audio.pause();
        }
        const audio = new Audio(url);
        audio.loop = true; // Set loop attribute to true
        audio.play();
        setAudioState({ url, playing: true, audio: audio });
    };

    const pauseAudio = (audio) => {
        // const audio = new Audio();
        audio.pause();
        setAudioState({ ...audioState, playing: false, audio: null });
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: ' 100%' }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="middle">Name</TableCell>
                        <TableCell align="middle">Scale</TableCell>
                        <TableCell align="middle">Tempo</TableCell>
                        <TableCell align="middle">Rhythm</TableCell>
                        <TableCell align="middle">Play/Pause</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow
                            key={row.name}
                        >

                            <TableCell align="middle">{row.name}</TableCell>
                            <TableCell align="middle">{row.scale}</TableCell>
                            <TableCell align="middle">{row.tempo}</TableCell>
                            <TableCell align="middle">{row.rhythm}</TableCell>
                            <TableCell align="middle">
                                {audioState.playing && audioState.url === row.presigned_url ? (
                                    <PauseCircleOutlineIcon onClick={() => pauseAudio(audioState.audio)} />
                                ) : (
                                    <PlayCircleOutlineIcon onClick={() => playAudio(row.presigned_url)} />
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
