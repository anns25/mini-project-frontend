import React, { useEffect, useState } from 'react'

import { Box, Typography, Grid, Container, alpha, Pagination } from '@mui/material';
import { useTheme } from "@mui/material";
import BookCard from '../components/BookCard';
import axios from 'axios';
import AddBookButton from '../components/AddBookButton';

const Home = () => {


    const theme = useTheme();
    const [books, setBooks] = useState([]);

    const fetchBooks = async () => {
        try {
            const res = await axios.get('http://localhost:3000/book/all');
            if (res.status === 200) {
                setBooks(res.data.data);
            }

        } catch (err) {
            console.log(err);
        }

    }

    useEffect(() => {
        fetchBooks();
    }, [])

       const onAddBook = async (newBook) => {
        setBooks(prevBooks => [newBook, ...prevBooks]);
        setCurrentPage(1);
    }

    // CALCULATIONS FOR PAGINATION

    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 12;

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentPageBooks = books.slice(indexOfFirstBook, indexOfLastBook);

    

    return (
        <>


            {/* Welcome Section */}
            <Box textAlign="center" py={8} sx={{ mb: 5, position: 'relative', backgroundImage: 'url(https://images.unsplash.com/photo-1635621450236-da71ab3f362e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', transform: 'rotate(90)' }}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: alpha(theme.palette.secondary.main, 0.5), // translucent dark overlay
                        zIndex: 1,
                    }}
                />
                <Container sx={{ position: 'relative', backgroundColor: 'transparent', color: theme.palette.text.primary, pb: 5, zIndex: 2 }}>
                    <Typography variant="h2" fontWeight="bold" sx={{ fontFamily: theme.typography.h1.fontFamily, mx: 'auto', maxWidth: '60%' }}>
                        Read.
                        Learn.
                        Grow.
                    </Typography>
                    <Typography variant="h6" sx={{ mt: 2, mb: 4, fontFamily: theme.typography.body1.fontFamily }}>
                        Discover your next great read.
                    </Typography>
                    <AddBookButton onAddBook={onAddBook}/>                    

                </Container>
            </Box>

            {/* Featured Books */}
            <Container sx={{ backgroundColor: theme.palette.background.default, color: theme.palette.text.primary, pb: 10 }}>
                <Box px={5} sx={{ minHeight: '100vh' }}>
                    <Typography variant="h4" textAlign="center" m={5} p={3} sx={{ fontFamily: theme.typography.h2.fontFamily }}>
                        Featured Books
                    </Typography>
                    <Grid container spacing={4} justifyContent="center">
                        {currentPageBooks.map((book) => (<Grid size={{ sm: 4, md: 3, lg: 2 }} key={book.book_id}>
                            <BookCard book={book} key={book.book_id}/>
                        </Grid>
                        ))}
                    </Grid>
                    <Pagination
                        count={Math.ceil(books.length / booksPerPage)}
                        page={currentPage}
                        onChange={(e, value) => setCurrentPage(value)}
                        color='primary'
                        sx={{ mt: 5, pt: 3, display: 'flex', justifyContent: 'center', alignItems: 'stretch' }} />
                </Box>


            </Container>
        </>

    )
}

export default Home