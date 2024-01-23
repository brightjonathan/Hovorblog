import React from 'react';
import './App.css';
import {  Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import HeaderNarbar from './Component/HeaderNarbar';


const App = () => {
  return (
    <div>
      <HeaderNarbar />
      <Routes>
      <Route path='/' element={<Home />} />
      </Routes>
    </div>
  )
};

export default App;
