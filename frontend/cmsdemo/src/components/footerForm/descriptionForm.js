import * as React from 'react';
import { useState, useContext } from 'react';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { SocketContext } from '../../Context';
import Grid from '@mui/material/Grid';

const DescriptionForm = () => {
    const { pages, setPages, description, setDescription, updateFooter, contact, email } = useContext(SocketContext);
    const [inputFields, setInputFields] = useState(description);

    const handleInput = (event) => {
        const val = event.target.value;
        setInputFields(val);
    };

    const updateDesc = () => {
        setDescription(inputFields);
        localStorage.setItem('desc', inputFields);
        updateFooter(inputFields, contact, email);
    };

    return (
        <>
            <Container maxWidth="xl" sx={{ paddingTop: 3 }}>
                <Button variant='contained' onClick={updateDesc} sx={{ width: '20%', height: '10%' }}>
                    Update Description
                </Button>
                <Grid>
                    <Grid item sx={{ paddingTop: 3, width: '100%' }}>
                        <Typography sx={{ paddingTop: 1 }}>Description:</Typography>
                        <TextField
                            required
                            multiline
                            value={inputFields}
                            onChange={(e) => handleInput(e)}
                            style={{ marginTop: '10px', paddingRight: 10, width: '100%' }}
                        />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default DescriptionForm;
