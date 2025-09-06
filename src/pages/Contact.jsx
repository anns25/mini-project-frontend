import { Container, Typography, TextField, Button, Box, Paper, useTheme } from '@mui/material';

function Contact() {
    const theme = useTheme();
    return (
        <Container maxWidth="sm" sx={{ py: 6 }}>
            <Paper elevation={3} sx={{ minHeight : '100vh', p: 4, backgroundColor: theme.palette.background.default, color : theme.palette.text.primary, borderRadius: 2 }}>
                <Typography variant="h4" gutterBottom align="center" sx={{ fontFamily: 'Playfair Display' }}>
                    Contact Us
                </Typography>
                <Typography variant="body1" gutterBottom align="center">
                    We'd love to hear from you! Please fill out the form below.
                </Typography>

                <Box
                    component="form"
                    sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 3 }}
                >
                    <TextField
                        fullWidth
                        label="Name"
                        variant="outlined"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        type="email"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Message"
                        multiline
                        rows={5}
                        variant="outlined"
                        required
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        sx={{
                            mt: 2,
                            borderRadius: 2,
                            fontWeight: 'bold',
                            textTransform: 'none',
                            fontSize: '1rem'
                        }}
                    >
                        Send Message
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}

export default Contact;
