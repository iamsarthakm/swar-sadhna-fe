import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import '../index.css'
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
export default function Player() {
    const [scale, setScale] = useState('');
    const [rhythm, setrhythm] = useState('');
    const [scaleAudioSrc, setScaleAudioSrc] = useState('');
    const [rhythmAudioSrc, setRhythmAudioSrc] = useState('');
    const fetchAudioFiles = () => {
        // Logic to fetch audio files based on selected scale and rhythm
        // This is just a mock example, you need to replace it with your actual logic
        const scaleFile = `/audios/tanpura/${scale}.mp3`;
        let rhythmFile = null
        switch (rhythm) {
            case "teentaal":
                rhythmFile = `/audios/tabla_loops/teentaal_loop_80.mp3`
                break;
            case "dadra":
                rhythmFile = `/audios/tabla_loops/dadra_loop_120.mp3`
                break;
            case "kehrva":
                rhythmFile = `/audios/tabla_loops/kehrva_loop_160.mp3`
                break;
            default:

        }


        setScaleAudioSrc(scaleFile);
        setRhythmAudioSrc(rhythmFile);
        console.log(scaleFile)
    };

    // Call fetchAudioFiles whenever scale or rhythm changes
    React.useEffect(() => {
        fetchAudioFiles();
    }, [scale, rhythm]);
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
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

                            </Select>
                        </FormControl>
                    ]}
                    showSkipControls={false}
                    showJumpControls={false}
                />
            </div>
            <div className='custom-audio-player'>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                        Tabla
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {rhythm}
                    </Typography>
                </CardContent>
                <AudioPlayer
                    autoPlay={false}
                    loop={true}
                    src={rhythmAudioSrc}
                    autoPlayAfterSrcChange={false}
                    onPlay={e => console.log("onPlay")}
                    customProgressBarSection={[]}
                    customAdditionalControls={[
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Taal</InputLabel>
                            <Select
                                value={rhythm}
                                onChange={(e) => setrhythm(e.target.value)}
                                sx={{
                                    width: '63%'

                                }}
                            >
                                <MenuItem value="teentaal">Teentaal</MenuItem>
                                <MenuItem value="kehrva">Kehrva</MenuItem>
                                <MenuItem value="dadra">Dadra</MenuItem>
                            </Select>
                        </FormControl>
                    ]}
                    showSkipControls={false}
                    showJumpControls={false}
                    speed={4}
                />
            </div>
        </Box >
    )
}

