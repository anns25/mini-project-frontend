import { Box, Container, Typography, Link as MuiLink, IconButton, Stack, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

function Footer() {
    const theme = useTheme();
    return (
        <Box
            component="footer"
            sx={{
                py: 2,
                px: 2,
                mt: 0,
                textAlign: 'center',
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.text.primary,
            }}
        >
            <Container maxWidth="md">
                <Stack direction="row" spacing={4} justifyContent="center" sx={{ mb: 2, py: 2 }}>
                    <MuiLink component={RouterLink} to="/" color="inherit" underline="none">
                        Home
                    </MuiLink>
                    <MuiLink component={RouterLink} to="/categories" color="inherit" underline="none">
                        Categories
                    </MuiLink>
                    <MuiLink component={RouterLink} to="/about" color="inherit" underline="none">
                        About
                    </MuiLink>
                    <MuiLink component={RouterLink} to="/contact" color="inherit" underline="none">
                        Contact
                    </MuiLink>
                </Stack>

                {/* Social Icons */}
                <Stack direction="row" spacing={2} justifyContent="center" sx={{ pb: 1 }}>
                    <IconButton color="inherit" href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <FacebookIcon />
                    </IconButton>
                    <IconButton color="inherit" href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <TwitterIcon />
                    </IconButton>
                    <IconButton color="inherit" href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <InstagramIcon />
                    </IconButton>
                </Stack>
                <Typography variant="body2" sx={{ py: 2 }}>
                    © {new Date().getFullYear()} MyApp. All rights reserved.
                </Typography>
            </Container>

        </Box>
    );
}

export default Footer;
