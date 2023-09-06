import * as React from 'react';
import { useState, useContext } from 'react';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { SocketContext } from '../../Context';
import Grid from '@mui/material/Grid';

const NavbarForm = () => {
    const { slides, setSlides, updateCardData } = useContext(SocketContext);
    const [inputFieldSlide, setInputFieldSlide] = useState([...slides]);
    const addInputField = () => {
        setInputFieldSlide([{ imageSrc: '', buttonText: '', url: '' }, ...inputFieldSlide]);
    };

    const deleteInputFieldSlide = (index) => () => {
        const updatedInputFields = [...inputFieldSlide];
        updatedInputFields.splice(index, 1);
        setInputFieldSlide(updatedInputFields);
    };

    const updateSlides = () => {
        setSlides([...inputFieldSlide]);
        localStorage.setItem('slides', JSON.stringify([...inputFieldSlide]));
        console.log("slides: " + localStorage.getItem('slides'));
        for (let i in inputFieldSlide) {
            // console.log(i, inputFieldSlide[i].imageSrc, inputFieldSlide[i].buttonText, inputFieldSlide[i].url);
            updateCardData(i, inputFieldSlide[i].imageSrc, inputFieldSlide[i].buttonText, inputFieldSlide[i].url);
        }
    };

    const handleInputSlideTitle = (index, event) => {
        const val = event.target.value;
        const updatedInputFields = [...inputFieldSlide];
        updatedInputFields[index].title = val;
        setInputFieldSlide(updatedInputFields);
    };

    const handleInputSlideButtonText = (index, event) => {
        const val = event.target.value;
        const updatedInputFields = [...inputFieldSlide];
        updatedInputFields[index].buttonText = val;
        setInputFieldSlide(updatedInputFields);
    };

    const handleInputSlideUrl = (index, event) => {
        const val = event.target.value;
        const updatedInputFields = [...inputFieldSlide];
        updatedInputFields[index].url = val;
        setInputFieldSlide(updatedInputFields);
    };

    return (
        <>
            <Container maxWidth="xl" sx={{ paddingTop: 3, width: '100%', }}>
                <Button variant='contained' onClick={() => addInputField()} sx={{ width: '20%', height: '10%' }}>
                    Add Card
                </Button>
                <Button variant='contained' onClick={() => updateSlides()} sx={{ width: '20%', height: '10%', marginLeft: 21 }}>
                    Update Cards
                </Button>
                <Grid>
                    <Grid item sx={{ paddingTop: 3, width: '25%', float: 'left' }}>
                        <Typography sx={{ paddingTop: 1 }}>Card Image:</Typography>
                        {inputFieldSlide.map((inputField, index) => (
                            <TextField
                                required
                                key={index}
                                value={inputField.imageSrc}
                                onChange={(e) => handleInputSlideTitle(index, e)}
                                style={{ marginTop: '10px', paddingRight: 10, width: '100%' }}
                            />
                        ))}
                    </Grid>
                    <Grid item sx={{ paddingTop: 3, width: '25%', float: 'left' }}>
                        <Typography sx={{ paddingTop: 1 }}>Card Button Text:</Typography>
                        {inputFieldSlide.map((inputField, index) => (
                            <TextField
                                required
                                key={index}
                                value={inputField.buttonText}
                                onChange={(e) => handleInputSlideButtonText(index, e)}
                                style={{ marginTop: '10px', paddingRight: 10, width: '100%' }}
                            />
                        ))}
                    </Grid>
                    <Typography sx={{ paddingTop: 4 }}>Card Url:</Typography>
                    <Grid item sx={{ paddingTop: 0, float: 'left', width: '25%' }}>
                        {inputFieldSlide.map((inputField, index) => (
                            <TextField
                                required
                                key={index}
                                value={inputField.url}
                                onChange={(e) => handleInputSlideUrl(index, e)}
                                style={{ marginTop: '10px', paddingRight: 10, width: '100%' }}
                            />
                        ))}
                    </Grid>
                    <Grid item sx={{ marginTop: 1.5, float: 'left', width: '25%', alignContents: 'center' }}>
                        {inputFieldSlide.map((inputField, index) => (
                            <Button
                                variant='contained'
                                onClick={deleteInputFieldSlide(index)}
                                sx={{ width: '100%', height: '100%', marginBottom: 3.8 }}
                            >
                                Delete
                            </Button>
                        ))}
                    </Grid>
                </Grid>
            </Container >
        </>
    );
};

export default NavbarForm;
