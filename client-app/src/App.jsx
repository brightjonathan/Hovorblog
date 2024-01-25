import React from 'react';
import './App.css';
import {  Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from './Pages/Home';
import HeaderNarbar from './Component/HeaderNarbar';
import Signup from './Pages/Auth/Signup';
import Signin from './Pages/Auth/Signin';
import Footer1 from './Component/Footer';
import PrivateRoute from './Component/PrivateRoute';
import Dashboard from './Pages/Dashboard';


const App = () => {
  return (
    <div>
      <ToastContainer />
      <HeaderNarbar />

      <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/sign-up' element={<Signup />} /> 
      <Route path='/sign-in' element={<Signin/>} />

      {/* private route for users */}
      <Route element={<PrivateRoute/>}>
        <Route path='/dashboard' element={<Dashboard/>} />
      </Route>



      </Routes>
      
      <Footer1/>
      
    </div>
  )
};

export default App;


