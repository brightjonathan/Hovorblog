import React from 'react';
import './App.css';
import {  Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from './Pages/Home';
import HeaderNarbar from './Component/HeaderNarbar';
import Signup from './Pages/Auth/Signup';
import Signin from './Pages/Auth/Signin';


const App = () => {
  return (
    <div>
      <ToastContainer />
      <HeaderNarbar />
      <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/sign-up' element={<Signup />} />
      <Route path='/sign-in' element={<Signin/>} />
      </Routes>
    </div>
  )
};

export default App;
