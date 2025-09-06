
import { Box, TextField, Button, Typography, IconButton, Paper, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import axios from 'axios';
import { safeParse } from 'valibot';
import { useState } from 'react';
import { bookSchema } from '../Validation/bookSchema';
import { Delete, PhotoCamera } from '@mui/icons-material';

const Add = ({ onAddBook, handleDrawer }) => {

    const theme = useTheme();
    const [imageFile, setImageFile] = useState(null);

    const [errors, setErrors] = useState({});
    const [formValues, setFormValues] = useState({
        title: "",
        author: "",
        genre: "",
        price: "",
        rating: "",
        image: "",
        summary: "",
    });

    const handleFieldChange = (fieldName, value) => {
        // Update form values
        setFormValues(prev => ({ ...prev, [fieldName]: value }));

        // Clear the error for that field
        if (errors[fieldName]) {
            setErrors(prev => ({ ...prev, [fieldName]: undefined }));
        }
    }

    // handle file selection

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            // Clear image error if any
            setErrors(prev => ({ ...prev, image: undefined }));
        }
    };


    //Remove selected Image

    const handleRemoveImage = () => {
        setImageFile(null);
    }

    const handleAddBook = async (e) => {
        try {
            e.preventDefault();

            const formObject = {
                title: formValues.title,
                author: formValues.author,
                genre: formValues.genre,
                price: parseFloat(formValues.price),
                rating: parseFloat(formValues.rating),
                summary: formValues.summary,
                image: imageFile, // 🔑 include the file here
            };

            // ✅ Validate with Valibot
            const result = safeParse(bookSchema, formObject);

            if (!result.success) {
                const fieldErrors = {};
                result.issues.forEach(issue => {
                    const field = issue.path?.[0].key;
                    fieldErrors[field] = issue.message;
                });
                setErrors(fieldErrors);

                if (isNaN(formObject.price)) {
                    setErrors(prev => ({ ...prev, price: "Price is required." }));
                }

                if (isNaN(formObject.rating)) {
                    setErrors(prev => ({ ...prev, rating: "Rating is required." }));
                }

                return;
            }

            // 🔑 Build FormData for multer
            const formData = new FormData();
            Object.entries(formObject).forEach(([key, value]) => {
                if (key !== "image") {
                    formData.append(key, value);
                }
            });
            if (imageFile) {
                formData.append("image", imageFile);
            }

            const response = await axios.post('http://localhost:3000/book/add', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "multipart/form-data",
                }
            });

            onAddBook(response.data.data);
            toast.success("Book Added Successfully ! 🎉");
            handleDrawer(false)();

        } catch (err) {
            console.log(err.response?.data || err);
            toast.error("Error : Could not add book !");
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'start',
                bgcolor: theme.palette.background.default,
                px: 3,
                py: 3
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    p: 3,
                    width: 300,
                    position: 'relative',
                    borderRadius: 2
                }}
            >
                {/* Close icon */}
                <IconButton
                    sx={{ position: 'absolute', top: 8, left: 8, color: 'inherit' }}
                    onClick={() => handleDrawer(false)()}
                >
                    <CloseIcon />
                </IconButton>

                <Typography variant="h6" align="center" gutterBottom sx={{ fontWeight: "bold", pb: 2 }}>
                    Add Book
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleAddBook}
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                >
                    <TextField
                        label="Title"
                        name="title"
                        value={formValues.title}
                        fullWidth
                        error={Boolean(errors.title)}
                        helperText={errors.title}
                        onChange={(e) => handleFieldChange('title', e.target.value)}
                    />
                    <TextField
                        label="Author"
                        name="author"
                        value={formValues.author}
                        fullWidth
                        error={Boolean(errors.author)}
                        helperText={errors.author}
                        onChange={(e) => handleFieldChange('author', e.target.value)}
                    />
                    <TextField
                        label="Genre"
                        name="genre"
                        value={formValues.genre}
                        fullWidth
                        error={Boolean(errors.genre)}
                        helperText={errors.genre}
                        onChange={(e) => handleFieldChange('genre', e.target.value)}
                    />
                    <TextField
                        label="Price"
                        name="price"
                        value={formValues.price}
                        fullWidth
                        type="number"
                        inputProps={{ step: 0.01 }}
                        error={Boolean(errors.price)}
                        helperText={errors.price}
                        onChange={(e) => handleFieldChange('price', e.target.value)}
                    />
                    <TextField
                        label="Rating"
                        name="rating"
                        value={formValues.rating}
                        fullWidth
                        type="number"
                        inputProps={{ step: 0.1 }}
                        error={Boolean(errors.rating)}
                        helperText={errors.rating}
                        onChange={(e) => handleFieldChange('rating', e.target.value)}
                    />
                    <Box sx={{ mt: 2, mb: 2 }}>
                        <Typography variant="body">
                            Image
                        </Typography>
                        {imageFile ? (
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2, mb: 2 }}>
                                <Typography variant="body2" color={theme.palette.text.primary}>
                                    {imageFile.name} ({(imageFile.size / 1024).toFixed(2)} KB)
                                </Typography>
                                <IconButton
                                    color="error"
                                    onClick={handleRemoveImage}
                                    size="small"
                                >
                                    <Delete />
                                </IconButton>
                            </Box>) : (
                            <Box sx={{ display: "flex", alignItems: 'center', mt: 2, gap: 2 }}>
                                <Button
                                    variant='outlined'
                                    component="label"
                                    color={theme.palette.text.primary}
                                    startIcon={<PhotoCamera />}
                                    sx={{ minWidth: 200 }}>
                                    Choose Image
                                    <input type="file"
                                        hidden
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                </Button>
                            </Box>
                        )}

                        {errors.image && (
                            <Typography variant="caption" color="error">
                                {errors.image}
                            </Typography>
                        )}
                    </Box>
                    <TextField
                        label="Summary"
                        name="summary"
                        value={formValues.summary}
                        multiline
                        rows={3}
                        fullWidth
                        error={Boolean(errors.summary)}
                        helperText={errors.summary}
                        onChange={(e) => handleFieldChange('summary', e.target.value)}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"

                    >
                        Add Book
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default Add;
