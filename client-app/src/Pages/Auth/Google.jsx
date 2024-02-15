import React from 'react';
import {FcGoogle} from 'react-icons/fc';
import { useDispatch } from 'react-redux';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { app } from '../../Firebase/FirebaseConfig';
import { signInSuccess } from '../../Redux/User/AuthSlice';

const Google = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async ()=>{
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
  
      const result = await signInWithPopup(auth, provider);
  
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
        }),
      });
  
      if (res.ok) {
        const data = await res.json();
        dispatch(signInSuccess(data));
        navigate('/');
      } else {
        console.error('Error during Google Sign-In:', res.status, res.statusText); 
      }
    } catch (error) {
      console.error('An error occurred during Google Sign-In:', error);    
    }
  };


  return (
    <button  onClick={handleGoogleClick} className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300">
          <div className="flex items-center justify-center">
          <FcGoogle className='w-7 h-7'/>
              <span className="ml-4"> Log in with Google </span>
          </div>
    </button>
  )
}

export default Google;



