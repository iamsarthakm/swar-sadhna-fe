import React, { useState } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';

function Form() {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [education, setEducation] = useState('');
    const [rhythm, setrhythm] = useState('');


    const handleSubmit = (event) => {
    };

    return (
        <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
                <Button fullWidth sx={{ height: 55, marginTop: 2 }}>Remove prev note</Button>
                <TextField
                    label="Tempo"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    type="number"
                    fullWidth
                    margin="normal"
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Scale</InputLabel>
                    <Select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
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
                    <InputLabel>Taal</InputLabel>
                    <Select
                        value={rhythm}
                        onChange={(e) => setrhythm(e.target.value)}
                    >
                        <MenuItem value="f">Teentaal</MenuItem>
                        <MenuItem value="f_sharp">Kehrva</MenuItem>
                        <MenuItem value="g">Dadra</MenuItem>
                    </Select>
                </FormControl>
                <FormControl component="fieldset" fullWidth margin="normal">
                    <RadioGroup value={education} onChange={(e) => setEducation(e.target.value)}>
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
    );
}

export default Form;
