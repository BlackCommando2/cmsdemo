import * as React from 'react';
import { useState, useContext } from 'react';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { SocketContext } from '../../Context';
import Grid from '@mui/material/Grid';

const DescriptionForm = () => {
    const { contact, setContact, email, setEmail, updateFooter, description } = useContext(SocketContext);
    const [inputFields, setInputFields] = useState(contact);
    const [inputFieldMail, setInputFieldMail] = useState(email);

    const handleInputPhone = (event) => {
        const val = event.target.value;
        setInputFields(val);
    };

    const handleInputMail = (event) => {
        const val = event.target.value;
        setInputFieldMail(val);
    };

    const updateContact = () => {
        setContact(inputFields);
        localStorage.setItem('contact', inputFields);
        setEmail(inputFieldMail);
        localStorage.setItem('email', inputFieldMail);
        updateFooter(description, inputFields, inputFieldMail);
    };


    return (
        <>
            <Container maxWidth="xl" sx={{ paddingTop: 3 }}>
                <Button variant='contained' onClick={updateContact} sx={{ width: '20%', height: '10%' }}>
                    Update Contact Info
                </Button>
                <Grid>
                    <Grid item sx={{ paddingTop: 3, width: '100%' }}>
                        <Typography sx={{ paddingTop: 1 }}>Contact:</Typography>
                        <TextField
                            required
                            multiline
                            value={inputFields}
                            onChange={(e) => handleInputPhone(e)}
                            style={{ marginTop: '10px', paddingRight: 10, width: '100%' }}
                        />
                    </Grid>
                    <Grid item sx={{ paddingTop: 3, width: '100%' }}>
                        <Typography sx={{ paddingTop: 1 }}>Email:</Typography>
                        <TextField
                            required
                            multiline
                            value={inputFieldMail}
                            onChange={(e) => handleInputMail(e)}
                            style={{ marginTop: '10px', paddingRight: 10, width: '100%' }}
                        />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default DescriptionForm;
