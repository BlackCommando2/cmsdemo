import * as React from 'react';
import { useState, useContext } from 'react';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { SocketContext } from '../../Context';
import Grid from '@mui/material/Grid';

const NavbarForm = () => {
    const { pages, setPages, updateNavBarData } = useContext(SocketContext);
    const [inputFields, setInputFields] = useState([...pages]);

    const addInputField = () => {
        setInputFields([{ title: '', url: '' }, ...inputFields]);
    };

    const deleteInputField = (index) => () => {
        const updatedInputFields = [...inputFields];
        updatedInputFields.splice(index, 1);
        setInputFields(updatedInputFields);
    };

    const updateNavbar = () => {
        setPages([...inputFields]);
        localStorage.setItem('navbar', JSON.stringify([...inputFields]));
        console.log("navbar: " + localStorage.getItem('navbar'));
        for (let i in inputFields) {
            updateNavBarData(i, inputFields[i].title, inputFields[i].url);
        }
    };

    const handleInputTitle = (index, event) => {
        const val = event.target.value;
        const updatedInputFields = [...inputFields];
        updatedInputFields[index].title = val;
        setInputFields(updatedInputFields);
    };

    const handleInputUrl = (index, event) => {
        const val = event.target.value;
        const updatedInputFields = [...inputFields];
        updatedInputFields[index].url = val;
        setInputFields(updatedInputFields);
    };

    return (
        <>
            <Container maxWidth='xl' sx={{ paddingTop: 3 }}>
                <Button variant='contained' onClick={addInputField} sx={{ width: '20%', height: '10%' }}>
                    Add Navbar
                </Button>
                <Button variant='contained' onClick={updateNavbar} sx={{ width: '20%', height: '10%', marginLeft: 21 }}>
                    Update Navbar
                </Button>
                <Grid>
                    <Grid item sx={{ paddingTop: 3, width: '33%', float: 'left' }}>
                        <Typography sx={{ paddingTop: 1 }}>Navbar Title:</Typography>
                        {inputFields.map((inputField, index) => (
                            <TextField
                                required
                                key={index}
                                value={inputField.title}
                                onChange={(e) => handleInputTitle(index, e)}
                                style={{ marginTop: '10px', paddingRight: 10, width: '100%' }}
                            />
                        ))}
                    </Grid>
                    <Typography sx={{ paddingTop: 4 }}>Navbar Url:</Typography>
                    <Grid item sx={{ paddingTop: 0, float: 'left', width: '33%' }}>
                        {inputFields.map((inputField, index) => (
                            <TextField
                                required
                                key={index}
                                value={inputField.url}
                                onChange={(e) => handleInputUrl(index, e)}
                                style={{ marginTop: '10px', paddingRight: 10, width: '100%' }}
                            />
                        ))}
                    </Grid>
                    <Grid item sx={{ marginTop: 1.5, float: 'left', width: '33%', alignContents: 'center' }}>
                        {inputFields.map((inputField, index) => (
                            <Button
                                variant='contained'
                                onClick={deleteInputField(index)}
                                sx={{ width: '70%', height: '100%', marginBottom: 3.8 }}
                            >
                                Delete
                            </Button>
                        ))}
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default NavbarForm;
