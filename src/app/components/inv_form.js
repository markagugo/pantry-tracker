'use client';

import React, { useState } from 'react';
import { Box, Button, Container, Fab, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Add } from '@mui/icons-material';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import theme from '../theme';

const InventoryForm = ({ userid, onItemAdded }) => {
  const [open, setOpen] = useState(false);
  const [itemData, setItemData] = useState({ name: '', quantity: 1 });

  const handleDialogState = () => setOpen(!open);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemData(prevItemData => ({ ...prevItemData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addDataToDb();
  };

  const addDataToDb = async () => {
    try {
      const itemDocRef = doc(collection(doc(db, 'users', userid), 'inventories'), itemData.name.toLowerCase());
      await setDoc(itemDocRef, itemData);
      onItemAdded(itemData); // Call the callback to update the state in Home
      handleDialogState();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  return (
    <Container>
      <Fab component="button" variant="extended" size="secondary" aria-label="add" 
           sx={{ position: 'fixed', bgcolor: theme.palette.primary.main, bottom: 16, right: 16 }} 
           onClick={handleDialogState}>
        <Add sx={{ mr: 1 }} /> Add Inventory
      </Fab>
      <Dialog fullWidth open={open} onClose={handleDialogState}>
        <DialogTitle>Add New Item</DialogTitle>
        <DialogContent>
          <Box noValidate component="form" sx={{ display: 'flex', flexDirection: 'column', m: 'auto' }} onSubmit={handleSubmit}>
            <TextField margin="normal" required fullWidth id="name" label="Item Name" name="name" type='text' autoFocus onChange={handleChange} />
            <TextField margin="normal" required fullWidth id="quantity" label="Quantity" name="quantity" type='number' onChange={handleChange} />
            <Button sx={{ marginTop: 1, bgcolor: theme.palette.primary.main, color: "#ffffff", ":hover": { bgcolor: theme.palette.secondary.main } }} type='submit'>
              Add
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogState}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default InventoryForm;
