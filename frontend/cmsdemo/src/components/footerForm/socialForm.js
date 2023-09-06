import * as React from 'react';
import { useState, useContext } from 'react';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { SocketContext } from '../../Context';
import Grid from '@mui/material/Grid';

const SocialForm = () => {
    const { sociallinks, setSociallinks, updateSociallink } = useContext(SocketContext);
    const [inputFields, setInputFields] = useState([...sociallinks]);

    const addInputField = () => {
        setInputFields([{ icon: '', url: '' }, ...inputFields]);
    };

    const deleteInputField = (index) => () => {
        const updatedInputFields = [...inputFields];
        updatedInputFields.splice(index, 1);
        setInputFields(updatedInputFields);
    };

    const updateSocial = () => {
        setSociallinks([...inputFields]);
        localStorage.setItem('social', JSON.stringify([...inputFields]));
        console.log("social: " + localStorage.getItem('social'));
        for (let i in inputFields) {
            updateSociallink(i, inputFields[i].icon, inputFields[i].url);
        }
    };

    const handleInputIcon = (index, event) => {
        const val = event.target.value;
        const updatedInputFields = [...inputFields];
        updatedInputFields[index].icon = val;
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
                <Button variant='contained' onClick={() => addInputField()} sx={{ width: '20%', height: '10%' }}>
                    Add Social
                </Button>
                <Button variant='contained' onClick={() => updateSocial()} sx={{ width: '20%', height: '10%', marginLeft: 20 }}>
                    Update Social
                </Button>
                <Grid>
                    <Grid item sx={{ paddingTop: 3, width: '33%', float: 'left' }}>
                        <Typography sx={{ paddingTop: 1 }}>Social Icon Link:</Typography>
                        {inputFields.map((inputField, index) => (
                            <TextField
                                required
                                key={index}
                                value={inputField.icon}
                                onChange={(e) => handleInputIcon(index, e)}
                                style={{ marginTop: '10px', paddingRight: 10, width: '100%' }}
                            />
                        ))}
                    </Grid>
                    <Typography sx={{ paddingTop: 4 }}>Social Url:</Typography>
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

export default SocialForm;