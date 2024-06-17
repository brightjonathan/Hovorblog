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
import CreatePost from './Pages/CreatePost';
import AdminPrivateRoute from './Component/AdminPrivateRoute';
import UpdatePage from './Pages/UpdatePage';
import PostPage from './Component/PostPage';
import ScrollToTop from './Component/ScrollToTop';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Terms from './Pages/Terms';
import Privacy from './Pages/Privacy';
import Search from './Pages/Search';



const App = () => {
  return (
    <div>
      <ToastContainer />
      <HeaderNarbar />
      <ScrollToTop />

      <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/terms_&_conditions' element={<Terms/>}/>
      <Route path='/privacy_&_policy' element={<Privacy/>}/>
      <Route path='/sign-up' element={<Signup />} />
      <Route path='/sign-in' element={<Signin/>} />
      <Route path='/search' element={ <Search/> }/>
      <Route path='/post/:postslug' element={ <PostPage /> }/>

      {/* private route for users */}
      <Route element={<PrivateRoute/>}>
        <Route path='/dashboard' element={<Dashboard/>} /> 
      </Route>

     {/* Admin private route  */}
     <Route element={<AdminPrivateRoute/>} >
       <Route path='/create-post' element={<CreatePost />} />
       <Route path='/update-post/:postId' element={<UpdatePage/>} />
     </Route>

      </Routes>
      
      <Footer1/>

    </div>
  )
};

export default App;


