import React, { useState } from 'react';
import { 
    Button, 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions, 
    Typography
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useAuth } from '../context/AuthProvider';
import { toast } from 'react-toastify';
import axios from 'axios';

const RemoveBookButton = ({ book, onRemoveBook }) => {
    const { user } = useAuth();
    const [open, setOpen] = useState(false);

    const isOwner = !!user && !!book && ((book.creator?._id) || book.creator) === user._id;
    // Only show button for sellers
    if (!user || user.role !== 'seller' || !isOwner) return null;

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleRemoveBook = async () => {
        if (!book || !book._id) {
            toast.error("Error: Book data is missing");
            return;
        }

        try {
            await axios.delete('http://localhost:3000/book/delete', {
                data: { id: book._id },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            });
            
            // Call the callback to update parent component
            if (onRemoveBook) {
                onRemoveBook(book._id);
            }
            
            handleClose();
        } catch (err) {
            console.error("Remove error:", err);
            const errorMessage = err.response?.data?.message || "Could not remove book";
            toast.error(`Error: ${errorMessage}`);
        } 
    };

    return (
        <>
            <Button 
                sx={{ mt: 3, mr: 3 }} 
                variant="contained" 
                color="error" 
                onClick={handleOpen}
                startIcon={<Delete />}
            >
                Delete Book
            </Button>
            
            {/* Confirmation Dialog */}
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ color: 'error.main', fontWeight: 'bold' }}>
                    Delete Book
                </DialogTitle>
                <DialogContent>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        Are you sure you want to remove "<strong>{book?.title}</strong>" from your inventory?
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        This action cannot be undone. The book will be permanently removed from your store.
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button 
                        onClick={handleClose} 
                        variant="outlined"
                    >
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleRemoveBook} 
                        variant="contained" 
                        color="error"
                        startIcon={<Delete />}
                    > Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default RemoveBookButton;