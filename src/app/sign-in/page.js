'use client';

import { LockOutlined } from "@mui/icons-material";
import theme from "../theme";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Link from "next/link";
import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

const { Container, Typography, Button, Box, Avatar, TextField } = require("@mui/material");

function SignIn(){
    const router = useRouter();

    const [userData, setUserData] = useState({
        'email' : '',
        'password' : ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevUserData) => ({
            ...prevUserData,
            [name] : value
        }))
    };

    const signIn = async (e) => {
        e.preventDefault();
        await signInWithEmailAndPassword(auth, userData.email, userData.password)
        .then((userCredential) => {
            router.push("/home")
        })
        .catch((error) => {
            console.log(error.message);
        })
    };

    

    return (
        <Container component="main" >
            <Box
                sx={{
                    marginTop:8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}
            >
                <Avatar
                    sx={{
                        margin: 1,
                        bgcolor: theme.palette.secondary.main
                    }}
                >
                    <LockOutlined/>
                </Avatar>

                <Typography component="h1" variant="h5">Sign In</Typography>

                <Box component="form" sx={{ marginTop:1 }} onSubmit={signIn}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={handleChange}
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="Password"
                        name="password"
                        autoComplete="current-password"
                        onChange={handleChange}
                    />

                    <Button type="submit" fullWidth variant="contained" sx={{marginTop:3, marginBottom:2}}>Login</Button>

                    <Grid2 container>
                        <Grid2 item xs>
                            <Link href="/" variant="body2">Forgot Password?</Link>
                        </Grid2>

                        <Grid2 item>
                            <Link href="/sign-up" variant="body2">Don't have an account</Link>
                        </Grid2>

                    </Grid2>
                </Box>

            </Box>
        </Container>
        
    )
}

export default SignIn;