import axios from 'axios';
import React, { createContext, useContext, useState } from 'react'
import { toast } from 'react-toastify';
import { useCart } from './CartProvider';
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const userData = JSON.parse(window.localStorage.getItem('User Data') || null);
    return userData;
  });

  const [error, setError] = useState('');
  const { fetchCart } = useCart();

  const login = async (username, password) => {
    try {
      const res = await axios.post('http://localhost:3000/user/login', { username, password });
      const token = res.data.data;
      setUser(res.data.user);
      window.localStorage.setItem('User Data', JSON.stringify(res.data.user));
      window.localStorage.setItem("token", token);
      fetchCart();
      toast.success("Valid User. Welcome Back.");
      setError("");
    }
    catch (err) {
      setError(err.response?.data?.message || 'login failed');
      toast.error("Invalid user", {
        className: 'error-toast'
      });
    }
  }

  const signup = async (username, password, imageFile, role, email) => {
    try {
      const res = await axios.post('http://localhost:3000/user/register', { username, password, user_img: imageFile, role, email },
        {
          headers: {
            'Content-Type': 'multipart/form-data' // important for file uploads
          }
        }
      );
      const token = res.data.data;
      window.localStorage.setItem("User Data", JSON.stringify(res.data.user));
      window.localStorage.setItem("token", token);
      setUser(res.data.user)
      fetchCart();
      toast.success("New User Created");
      setError('');
    }
    catch (err) {
      setError(err.response?.data?.message || "Sign Up failed");
      toast.error(err.response?.data?.message || "Sign Up failed");
    }
  }

  const logout = () => {
    window.localStorage.removeItem('User Data');
    window.localStorage.removeItem('token');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ login, logout, signup, user, error }}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider

export const useAuth = () => {
  return useContext(AuthContext);
}
