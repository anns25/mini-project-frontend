import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useCart } from "../context/CartProvider";
import { useEffect, useRef } from "react";

export default function Success() {

    const { dispatch } = useCart();

    const didRun = useRef(false);

    useEffect(() => {        

        if (didRun.current) return;
        didRun.current = true;

        const clearCart = async () => {
            try {
                await axios.delete("http://localhost:3000/cart/clear", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                dispatch({ type: "CLEAR_CART" });
                toast.success("Cart cleared!");
            } catch (err) {
                console.error("Error clearing cart:", err.response?.data || err.message);
                toast.error("Failed to clear cart!");
            }
        };

        clearCart();
    }, [dispatch]);
    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "background.default",
                p: 2,
            }}
        >
            <Card
                sx={{
                    maxWidth: 500,
                    textAlign: "center",
                    boxShadow: 4,
                    borderRadius: 3,
                }}
            >
                <CardContent>
                    <CheckCircleIcon color="success" sx={{ fontSize: 80, mb: 2 }} />
                    <Typography variant="h4" color="primary" gutterBottom>
                        Payment Successful
                    </Typography>
                    <Typography variant="body1" color="text.primary" sx={{ mb: 3 }}>
                        Thank you for your purchase! Your order is confirmed and will be processed shortly.
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to="/"
                        sx={{ borderRadius: 2, px: 3 }}
                    >
                        Back to Home
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
}
