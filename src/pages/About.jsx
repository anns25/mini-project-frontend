import { alpha, Box, Button, Container, Typography } from '@mui/material'
import theme from '../theme'

const About = () => {
    return (
        <Box textAlign="center" py={8} sx={{height: '100vh', mb: 0, position: 'relative', backgroundImage: 'url(https://images.unsplash.com/photo-1635621450236-da71ab3f362e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover' }}>
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
            <Container  mb={0} sx={{ position: 'relative', backgroundColor: 'transparent', color: theme.palette.text.primary, zIndex: 2 }}>
                <Box mt={10} px={5} textAlign="center" sx={{height : '100vh'}}>
                    <Typography variant="h2" fontWeight="bold" mb={2} sx={{ fontFamily: theme.typography.h2.fontFamily }}>
                        About Us
                    </Typography>
                    <Typography variant= "h6" maxWidth="600px" mx="auto" mb={3} sx={{ fontFamily: theme.typography.body1.fontFamily }}>
                        We love books and we love connecting readers to stories they'll cherish.
                        Our curated selection features a wide range of genres, from timeless classics to contemporary bestsellers.
                    </Typography>
                    <Button variant="contained" color="primary">
                        Shop Now
                    </Button>
                </Box>
            </Container>
        </Box>
    )
}

export default About