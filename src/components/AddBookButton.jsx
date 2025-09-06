
import React, { useState } from 'react'
import Add from './Add'
import { Button, Drawer } from '@mui/material'
import { useAuth } from '../context/AuthProvider';

const AddBookButton = ({ onAddBook }) => {

    const {user} = useAuth();

    const [addDrawerOpen, setAddDrawerOpen] = useState(false);

    const toggleDrawer = (newOpen) => () => {
        setAddDrawerOpen(newOpen);
    };

    if (!user || user.role !== 'seller') return null;

    return (
        <>
            <Button variant="contained" color="primary" onClick={toggleDrawer(true)}>
                Add Book
            </Button>
            <Drawer
                anchor="right"
                open={addDrawerOpen}
                onClose={toggleDrawer(false)}
            >
                <Add onAddBook={onAddBook} handleDrawer={toggleDrawer} />
            </Drawer></>
    )
}

export default AddBookButton