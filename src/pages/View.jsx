import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Rating, Divider, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/CartProvider';
import CartDrawer from '../components/CartDrawer';
import EditBookButton from '../components/EditBookButton';
import axios from 'axios';
import { toast } from 'react-toastify';
import RemoveBookButton from '../components/RemoveBookButton';

const View = () => {
    const theme = useTheme();
    const [book, setBook] = useState({});

    const { id } = useParams();
    const navigate = useNavigate();

    const { addToCart } = useCart(); // ✅ get dispatch function
    const [drawerOpen, setDrawerOpen] = useState(false);


    const handleNavigate = () => {
        navigate(-1);
    }


    useEffect(() => {
        axios.get(`http://localhost:3000/book/view/${id}`)
            .then((res) => { setBook(res.data.data) })
            .catch((err) => {
                console.log(err);
                toast.error("Could not load product details");
            });
    }, [id]);

    const onEditBook = (updatedBook) => {
        setBook(updatedBook);
    }

    const handleAddToCart = (book) => {
        addToCart(book) // ✅ add to cart
        setDrawerOpen(true); // ✅ open drawer
    }

    const onRemoveBook = (book_id) => {
        toast.success("Book removed successfully");
        navigate("/");
    }

    return (
        <Box
            sx={{
                backgroundColor: theme.palette.background.default,
                minHeight: '100vh',
                p: { xs: 2, md: 5 },
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    maxWidth: 1200,
                    width: '100%',
                    backgroundColor: theme.palette.background.default,
                    p: 4,
                    gap: 4,
                }}
            >
                {/* Book Cover */}
                <Box
                    component="img"
                    src={`http://localhost:3000/uploads/${book.image}`}
                    alt={book.title}
                    sx={{
                        width: { xs: '100%', md: 300 },
                        height: 'auto',
                        objectFit: 'cover',
                        borderRadius: 2,
                        boxShadow: 4,
                    }}
                />

                {/* Book Info */}
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="h3" fontFamily={theme.typography.h1.fontFamily} color="primary.main">
                        {book.title}
                    </Typography>
                    <Typography variant="h5" fontFamily={theme.typography.h2.fontFamily} color="text.primary">
                        by {book.author}
                    </Typography>
                    <Typography variant="body1" fontFamily={theme.typography.body1.fontFamily} color="text.primary">
                        Genre: <strong>{book.genre}</strong>
                    </Typography>

                    <Rating name="read-only" value={book.rating || 0} precision={0.1} readOnly />
                    <Typography variant="body1" color="text.primary">
                        Price: ₹{book.price}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="h6" fontWeight="bold" color="text.primary">
                        Summary
                    </Typography>
                    <Typography variant="body2" color="text.primary" fontFamily={theme.typography.body1.fontFamily}>
                        {book.summary}
                    </Typography>
                    <Box>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => handleAddToCart(book)}
                            sx={{
                                mt: 3,
                                alignSelf: 'flex-start',
                                fontFamily: theme.typography.body1.fontFamily,
                                boxShadow: 3,
                                mr: 3,
                            }}
                        >
                            Add to Cart
                        </Button>
                        <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleNavigate}
                            sx={{
                                mt: 3,
                                mr: 3,
                                alignSelf: 'flex-start',
                                fontFamily: theme.typography.body1.fontFamily,
                                boxShadow: 3,
                            }}
                        >
                            Go Back
                        </Button>
                        <EditBookButton book={book} onEditBook={onEditBook} />
                        <RemoveBookButton book={book} onRemoveBook={onRemoveBook} />
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

export default View;
