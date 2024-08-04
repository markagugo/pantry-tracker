'use client';

import { AppRegistrationRounded } from "@mui/icons-material";
import theme from "../theme";
import Link from "next/link";
import { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";


const { Container, Typography, Button, Box, Avatar, TextField } = require("@mui/material");

function SignUp(){
    const router = useRouter();

    const [userData, setUserData] = useState({
        'username' : '',
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

    const signUp = async (e) => {
        e.preventDefault();
        await createUserWithEmailAndPassword(auth, userData.email, userData.password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userDataCollectionRef = collection(doc(db, 'users', user.uid), 'userdata');

 
            setDoc(doc(userDataCollectionRef, 'profile'), {
                username: userData.username,
                email: userData.email,
                password: userData.password,
                userid: user.uid
            });

            router.push('/home')
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
                    <AppRegistrationRounded/>
                </Avatar>

                <Typography component="h1" variant="h5">Sign Up</Typography>

                <Box component="form" sx={{ marginTop:1 }} onSubmit={signUp}>

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoFocus
                        onChange={handleChange}
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
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

                    <Button type="submit" fullWidth variant="contained" sx={{marginTop:3, marginBottom:2}}>Register</Button>
                    
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <Link href="/sign-in" variant="body2" >Already have an account</Link>
                    </Box>
                    
                </Box>

            </Box>
        </Container>
        
    )
}

export default SignUp;