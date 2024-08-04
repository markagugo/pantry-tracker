'use client';

import { Add, Delete, Remove } from "@mui/icons-material";
import { Box, Card, CardActions, CardContent, IconButton, Typography } from "@mui/material";
import theme from "../theme";
import { deleteDoc, deleteField, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const InventoryCard = ({ userid, name, quantity, onUpdate }) => {

    const increment = async () => {
        const itemRef = doc(db, "users", userid, "inventories", name.toLowerCase());
        await updateDoc(itemRef, {
            quantity: quantity + 1
        });
        onUpdate();
    };

    const decrement = async () => {
        const itemRef = doc(db, "users", userid, "inventories", name.toLowerCase());
        await updateDoc(itemRef, {
            quantity: quantity - 1
        });
        onUpdate();
    };

    const delete_item = async () => {
        const itemRef = doc(db, "users", userid, "inventories", name.toLowerCase());
        await deleteDoc(itemRef);
        onUpdate();
    };

    return (
        <Card component="div" sx={{
            boxShadow: 3,
            borderRadius: 2,
            width: '100%',
            bgcolor: "#e8e4e1",
    
        }}>
            <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: "#000000"}}>
                    {name}
                </Typography>

                <Typography variant="h6" sx={{ color: "#121282"}}>
                    {quantity}
                </Typography>

            </CardContent>
            <CardActions disableSpacing sx={{ justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex'}}>
                    <IconButton sx={{ color: "#16911a" }} onClick={increment}>
                        <Add />
                    </IconButton>
                    <IconButton sx={{ color: "#d16a1b" }} onClick={decrement}>
                        <Remove />
                    </IconButton>
                </Box>
                <IconButton sx={{ color: theme.palette.secondary.main }} onClick={delete_item}>
                    <Delete />
                </IconButton>

            </CardActions>
        </Card>
    )
};

export default InventoryCard;