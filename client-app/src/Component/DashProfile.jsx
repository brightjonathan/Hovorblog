import React from 'react';
import { useSelector } from 'react-redux';

const DashProfile = () => {

  const {currentUser} = useSelector((state) => state.user);

  return (
<div class="max-w-lg mx-auto my-10  rounded-lg shadow-md p-5">
    <img class="w-32 h-32 rounded-full mx-auto" src={currentUser?.photo} alt="Profile picture" />
    <h2 class="text-center text-2xl font-semibold mt-3">{currentUser?.username}</h2>
    <p class="text-center text-gray-600 mt-1">Software Engineer</p>
    <p class="text-center text-gray-600 mt-1">{currentUser?.email}</p>
    <p class="text-center text-gray-600 mt-1">{currentUser?.phone}</p>

    <div class="flex justify-center mt-5">
      <a href="#" class="text-blue-500 hover:text-blue-700 mx-3">Twitter</a>
      <a href="#" class="text-blue-500 hover:text-blue-700 mx-3">LinkedIn</a>
      <a href="#" class="text-blue-500 hover:text-blue-700 mx-3">GitHub</a>
    </div>

    <div class="mt-5">
      <h3 class="text-xl font-semibold">Bio</h3>
      <p class="text-gray-600 mt-2">{currentUser?.bio} is a software engineer with over 10 years of experience in developing web and mobile applications. He is skilled in JavaScript, React, and Node.js.</p>
    </div>
  
  <button className="w-full mt-5 block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300">Edit</button>
  </div>
  )
}

export default DashProfile;
