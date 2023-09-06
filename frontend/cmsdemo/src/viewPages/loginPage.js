import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Header from "../components/header";
import Footer from "../components/footer";
function LoginPage() {
    const handleSubmit = () => {

    };
    return (
        <div>
            <Header />
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <div style={{ paddingTop: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <TextField
                        required
                        id="outlined-required"
                        label="Username"
                    />
                    <TextField
                        required
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                    />
                    <Button variant="outlined" onClick={handleSubmit} style={{ marginBottom: 20 }}>Submit</Button>
                </div>
            </Box>
            < Footer position='fixed' />
        </div>
    );
}

export default LoginPage;
