
// import { Box, TextField, Button, Typography, IconButton, Paper, useTheme } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import { toast } from 'react-toastify';
// import axios from 'axios';
// import { safeParse } from 'valibot';
// import { useEffect, useState } from 'react';
// import { editBookSchema } from '../Validation/bookSchema';
// import { Delete, PhotoCamera } from '@mui/icons-material';

// const Edit = ({ onEditBook, book, handleDrawer }) => {

//     const theme = useTheme();
//     const [imageFile, setImageFile] = useState(null);
//     const [existingImage, setExistingImage] = useState(book.image || "");

//     const [errors, setErrors] = useState({});

//     const [formData, setFormData] = useState({
//         title: "",
//         author: "",
//         genre: "",
//         price: "",
//         rating: 0,
//         image: "",
//         summary: ""
//     });

//     // handle file selection

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             if (file) {
//                 // Validate file type
//                 if (!file.type.startsWith('image/')) {
//                     setErrors({ ...errors, image: "Please select an image file" });
//                     return;
//                 }

//                 // Validate file size (5MB limit)
//                 if (file.size > 5 * 1024 * 1024) {
//                     setErrors({ ...errors, image: "Image size must be less that 5MB" });
//                     return;
//                 }

//                 setImageFile(file);
//             }
//         }
//     }

//     //Remove selected Image

//     const handleRemoveImage = () => {
//         setImageFile(null);
//     }


//     // Initialize form data when book prop changes

//     useEffect(() => {
//         if (book) {
//             setFormData({
//                 title: book.title || "",
//                 author: book.author || "",
//                 genre: book.genre || "",
//                 price: book.price || "",
//                 rating: book.rating || 0,
//                 image: book.image || "",
//                 summary: book.summary || ""
//             });
//         }
//     }, [book]);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));

//         // clear errors whe user starts typing

//         if (errors[name]) {
//             setErrors(prev => ({ ...prev, [name]: "" }));
//         }
//     }


//     const handleEditBook = async (e) => {
//         e.preventDefault();

//         // 🚨 Prevent update if no image is provided
//         if (!existingImage && !imageFile) {
//             toast.error("Please upload a book image before saving.");
//             return;
//         }
//         if (!book || !book._id) {
//             toast.error("Error: Book data is missing");
//             return;
//         }
//         try {
//             const bookData = {
//                 id: book._id,
//                 title: formData.title,
//                 author: formData.author,
//                 genre: formData.genre,
//                 price: Number(parseFloat(formData.price).toFixed(2)),
//                 rating: Number(parseFloat(formData.rating).toFixed(1)),
//                 summary: formData.summary,
//             };


//             // Validation

//             const result = safeParse(bookSchema, bookData);


//             if (!result.success) {
//                 const fieldErrors = {};
//                 result.issues.forEach(issue => {
//                     const field = issue.path?.[0].key;
//                     fieldErrors[field] = issue.message;
//                 });
//                 setErrors(fieldErrors);

//                 if (isNaN(bookData.price)) {
//                     setErrors(prev => ({ ...prev, price: "Price is required" }));
//                 }

//                 if (isNaN(bookData.rating)) {
//                     setErrors(prev => ({ ...prev, rating: "Rating is required" }));
//                 }

//                 return;
//             }

//             // 🔑 Build FormData for multer
//             const fd = new FormData();
//             fd.append("id", book._id);
//             Object.entries(bookData).forEach(([key, value]) => {
//                 if (key !== "id") fd.append(key, value);
//             });

//             if (imageFile) {
//                 fd.append("image", imageFile); // only if new image is selected
//             }

//             const response = await axios.patch('http://localhost:3000/book/update', fd,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem("token")}`,
//                         "Content-Type": "multipart/form-data",
//                     }
//                 }
//             );

//             onEditBook(response.data.data);
//             handleDrawer(false)();
//         }
//         catch (err) {
//             console.log(err.response.data);
//             toast.error("Error : Could not edit book! ");
//         }
//     };

//     return (
//         <Box
//             sx={{
//                 minHeight: '100vh',
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'start',
//                 bgcolor: theme.palette.background.default,
//                 px: 3,
//                 py: 3
//             }}
//         >
//             <Paper
//                 elevation={3}
//                 sx={{
//                     p: 3,
//                     width: 300,
//                     position: 'relative',
//                     borderRadius: 2
//                 }}
//             >
//                 {/* Close icon */}
//                 <IconButton
//                     sx={{ position: 'absolute', top: 8, left: 8, color: 'inherit' }}
//                     onClick={() => handleDrawer(false)()}
//                 >
//                     <CloseIcon />
//                 </IconButton>

//                 <Typography variant="h6" align="center" gutterBottom sx={{ fontWeight: "bold", pb: 2 }}>
//                     Edit Book
//                 </Typography>

//                 <Box
//                     component="form"
//                     onSubmit={handleEditBook}
//                     sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
//                 >
//                     <TextField
//                         label="Title"
//                         name="title"
//                         value={formData.title}
//                         onChange={handleInputChange}
//                         fullWidth
//                         error={Boolean(errors.title)}
//                         helperText={errors.title}
//                     />
//                     <TextField
//                         label="Author"
//                         name="author"
//                         value={formData.author}
//                         onChange={handleInputChange}
//                         fullWidth
//                         error={Boolean(errors.author)}
//                         helperText={errors.author}
//                     />
//                     <TextField
//                         label="Genre"
//                         name="genre"
//                         value={formData.genre}
//                         onChange={handleInputChange}
//                         fullWidth
//                         error={Boolean(errors.genre)}
//                         helperText={errors.genre}
//                     />
//                     <TextField
//                         label="Price"
//                         name="price"
//                         value={formData.price}
//                         onChange={handleInputChange}
//                         fullWidth
//                         inputProps={{ step: 0.01 }}
//                         error={Boolean(errors.price)}
//                         helperText={errors.price}
//                     />
//                     <TextField
//                         label="Rating"
//                         name="rating"
//                         value={formData.rating}
//                         onChange={handleInputChange}
//                         fullWidth
//                         inputProps={{ step: 0.1 }}
//                         error={Boolean(errors.rating)}
//                         helperText={errors.rating}
//                     />
//                     <Box sx={{ mt: 2, mb: 2 }}>
//                         <Typography variant="body">
//                             Image
//                         </Typography>
//                         {/* Show existing DB filename if no new one picked */}
//                         {existingImage && !imageFile && (
//                             <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2, mb: 2 }}>
//                                 <Typography variant="body2">Current: {existingImage}</Typography>
//                                 <IconButton color="error" onClick={() => setExistingImage("")} size="small">
//                                     <Delete />
//                                 </IconButton>
//                             </Box>
//                         )}

//                         {imageFile ? (
//                             <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2, mb: 2 }}>
//                                 <Typography variant="body2" color={theme.palette.text.primary}>
//                                     {imageFile.name} ({(imageFile.size / 1024).toFixed(2)} KB)
//                                 </Typography>
//                                 <IconButton
//                                     color="error"
//                                     onClick={handleRemoveImage}
//                                     size="small"
//                                 >
//                                     <Delete />
//                                 </IconButton>
//                             </Box>) : (
//                             <Box sx={{ display: "flex", alignItems: 'center', mt: 2, gap: 2 }}>
//                                 <Button
//                                     variant='outlined'
//                                     component="label"
//                                     color={theme.palette.text.primary}
//                                     startIcon={<PhotoCamera />}
//                                     sx={{ minWidth: 200 }}>
//                                     Choose Image
//                                     <input type="file"
//                                         hidden
//                                         accept="image/*"
//                                         onChange={handleImageChange}
//                                     />
//                                 </Button>
//                             </Box>
//                         )}

//                         {errors.image && (
//                             <Typography variant="caption" color="error">
//                                 {errors.image}
//                             </Typography>
//                         )}
//                     </Box>
//                     <TextField
//                         label="Summary"
//                         name="summary"
//                         value={formData.summary}
//                         onChange={handleInputChange}
//                         multiline
//                         rows={3}
//                         fullWidth
//                         error={Boolean(errors.summary)}
//                         helperText={errors.summary}
//                     />
//                     <Button
//                         type="submit"
//                         variant="contained"
//                         color="primary"

//                     >
//                         Edit Book
//                     </Button>
//                 </Box>
//             </Paper>
//         </Box>
//     );
// };

// export default Edit;


import { Box, TextField, Button, Typography, IconButton, Paper, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import axios from 'axios';
import { safeParse } from 'valibot';
import { useEffect, useState } from 'react';
import { editBookSchema } from '../Validation/bookSchema';
import { Delete, PhotoCamera } from '@mui/icons-material';

const Edit = ({ onEditBook, book, handleDrawer }) => {
    const theme = useTheme();
    const [imageFile, setImageFile] = useState(null);
    const [existingImage, setExistingImage] = useState(book.image || '');
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        title: '',
        author: '',
        genre: '',
        price: '',
        rating: 0,
        image: '',
        summary: '',
    });

    // Initialize form data when book prop changes
    useEffect(() => {
        if (book) {
            setFormData({
                title: book.title || '',
                author: book.author || '',
                genre: book.genre || '',
                price: book.price || '',
                rating: book.rating || 0,
                image: book.image || '',
                summary: book.summary || '',
            });
            setExistingImage(book.image || '');
        }
    }, [book]);

    // handle text input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    // handle file selection
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setErrors({ ...errors, image: 'Please select an image file' });
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                setErrors({ ...errors, image: 'Image size must be less than 5MB' });
                return;
            }
            setImageFile(file);
        }
    };

    const handleRemoveImage = () => {
        setImageFile(null);
        setExistingImage('');
    };

    // Submit handler
    const handleEditBook = async (e) => {
        e.preventDefault();

        const formObject = {
            title: formData.title,
            author: formData.author,
            genre: formData.genre,
            price: parseFloat(formData.price),
            rating: parseFloat(formData.rating),
            summary: formData.summary,
            image: imageFile || existingImage, // ✅ keep old image if no new one picked
        };

        // Validate
        const result = safeParse(editBookSchema, formObject);

        if (!result.success) {
            const fieldErrors = {};
            result.issues.forEach((issue) => {
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

        console.log("errors", errors);

        // Prepare FormData for multer

        const data = new FormData();
        data.append("id", book._id);
        Object.entries(formObject).forEach(([key, value]) => {
            if (key !== "image") {
                data.append(key, value);
            }
        });
        if (imageFile) {
            data.append("image", imageFile);
        }

        try {
            const response = await axios.patch(
                `http://localhost:3000/book/update/`, data,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            toast.success('Book updated successfully! 🎉');
            onEditBook(response.data.data); // ✅ use onEditBook (prop passed in)
            handleDrawer(false)();
        } catch (err) {
            console.error(err.response?.data || err.message);
            toast.error('Error: Could not update book.');
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
                py: 3,
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    p: 3,
                    width: 300,
                    position: 'relative',
                    borderRadius: 2,
                }}
            >
                {/* Close icon */}
                <IconButton
                    sx={{ position: 'absolute', top: 8, left: 8, color: 'inherit' }}
                    onClick={() => handleDrawer(false)()}
                >
                    <CloseIcon />
                </IconButton>

                <Typography
                    variant="h6"
                    align="center"
                    gutterBottom
                    sx={{ fontWeight: 'bold', pb: 2 }}
                >
                    Edit Book
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleEditBook}
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                >
                    <TextField
                        label="Title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        fullWidth
                        error={Boolean(errors.title)}
                        helperText={errors.title}
                    />
                    <TextField
                        label="Author"
                        name="author"
                        value={formData.author}
                        onChange={handleInputChange}
                        fullWidth
                        error={Boolean(errors.author)}
                        helperText={errors.author}
                    />
                    <TextField
                        label="Genre"
                        name="genre"
                        value={formData.genre}
                        onChange={handleInputChange}
                        fullWidth
                        error={Boolean(errors.genre)}
                        helperText={errors.genre}
                    />
                    <TextField
                        label="Price"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        fullWidth
                        inputProps={{ step: 0.01 }}
                        error={Boolean(errors.price)}
                        helperText={errors.price}
                    />
                    <TextField
                        label="Rating"
                        name="rating"
                        value={formData.rating}
                        onChange={handleInputChange}
                        fullWidth
                        inputProps={{ step: 0.1 }}
                        error={Boolean(errors.rating)}
                        helperText={errors.rating}
                    />
                    <Box sx={{ mt: 2, mb: 2 }}>
                        <Typography variant="body">Image</Typography>
                        {existingImage && !imageFile && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                    mt: 2,
                                    mb: 2,
                                }}
                            >
                                <Typography variant="body2">Current: {existingImage}</Typography>
                                <IconButton
                                    color="error"
                                    onClick={() => setExistingImage('')}
                                    size="small"
                                >
                                    <Delete />
                                </IconButton>
                            </Box>
                        )}

                        {imageFile ? (
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                    mt: 2,
                                    mb: 2,
                                }}
                            >
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
                            </Box>
                        ) : (
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    mt: 2,
                                    gap: 2,
                                }}
                            >
                                <Button
                                    variant="outlined"
                                    component="label"
                                    startIcon={<PhotoCamera />}
                                    sx={{ minWidth: 200 }}
                                >
                                    Choose Image
                                    <input
                                        type="file"
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
                        value={formData.summary}
                        onChange={handleInputChange}
                        multiline
                        rows={3}
                        fullWidth
                        error={Boolean(errors.summary)}
                        helperText={errors.summary}
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Edit Book
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default Edit;

