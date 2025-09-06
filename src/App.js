import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import About from './pages/About';
import Footer from './components/Footer';
import Contact from './pages/Contact';
import { ToastContainer } from 'react-toastify';
import { useAuth } from './context/AuthProvider';
import View from './pages/View';
import Cart from './pages/Cart';
import Categories from './pages/Categories';
import ScrollToTop from './components/ScrollToTop';
import Success from './pages/Success';
import Cancel from './pages/Cancel';


function App() {
  const { user } = useAuth();
  return (
    <BrowserRouter>
      <ToastContainer />
      <ScrollToTop />
      {user ? <><Navbar />
        <Routes >
          <Route path='/' element={<Home />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/contact' element={<Contact />}></Route>
          <Route path='/book/:id' element={<View />}></Route>
          <Route path='/categories' element={<Categories />}></Route>
          <Route path='/cart' element={<Cart />}></Route>
          <Route path='/success' element={<Success />}></Route>
          <Route path='/cancel' element={<Cancel />}></Route>
        </Routes><Footer /></> : <Login />}


    </BrowserRouter>
  );
}

export default App;
