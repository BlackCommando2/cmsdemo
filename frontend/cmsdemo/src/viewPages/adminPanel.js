import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Header from '../components/header';
import ImageSelector from '../components/headerForm/imageSelector';
import NavbarForm from '../components/headerForm/navbarForm';
import CardForm from '../components/headerForm/cardsForm';
import DescriptionForm from '../components/footerForm/descriptionForm';
import LinksForm from '../components/footerForm/linksForm';
import ContactForm from '../components/footerForm/contactForm';
import SocialForm from '../components/footerForm/socialForm';
const drawerWidth = 240;

export default function AdminPanel() {
    const [headerpanel, setHeaderpanel] = useState(true);
    const [footerpanel, setFooterpanel] = useState(false);
    const changeForm = (text) => {
        if (text === 'Header') {
            setHeaderpanel(true);
            setFooterpanel(false);
        }
        else if (text === 'Footer') {
            setHeaderpanel(false);
            setFooterpanel(true);
        }
    };

    return (
        <>
            <Typography textAlign="center" fontSize={20} fontWeight="bold" width={drawerWidth} height={20} sx={{ zIndex: 2, textAlign: "center", paddingTop: 2.5, position: 'fixed' }}>Admin Panel</Typography>

            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
                >
                    <Header />

                </AppBar>

                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        }, zIndex: 1, position: 'fixed'
                    }}
                    variant="permanent"
                    anchor="left"
                >
                    <Toolbar />
                    <Divider />
                    <List>
                        {[{ title: 'Header' }, { title: 'Footer' }].map((text, index) => (
                            <ListItem key={text.title} disablePadding>
                                <ListItemButton onClick={() => changeForm(text.title)}>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={text.title} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>

                <Box
                    component="main"
                    sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, width: `calc(100% - ${drawerWidth}px)`, position: 'relative', paddingLeft: 30 }}
                >
                    <Box>
                        <Toolbar />
                        {headerpanel && (
                            <>
                                <ImageSelector />
                                <NavbarForm />
                                <CardForm />
                            </>
                        )}

                        {footerpanel && (
                            <>
                                <DescriptionForm />
                                <Divider />
                                <LinksForm />
                                <ContactForm />
                                <SocialForm />
                            </>
                        )}
                    </Box>
                </Box>
            </Box>
        </>
    );
}
