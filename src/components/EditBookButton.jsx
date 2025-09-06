
import React, { useState } from 'react'
import { Button, Drawer } from '@mui/material'
import { useAuth } from '../context/AuthProvider';
import Edit from './Edit';

const EditBookButton = ({book, onEditBook}) => {

    const {user} = useAuth();

    const [editDrawerOpen, setEditDrawerOpen] = useState(false);

    const toggleDrawer = (newOpen) => () => {
        setEditDrawerOpen(newOpen);
    };

    const isOwner = !!user && !!book && ((book.creator?._id) || book.creator) === user._id;

    if (!user || user.role !== 'seller' || !isOwner) return null;

    return (
        <>
            <Button sx={{mt:3, mr:3}}variant="contained" color="primary" onClick={toggleDrawer(true)}>
                Edit Book
            </Button>
            <Drawer
                anchor="right"
                open={editDrawerOpen}
                onClose={toggleDrawer(false)}
            >
                <Edit onEditBook={onEditBook} book={book} handleDrawer={toggleDrawer} />
            </Drawer></>
    )
}

export default EditBookButton