import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Rating,
  Stack,
  useTheme,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartProvider';
import { useState } from 'react';
import CartDrawer from './CartDrawer';

const BookCard = ({ book }) => {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(book) // ✅ add to cart
    setDrawerOpen(true); // ✅ open drawer
  }


  return (
    <Card
      sx={{
        width: 175,
        border: 'none',
        boxShadow: 3,
        outline: 'none',
        borderRadius: 0,
        textAlign: 'center',
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        fontFamily: theme.typography.fontFamily,
      }}
    >
      <CardMedia
        component="img"
        image={`http://localhost:3000/uploads/${book.image}`}
        alt={book.title}
        sx={{
          height: 250,
          objectFit: 'cover',
          borderRadius: 1,
          p: 1,
        }}
      />

      <CardContent sx={{ p: 1.5 }}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 'bold',
            fontFamily: theme.typography.h2.fontFamily,
            fontSize: '1rem',
            mb: 0.5,
          }}
        >
          {book.title.slice(0, 15)}...
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: theme.palette.text.secondary,
            fontFamily: theme.typography.body1.fontFamily,
          }}
        >
          {book.author}
        </Typography>

        <Stack direction="row" justifyContent="center" alignItems="center" spacing={0.5} sx={{ my: 1 }}>
          <Rating name="read-only" value={book.rating} precision={0.5} size="small" readOnly />
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
            ({book.rating})
          </Typography>
        </Stack>

        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            fontSize: '1.2rem',
            color: theme.palette.text.primary,
            fontFamily: theme.typography.h1.fontFamily,
          }}
        >
          ₹{book.price.toLocaleString()}
        </Typography>

        <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
          {book.genre}
        </Typography>

        <Button
          variant="contained"
          fullWidth
          onClick={() => handleAddToCart(book)}
          sx={{
            mt: 2,
            backgroundColor: theme.palette.primary.main,
            color: '#fff',
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: 1.5,
            fontFamily: theme.typography.body1.fontFamily,
            '&:hover': {
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.text.primary,
            },
          }}
        >
          Add To Cart
        </Button>
        <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

        <Link to={`book/${book.book_id}`}>
          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              backgroundColor: theme.palette.primary.main,
              color: '#fff',
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: 1.5,
              fontFamily: theme.typography.body1.fontFamily,
              '&:hover': {
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.text.primary,
              },
            }}
          >
            View Details
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default BookCard;
