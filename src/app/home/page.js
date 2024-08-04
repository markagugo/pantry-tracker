'use client';

import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { Container, Typography, Grid, Box, IconButton, TextField, InputAdornment } from '@mui/material';
import InventoryForm from '../components/inv_form';
import InventoryCard from '../components/inv_card';
import { auth, db } from '../firebase';
import { Search, Close } from '@mui/icons-material';

function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({ userid: '', username: '' });
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);

  useEffect(() => {
    const getItems = async (userid) => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users', userid, 'inventories'));
        const newItems = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setItems(newItems);
      } catch (error) {
        console.error('Error getting items', error);
      } finally {
        setIsLoading(false);
      }
    };

    const getUserName = async (userid) => {
      try {
        const docRef = doc(db, `users/${userid}/userdata`, 'profile');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData(prevUserData => ({ ...prevUserData, username: data.username }));
        }
      } catch (error) {
        console.error('Error getting user name:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserData(prevUserData => ({ ...prevUserData, userid: user.uid }));
        getUserName(user.uid);
        getItems(user.uid);
      } else {
        router.push('/');
      }
    });

    return () => unsubscribe();
  }, [auth, router]);

  const handleItemAdded = (newItem) => {
    setItems(prevItems => [...prevItems, { id: newItem.name.toLowerCase(), ...newItem }]);
  };

  const handleItemUpdate = async () => {
    if (userData.userid) {
      const querySnapshot = await getDocs(collection(db, 'users', userData.userid, 'inventories'));
      const updatedItems = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setItems(updatedItems);
    }
  };

  const handleSearchIconClick = () => {
    setShowSearchInput(true);
  };

  const handleCloseSearchInput = () => {
    setSearchQuery('');
    setShowSearchInput(false);
  };

  return (
    <Container>
      {!isLoading && 
        <Box sx={{
            color: 'black',
            mb: 3,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
        }}>
            <Typography variant="h5" sx={{flexGrow: 1}}>Hey {userData.username}</Typography>
            {showSearchInput ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{ mr: 2 }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <Search/>
                            </InputAdornment>
                        )
                    }}
                />
                <IconButton onClick={handleCloseSearchInput}>
                  <Close />
                </IconButton>
              </Box>
            ) : (
              <IconButton onClick={handleSearchIconClick}>
                  <Search/>
              </IconButton>
            )}
        </Box>
      }
      {!isLoading && <InventoryForm userid={userData.userid} onItemAdded={handleItemAdded} />}
      <Grid container spacing={2}>
        {isLoading ? (
          <Typography variant="h6">Loading...</Typography>
        ) : items.length > 0 ? (
          items
            .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase())) // Filter items based on search query
            .map(item => (
              <Grid item xs={6} sm={6} md={4} lg={4} key={item.id}>
                <InventoryCard userid={userData.userid} name={item.name} quantity={item.quantity} onUpdate={handleItemUpdate} />
              </Grid>
            ))
        ) : (
          <Typography variant="h6">No Items</Typography>
        )}
      </Grid>
    </Container>
  );
}

export default Home;
