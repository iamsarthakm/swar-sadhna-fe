import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import axios from 'axios';



export default function CreateAudio() {

    const [tempo, setTempo] = useState('');
    const [name, setName] = useState('');
    const [scale, setScale] = useState('');
    const [composition, setComposition] = useState('');
    const [compositionData, setCompositionData] = useState([]);

    const handleCompositionChange = (e) => {
        setComposition(e.target.value);
    };
    useEffect(() => {
        const fetchCompositions = async () => {
            const headers = {
                Authorization: window.localStorage.getItem("token")
            };
            const params = {
                // name: rhythm
            }
            try {
                console.log(window.localStorage.getItem("token"))
                const response = await axios({
                    method: 'GET',
                    url: 'http://127.0.0.1:8000/sound/composition', params: params, headers: headers
                });
                setCompositionData(response.data.data)

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchCompositions()

    }, []);


    function handleSubmit(event) {
        event.preventDefault()
        const createAudio = async (data) => {
            const headers = {
                Authorization: window.localStorage.getItem("token")
            };
            try {
                const response = await axios({
                    headers: headers,
                    method: "POST",
                    url: "http://127.0.0.1:8000/sound/",
                    data: data
                });
                console.log(response.data); // Log response for debugging
                event.preventDefault()
                return response.data
            } catch (error) {
                console.error('Error fetching audio:', error);
            }
        };

        if (scale, tempo, name, composition) {
            console.log(composition)
            let params = {
                scale: scale,
                tempo: tempo,
                name: name,
                instrument: 'harmonium',
                composition_id: composition
            }
            return createAudio(params);
        }
        return
    };
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                // ml: 10,
                width: '100%',
                '& > *': {
                    m: 1,
                },
            }}
        >
            <Typography variant="h2" gutterBottom>
                Create Compositions
            </Typography>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                '& > *': {
                    m: 1,
                },
            }}>
                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <FormControl fullWidth margin="normal">
                            <TextField id="outlined-basic" label="Name" variant="outlined" value={name}
                                onChange={(e) => setName(e.target.value)} />
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Composition</InputLabel>
                            <Select
                                value={composition}
                                onChange={handleCompositionChange}
                            >
                                {compositionData.map((composition) => (
                                    <MenuItem key={composition.id} value={composition.id}>
                                        {composition.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            label="Tempo"
                            value={tempo}
                            onChange={(e) => setTempo(e.target.value)}
                            type="number"
                            fullWidth
                            margin="normal"
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Scale</InputLabel>
                            <Select
                                value={scale}
                                onChange={(e) => setScale(e.target.value)}
                            >
                                <MenuItem value="f">F</MenuItem>
                                <MenuItem value="f_sharp">F#</MenuItem>
                                <MenuItem value="g">G</MenuItem>
                                <MenuItem value="g_sharp">G#</MenuItem>
                                <MenuItem value="a">A</MenuItem>
                                <MenuItem value="a_sharp">A#</MenuItem>
                                <MenuItem value="b">B</MenuItem>
                                <MenuItem value="c">C</MenuItem>
                                <MenuItem value="c_sharp">C#</MenuItem>
                                <MenuItem value="d">D</MenuItem>
                                <MenuItem value="d_sharp">D#</MenuItem>
                                <MenuItem value="d_sharp">E</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <Button variant="contained" color="primary" type="submit">
                        Submit
                    </Button>
                </form>
            </Box>

        </Box>
    );
}