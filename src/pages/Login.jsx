import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  TextField,
  Button,
  Typography,
  Paper,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  IconButton
} from '@mui/material';

import { styled, useTheme } from '@mui/material/styles';
import { useAuth } from '../context/AuthProvider';
import { safeParse } from 'valibot';
import { loginSchema, signupSchema } from '../Validation/userSchema';
import { PhotoCamera, Visibility, VisibilityOff, Delete } from '@mui/icons-material';

const StyledPaper = styled(Paper)(({ theme }) => ({
  maxWidth: 800,
  margin: 'auto',
  marginTop: theme.spacing(10),
  overflow: 'hidden',
  boxShadow: theme.shadows[6],
  borderRadius: theme.spacing(2),
  display: 'flex',
  flexDirection: 'row',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    marginTop: theme.spacing(0),
    borderRadius: theme.spacing(0),
    boxShadow: theme.shadows[0],
    maxWidth: '100vw'
  },
}));

const LeftSide = styled(Box)(({ theme }) => ({
  flex: 1,
  backgroundImage:
    'url(https://images.unsplash.com/photo-1571596667548-606cf9fe27c6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  [theme.breakpoints.down('md')]: {
    minHeight: '40vh'
  },
}));

const RightSide = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(6),
  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(3),
    minHeight: 600
  },
}));



const Login = () => {

  const theme = useTheme();
  const [tab, setTab] = useState(0);
  const [isSeller, setIsSeller] = useState(false);
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const { login, signup } = useAuth();

  const handleTabChange = (_, newValue) => setTab(newValue);
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
    email: "",
  });


  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const handleClickShowSignupPassword = () => {
    setShowSignupPassword(!showSignupPassword);
  }

  const handleFieldChange = (fieldName, value) => {
    setFormValues(prev => ({ ...prev, [fieldName]: value }));

    // Clear error for this field if it exists
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: undefined }));
    }
  };


  const handleLogin = (e) => {
    e.preventDefault();
    const result = safeParse(loginSchema, { username : formValues.username, password : formValues.password });
    if (!result.success) {
      const fieldErrors = {};
      result.issues.forEach(issue => {
        const field = issue.path?.[0].key;

        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
    login(formValues.username, formValues.password);


  }

  // handle file selection

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
          setErrors({ ...errors, image: "Please select an image file" });
          return;
        }

        // Validate file size (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
          setErrors({ ...errors, image: "Image size must be less that 5MB" });
          return;
        }

        setImageFile(file);
      }
    }
  }

  //Remove selected Image

  const handleRemoveImage = () => {
    setImageFile(null);
  }

  const handleSignUp = (e) => {
    e.preventDefault();


    const result = safeParse(signupSchema, { username : formValues.username, password : formValues.password, image: imageFile, email : formValues.email });
    if (!result.success) {
      const fieldErrors = {};
      result.issues.forEach(issue => {
        const field = issue.path?.[0].key;

        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
    signup(formValues.username, formValues.password, imageFile, isSeller ? 'seller' : 'buyer', formValues.email);



  }

  return (
    <StyledPaper>
      <LeftSide />

      <RightSide>
        <Tabs
          value={tab}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="secondary"
          variant="fullWidth"
          sx={{ marginBottom: 4 }}
        >
          <Tab label="Sign In" />
          <Tab label="Sign Up" />
        </Tabs>

        {tab === 0 ? (
          <>
            <Typography variant="h5" fontFamily="Playfair Display" gutterBottom>
              Welcome Back
            </Typography>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              margin="normal"
              value={formValues.username}
              onChange={(e) => handleFieldChange("username", e.target.value)}
              error={Boolean(errors.username)}
              helperText={errors.username}
            />
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              margin="normal"
              value={formValues.password}
              onChange={(e) => handleFieldChange("password", e.target.value)}
              error={Boolean(errors.password)}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
              onClick={handleLogin}
            >
              Sign In
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h5" fontFamily="Playfair Display" gutterBottom>
              Create an Account
            </Typography>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              margin="normal"
              value={formValues.username}
              onChange={(e) => handleFieldChange("username", e.target.value)}
              error={Boolean(errors.username)}
              helperText={errors.username}
            />
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type={showSignupPassword ? "text" : "password"}
              margin="normal"
              value={formValues.password}
              onChange={(e) => handleFieldChange("password", e.target.value)}
              error={Boolean(errors.password)}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={handleClickShowSignupPassword} edge="end">
                      {showSignupPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <Box sx={{ mt: 2, mb: 2 }}>
              <Typography variant="body">
                Profile Image
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
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              value={formValues.email}
              onChange={(e) => handleFieldChange("email", e.target.value)}
              error={Boolean(errors.email)}
              helperText={errors.email}
            />
            <Box mt={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isSeller}
                    onChange={(e) => setIsSeller(e.target.checked)}
                    name="role"
                    color="primary"
                  />
                }
                label="Sign up as Seller"
              />
            </Box>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
              onClick={handleSignUp}
            >
              Sign Up
            </Button>
          </>
        )}
      </RightSide>
    </StyledPaper>
  );
};

export default Login;
