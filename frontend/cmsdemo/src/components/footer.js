import * as React from "react";
import { useState, useContext } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Box } from "@mui/material";
import { SocketContext } from "../Context";
import FacebookIcon from '../assets/demo_images/fb.png';
import InstagramIcon from '../assets/demo_images/insta.png';
import TwitterIcon from '../assets/demo_images/twitter.png';
export default function Footer(props) {
    const { description, quicklinks, contact, email, sociallinks } = useContext(SocketContext);
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[800],
                p: 6,
                bottom: 0,
                position: props.position,
                width: '100%',
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={3}>
                        <Typography variant="h6" color="text.primary" gutterBottom>
                            About Us
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {description}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Typography variant="h6" color="text.primary" gutterBottom>
                            Quick Links
                        </Typography>
                        <Box sx={{ flexGrow: 1, flexDirection: 'column', display: { xs: "none", md: "flex" } }}>
                            {quicklinks.map((page) => (
                                <Typography
                                    key={page.title}
                                    component={Link}
                                    href={page.url}
                                    // to={page.url}
                                    noWrap
                                    sx={{ my: 0.5, color: "black", display: 'flex', textDecoration: "None", boxShadow: "None", }}
                                >
                                    {page.title}
                                </Typography>
                            ))}
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Typography variant="h6" color="text.primary" gutterBottom>
                            Contact Us
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            123 Main Street, Anytown, USA
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Email: {email}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Phone: {contact}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Typography variant="h6" color="text.primary" gutterBottom>
                            Follow Us
                        </Typography>
                        {sociallinks.map((social) => (
                            <Link href={social.url} color="inherit">
                                <Avatar src={social.icon} alt="social" />
                            </Link>
                        ))}
                        {/* <Link href="https://www.facebook.com/" color="inherit">
                            <Facebook />
                        </Link>
                        <Link
                            href="https://www.instagram.com/"
                            color="inherit"
                            sx={{ pl: 1, pr: 1 }}
                        >
                            <Instagram />
                        </Link>
                        <Link href="https://www.twitter.com/" color="inherit">
                            <Avatar src={TwitterIcon} alt="Twitter" />
                        </Link> */}
                    </Grid>
                </Grid>
                <Box mt={5}>
                    <Typography variant="body2" color="text.secondary" align="center">
                        {"Copyright © "}
                        <Link color="inherit" href="http://localhost:3000">
                            Your Website
                        </Link>{" "}
                        {new Date().getFullYear()}
                        {"."}
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}