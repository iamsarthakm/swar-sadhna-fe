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
import Form from './Form'
import { TextField, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import SheetMusic from './SheetMusic';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import qs from 'qs';
const buttons = [
    { label: "Sa", value: "sa_s" },
    // { label: "Re(k)", value: "re_k" },
    { label: "Re", value: "re_s" },
    // { label: "Ga(k)", value: "ga_k" },
    { label: "Ga", value: "ga_s" },
    { label: "Ma(t)", value: "ma_t" },
    { label: "Ma", value: "ma_s" },
    { label: "Pa", value: "pa_s" },
    { label: "Dha(K)", value: "da_k" },
    { label: "Dha", value: "da_s" },
    { label: "Ni(K)", value: "ni_k" },
    { label: "Ni", value: "ni_s" },
];


export default function Create() {
    const [selectedValues, setSelectedValues] = useState([]);
    const [taal, setTaal] = useState([]);
    const [tempo, setTempo] = useState('');
    const [name, setName] = useState('');
    const [scale, setScale] = useState('');
    const [gun, setGun] = useState('igun');
    const [rhythm, setrhythm] = useState('');
    const [start, setStart] = useState(1);
    let tempSelectedValues = []
    const handleButtonClick = (value, octave) => {
        const prefixedValue = `${octave}_${value}`;

        console.log(gun)
        switch (gun) {
            case 'igun':
                tempSelectedValues.push(prefixedValue)
                if (tempSelectedValues.length === 1) {
                    console.log("in")
                    setSelectedValues(prevSelectedValues => [...prevSelectedValues, tempSelectedValues]);
                    tempSelectedValues = []
                }
                break;
            case 'dugun':
                tempSelectedValues.push(prefixedValue)
                if (tempSelectedValues.length === 2) {
                    console.log("in")
                    setSelectedValues(prevSelectedValues => [...prevSelectedValues, tempSelectedValues]);
                    tempSelectedValues = []

                }
                break;
            case 'tigun':
                tempSelectedValues.push(prefixedValue)
                if (tempSelectedValues.length === 3) {
                    console.log("in")
                    setSelectedValues(prevSelectedValues => [...prevSelectedValues, tempSelectedValues]);
                    tempSelectedValues = []
                }
                break;
            case 'chaugun':
                tempSelectedValues.push(prefixedValue)
                if (tempSelectedValues.length === 4) {
                    console.log("in")
                    setSelectedValues(prevSelectedValues => [...prevSelectedValues, tempSelectedValues]);
                    tempSelectedValues = []
                }
                break;
            default:
                break;
        }
    };
    const handleRemoveNote = () => {
        setSelectedValues(prevArray => prevArray.slice(0, -1));
    };

    useEffect(() => {
        console.log("tempSelectedValues length:", selectedValues);

        if (tempSelectedValues.length === 1) {
            console.log("in");
            setSelectedValues(prevSelectedValues => [...prevSelectedValues, tempSelectedValues]);
        }
    }, [selectedValues]);

    useEffect(() => {
        const fetchTaal = async () => {
            const headers = {
                Authorization: window.localStorage.getItem("token")
            };
            const params = {
                name: rhythm
            }
            try {
                console.log(window.localStorage.getItem("token"))
                const response = await axios({
                    method: 'GET',
                    url: 'http://127.0.0.1:8000/sounds/taal', params: params, headers: headers
                });
                setTaal(response.data)

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (rhythm) {
            fetchTaal();
        }

        // return () => {
        //     // Cleanup function if needed
        // };
    }, [rhythm]);

    function getCircularIndex(arr, index) {
        // Ensure index is within the bounds of the arr
        if (arr.length === 0) {
            return -1; // Handle empty arr case
        }
        console.log("length is", arr.length, "index is ", index, (index % (arr.length - 1)), "the value is ", arr[index % (arr.length - 1)])
        return ((index % arr.length) + arr.length) % arr.length;
    }
    function handleSubmit(event) {
        event.preventDefault()
        console.log(selectedValues, start, scale, tempo)
        const fetchAudio = async (data) => {
            const headers = {
                Authorization: window.localStorage.getItem("token")
            };
            try {
                const response = await axios({
                    headers: headers,
                    method: "POST",
                    url: "http://127.0.0.1:8000/sounds/",
                    data: data
                });
                console.log(response.data); // Log response for debugging
                event.preventDefault()
                return response.data
            } catch (error) {
                console.error('Error fetching audio:', error);
            }
        };

        if (start, scale, tempo, selectedValues, taal, name) {
            let main_comp = []
            for (let i = 0; i < start - 1; i++) {
                main_comp.push({ "beat_name": taal[i], "notes": [""] })
            }
            let instart = Number(start)
            console.log(main_comp)
            for (let i = 0; i < selectedValues.length; i++) {
                console.log(i, start, i + instart - 1)
                main_comp.push({ "beat_name": taal[getCircularIndex(taal, i + instart - 1)], "notes": selectedValues[i] })
            }
            console.log(main_comp)

            let params = {
                scale: scale,
                tempo: tempo,
                instrument: "harmonium",
                rhythm: rhythm,
                name: name,
                sheet_composition: main_comp
            }
            return fetchAudio(params);
        }
        return
    };
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                ml: 10,
                '& > *': {
                    m: 1,
                },
            }}
        >
            <Typography variant="h2" gutterBottom>
                Create Compositions
            </Typography>
            <Grid>
                <Box>
                    <Grid container
                        direction="row" sm={12}
                        justifyContent="flex-end">
                        <Box sx={{
                            // display: 'flex',
                            // flexDirection: 'row',
                            // alignItems: 'center',
                            // justifyContent: 'flex-end',
                            '& > *': {
                                ml: 1,
                            },
                        }}>
                            {/* <Button>Higher Octave</Button> */}
                            <ButtonGroup size="large" aria-label="Large button group">
                                {buttons.slice(0, 5).map(({ label, value }) => (
                                    <Button key={value} onClick={() => handleButtonClick(value, "h")}>{label}</Button>
                                ))}
                            </ButtonGroup>
                        </Box>
                    </Grid>
                    <Grid
                        container
                        direction="row" sm={11}
                        justifyContent="flex-end">

                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            '& > *': {
                                m: 1,
                            },
                        }}>
                            {/* <Button>Middle Octave</Button> */}
                            <ButtonGroup size="large" aria-label="Large button group">
                                {buttons.map(({ label, value }) => (
                                    <Button key={value} onClick={() => handleButtonClick(value, "m")}>{label}</Button>
                                ))}
                            </ButtonGroup>
                        </Box>
                    </Grid>
                    <Grid
                        container
                        direction="row" sm={1}
                        justifyContent="flex-end"
                    >
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                            justifyContent: 'flex-start',
                            '& > *': {
                                m: 1,
                            },
                        }}>
                            {/* <Button>Lower Octave</Button> */}
                            <ButtonGroup size="large" aria-label="Large button group">
                                {buttons.slice(7, 12).map(({ label, value }) => (
                                    <Button key={value} onClick={() => handleButtonClick(value, "l")}>{label}</Button>
                                ))}
                            </ButtonGroup>
                        </Box>
                    </Grid>
                </Box>
            </Grid>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                '& > *': {
                    m: 1,
                },
            }}>
                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
                        <Button fullWidth sx={{ height: 55, marginTop: 2 }} onClick={() => handleRemoveNote()}>Remove prev note</Button>
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
                        <FormControl fullWidth margin="normal">
                            <TextField id="outlined-basic" label="Name" variant="outlined" value={name}
                                onChange={(e) => setName(e.target.value)} />
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Taal</InputLabel>
                            <Select
                                value={rhythm}
                                onChange={(e) => setrhythm(e.target.value)}
                            >
                                <MenuItem value="teentaal">Teentaal</MenuItem>
                                <MenuItem value="kehrva">Kehrva</MenuItem>
                                <MenuItem value="dadra">Dadra</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Start</InputLabel>
                            <Select
                                value={start}
                                onChange={(e) => setStart(e.target.value)}
                            >
                                <MenuItem value="1">1</MenuItem>
                                <MenuItem value="2">2</MenuItem>
                                <MenuItem value="3">3</MenuItem>
                                <MenuItem value="4">4</MenuItem>
                                <MenuItem value="5">5</MenuItem>
                                <MenuItem value="6">6</MenuItem>
                                <MenuItem value="7">7</MenuItem>
                                <MenuItem value="8">8</MenuItem>
                                <MenuItem value="9">9</MenuItem>
                                <MenuItem value="10">10</MenuItem>
                                <MenuItem value="11">11</MenuItem>
                                <MenuItem value="12">12</MenuItem>
                                <MenuItem value="13">13</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl component="fieldset" fullWidth margin="normal">
                            <RadioGroup value={gun} onChange={(e) => setGun(e.target.value)}>
                                <FormControlLabel value="igun" control={<Radio />} label="Igun" />
                                <FormControlLabel value="dugun" control={<Radio />} label="Dugun" />
                                <FormControlLabel value="tigun" control={<Radio />} label="Tigun" />
                                <FormControlLabel value="chaugun" control={<Radio />} label="Chaugun" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <Button variant="contained" color="primary" type="submit">
                        Submit
                    </Button>
                </form>
            </Box>
            <SheetMusic taal={taal} composition={selectedValues} start={start} />

        </Box>
    );
}