import React from 'react';
import { Box, Typography, IconButton, Button, Grid, Divider, Container, useMediaQuery } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { useTheme } from "@mui/material";
import { useCart } from '../context/CartProvider'; // adjust path as needed
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

const Cart = () => {
    const { cartItems, updateQuantity, removeFromCart, totalPrice } = useCart();
    const theme = useTheme();
    const stripePromise = loadStripe("pk_test_51Rxhu2Rpd1q4ZABJa5DE2cD3KQ2NoMcd7NRd9JPETjwOPB2np5zGDtVEjT3vj9vzWTbdvH4sLUO3WnV1xa0rVNrh00ZQ2dXOUr");
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate(-1);
    }

    const handleBuyNow = async () => {
        try {
            await stripePromise;
            const response = await fetch("http://localhost:3000/api/stripe/create-checkout-session", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ cartItems }),
            });

            const data = await response.json();
            if (data.url) {
                window.location.href = data.url; // redirect to Stripe Checkout
            }
        } catch (error) {
            console.error("Error redirecting to checkout:", error);
        }
    };

    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));


    return (
        <Container>
            <Box p={2} sx={{ backgroundColor: theme.palette.background.default, color: theme.palette.text.primary, minHeight: '100vh' }}>
                <Typography variant="h4" align="center" sx={{ fontFamily: theme.typography.h1.fontFamily, mb: 4 }}>
                    Cart
                </Typography>

                {cartItems.length === 0 ? (
                    <>
                        <Typography align="center">Your cart is empty.</Typography>
                        <Box display="flex" justifyContent="center" mt={4}>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                align="center"
                                sx={{
                                    borderRadius: 2,
                                    px: { xs: 1.5, sm: 4 },
                                    py: 1.5,
                                    fontFamily: theme.typography.h2.fontFamily,
                                    fontWeight: 'bold',
                                    fontSize: { xs: '12px', sm: '15px' },
                                    width: { xs: '30%', sm: 'auto' }
                                }}
                                onClick={handleNavigate}
                            >
                                Go Back
                            </Button>
                        </Box>
                    </>

                ) : (
                    <Grid container columns={12} spacing={2} direction="column">
                        {cartItems.map((item) => (
                            <Grid key={item._id}>
                                <Box
                                    display="flex"
                                    flexDirection="row"
                                    alignItems={{ xs: "space-between", sm: "center" }}
                                    justifyContent="space-between"
                                    p={2}
                                    sx={{ border: '1px solid #DDD0C8', borderRadius: 2, backgroundColor: '#fff' }}
                                >
                                    <Box display="flex" alignItems="center" flex="1">
                                        <Box
                                            component="img"
                                            src={`http://localhost:3000/uploads/${item.image}`}
                                            alt={item.title}
                                            sx={{ width: 70, height: 100, borderRadius: 1, mr: 2 }}
                                        />
                                        {!isSmallScreen &&
                                            (<Box>
                                                <Typography variant="subtitle1" fontWeight="bold">
                                                    {item.title}
                                                </Typography>
                                                <Typography variant="body2">{item.author}</Typography>

                                                <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>{item.genre}</Typography>
                                                <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
                                                    ★★★★☆ {item.rating}
                                                </Typography>
                                            </Box>)}
                                    </Box>
                                    <Box display="flex"
                                        flexDirection="column"
                                        sx={{ width: { xs: "60%", sm: "auto" } }}>
                                        {isSmallScreen && (<Box>
                                            <Typography variant="subtitle1" fontWeight="bold">
                                                {item.title}
                                            </Typography>
                                            <Typography variant="body2">{item.author}</Typography>

                                            <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>{item.genre}</Typography>
                                            <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
                                                ★★★★☆ {item.rating}
                                            </Typography>
                                        </Box>)}
                                        <Box display="flex" alignItems="center" mt={{ xs: 2 }}>
                                            <IconButton
                                                onClick={() =>
                                                    updateQuantity(item._id, item.quantity - 1)
                                                }
                                                sx={{ color: theme.palette.primary.main }}
                                            >
                                                <Remove />
                                            </IconButton>
                                            <Typography mx={1}>{item.quantity}</Typography>
                                            <IconButton
                                                onClick={() =>
                                                    updateQuantity(item._id, item.quantity + 1)
                                                }
                                                sx={{ color: theme.palette.primary.main }}
                                            >
                                                <Add />
                                            </IconButton>
                                        </Box>

                                        <Typography mx={2} fontWeight="bold">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </Typography>

                                        <Button
                                            onClick={() => removeFromCart(item._id)}
                                            variant="contained"
                                            color="secondary"
                                            sx={{ ml: { xs: 0, sm: 2 }, mt: { xs: 2 }, whiteSpace: 'nowrap' }}
                                        >
                                            Remove
                                        </Button>
                                    </Box>
                                </Box>
                            </Grid>
                        ))}

                        <Grid>
                            <Box
                                p={3}
                                sx={{
                                    border: '1px solid #DDD0C8',
                                    borderRadius: 2,
                                    backgroundColor: '#fff',
                                }}
                            >
                                <Typography variant="h6" fontWeight="bold" mb={2}>
                                    Summary
                                </Typography>

                                <Box display="flex" justifyContent="space-between" mb={1}>
                                    <Typography>Subtotal</Typography>
                                    <Typography>
                                        $
                                        {totalPrice}
                                    </Typography>
                                </Box>

                                <Box display="flex" justifyContent="space-between" mb={1}>
                                    <Typography>Shipping</Typography>
                                    <Typography>{totalPrice < 1000 ? "$20" : "FREE"}</Typography>
                                </Box>

                                <Divider sx={{ my: 1 }} />

                                <Box display="flex" justifyContent="space-between" mb={2}>
                                    <Typography fontWeight="bold">Total</Typography>
                                    <Typography fontWeight="bold">
                                        $
                                        {totalPrice < 1000 ? totalPrice + 20 : totalPrice}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>


                        <Divider sx={{ my: 2 }} />

                        <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="center" alignItems="center">
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                sx={{
                                    borderRadius: 2,
                                    px: { xs: 1.5, sm: 4 },
                                    py: 1.5,
                                    mx: 2.5,
                                    my: 1.5,
                                    fontFamily: theme.typography.h2.fontFamily,
                                    fontWeight: 'bold',
                                    fontSize: { xs: '12px', sm: '15px' },
                                    width: { xs: '30%', sm: 'auto' }
                                }}
                                onClick={handleBuyNow}
                            >
                                Buy Now
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                sx={{
                                    borderRadius: 2,
                                    px: { xs: 1.5, sm: 4 },
                                    py: 1.5,
                                    mx: 2.5,
                                    my: 1.5,
                                    fontFamily: theme.typography.h2.fontFamily,
                                    fontWeight: 'bold',
                                    fontSize: { xs: '12px', sm: '15px' },
                                    width: { xs: '30%', sm: 'auto' }
                                }}
                                onClick={handleNavigate}
                            >
                                Go Back
                            </Button>

                        </Box>
                    </Grid>
                )}
            </Box>
        </Container>
    );
};

export default Cart;
