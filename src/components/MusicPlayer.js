import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import '../index.css';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { useState, useRef, useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { TextField, RadioGroup, FormControlLabel, Radio } from '@mui/material';

export default function Player() {
    const [scale, setScale] = useState('');
    const [rhythm, setRhythm] = useState('');
    const [scaleAudioSrc, setScaleAudioSrc] = useState('');
    const [rhythmAudioSrc, setRhythmAudioSrc] = useState('');
    const [playbackSpeed, setPlaybackSpeed] = useState(1.0); // State for playback speed

    const scaleAudioRef = useRef();
    const rhythmAudioRef = useRef();
    const [inputBpm, setInputBpm] = useState(80); // Assuming 80 BPM is the default original BPM
    const originalBpm = 80;


    const handleBpmChange = (e) => {
        const value = e.target.value;
        setInputBpm(value);

        if (value === '' || isNaN(parseFloat(value))) {
            console.error("Invalid BPM value:", value);
            return;
        }

        const newBpm = parseFloat(value);
        if (newBpm > 0) {
            const newPlaybackSpeed = newBpm / originalBpm;
            // Ensure the playback speed is within the supported range
            const clampedPlaybackSpeed = Math.min(Math.max(newPlaybackSpeed, 0.5), 6.0);
            console.log(clampedPlaybackSpeed)
            setPlaybackSpeed(clampedPlaybackSpeed);
        }
    };


    const fetchAudioFiles = () => {
        // Logic to fetch audio files based on selected scale and rhythm
        // This is just a mock example, you need to replace it with your actual logic
        const scaleFile = `/audios/tanpura/${scale}.mp3`;
        let rhythmFile = null;
        switch (rhythm) {
            case "teentaal":
                rhythmFile = `/audios/tabla_loops/teentaal_80.mp3`;
                break;
            case "dadra":
                rhythmFile = `/audios/tabla_loops/dadra_80.mp3`;
                break;
            case "kehrva":
                rhythmFile = `/audios/tabla_loops/kehrva_80.mp3`;
                break;
            default:
        }
        setScaleAudioSrc(scaleFile);
        setRhythmAudioSrc(rhythmFile);
        console.log(scaleFile);
    };

    // Call fetchAudioFiles whenever scale or rhythm changes
    useEffect(() => {
        fetchAudioFiles();
    }, [scale, rhythm]);

    // Update playback speed
    useEffect(() => {
        if (rhythmAudioRef.current?.audio?.current) {
            const clampedPlaybackSpeed = Math.min(Math.max(playbackSpeed, 0.5), 6.0);
            if (isNaN(clampedPlaybackSpeed) || !isFinite(clampedPlaybackSpeed)) {
                console.error("Invalid playback speed:", clampedPlaybackSpeed);
                return;
            }
            rhythmAudioRef.current.audio.current.playbackRate = clampedPlaybackSpeed;
        }
    }, [rhythmAudioSrc, playbackSpeed]);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '600px',
            '& > *': {
                m: 1,
            },
        }}>
            <div className='custom-audio-player'>
                <CardContent sx={{ flex: '1 0 column' }}>
                    <Typography component="div" variant="h5">
                        Tanpura
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {scale.toUpperCase()} Scale
                    </Typography>
                </CardContent>
                <AudioPlayer
                    autoPlay={false}
                    loop={true}
                    src={scaleAudioSrc}
                    autoPlayAfterSrcChange={false}
                    onPlay={e => console.log("onPlay")}
                    // showSkipControls={false}
                    customProgressBarSection={[]}
                    customAdditionalControls={[
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Scale</InputLabel>
                            <Select
                                value={scale}
                                onChange={(e) => setScale(e.target.value)}
                                sx={{
                                    width: '70%'
                                }}
                            >
                                <MenuItem value="g">G</MenuItem>
                                <MenuItem value="g_sharp">G#</MenuItem>
                                <MenuItem value="a">A</MenuItem>
                                <MenuItem value="a_sharp">A#</MenuItem>
                                <MenuItem value="b">B</MenuItem>
                                <MenuItem value="c">C</MenuItem>
                                <MenuItem value="c_sharp">C#</MenuItem>
                                <MenuItem value="d">D</MenuItem>
                                <MenuItem value="d_sharp">D#</MenuItem>
                                <MenuItem value="e">E</MenuItem>
                                <MenuItem value="f">F</MenuItem>
                                <MenuItem value="f_sharp">F#</MenuItem>
                            </Select>
                        </FormControl>
                    ]}
                    showSkipControls={false}
                    showJumpControls={false}
                />
            </div>
            <div className='custom-audio-player'>
                <Box sx={{
                    display: 'flex',
                    // flexDirection: 'row',
                    justifyContent: 'space-between'
                    // alignItems: 'center'
                }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h5">
                            Tabla
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            {rhythm}
                        </Typography>
                    </CardContent>
                    <FormControl fullWidth margin="normal" key="rhythm-select" sx={{
                        ml: 20,
                        mb: 2
                    }}>
                        <InputLabel>Taal</InputLabel>
                        <Select
                            value={rhythm}
                            onChange={(e) => setRhythm(e.target.value)}
                            sx={{
                                width: '80%',
                            }}
                        >
                            <MenuItem value="teentaal">Teentaal</MenuItem>
                            <MenuItem value="kehrva">Kehrva</MenuItem>
                            <MenuItem value="dadra">Dadra</MenuItem>
                        </Select>
                    </FormControl>

                </Box>
                <Box sx={{
                    display: 'flex', alignItems: 'center', gap: '1rem'
                }}>
                    <AudioPlayer
                        autoPlay={false}
                        loop={true}
                        src={rhythmAudioSrc}
                        autoPlayAfterSrcChange={true}
                        onPlay={e => console.log("onPlay")}
                        ref={rhythmAudioRef}
                        customProgressBarSection={[]}
                        customAdditionalControls={[
                            <FormControl fullWidth={false} margin='normal'>
                                <TextField
                                    label="Tempo"
                                    type="number"
                                    value={inputBpm}
                                    onChange={handleBpmChange}
                                    margin="normal"
                                    sx={{
                                        width: '65px'
                                    }}
                                />
                            </FormControl>
                        ]}
                        showSkipControls={false}
                        showJumpControls={false}
                    />
                </Box>
            </div>
        </Box>
    );
}
