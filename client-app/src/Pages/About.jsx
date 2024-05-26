import React from 'react';


const About = () => {
  return (
    <>
    <div className='w-full h-[100%] pt-[10vh] flex flex-col justify-between'>
    <div className='grid md:grid-cols-2 max-w-[1240px] m-auto'>
     <div className='flex flex-col justify-center md:items-start w-full px-2 py-8 sm:ml-6 mt-[-20vh]' >
        <p className='text-4xl mt-[20vh] lg:text-7xl  font-extrabold'> Who we are and <br/> what we do  </p>
        <h1 className='pt-8 text-[14px] sm:text-xl m-4'> Welcome to Hovor Blog, Our mission is to provide a platform for sharing knowledge, experiences, and perspectives on a wide range of topics, from the latest tech trends and gadgets to personal growth, productivity, and wellness. We strive to create content that is informative, engaging, and thought-provoking, and that resonates with our diverse audience. </h1>
     </div>
     <div className='ml-[2vh]'>
        <img src='https://i.ibb.co/r0VPvLT/possibility.png' alt='possibilty' className='w-[100%] rounded-lg' border="0" loading='lazy' /> 
     </div>
    </div>
</div>

<div className='w-full h-[100%] pt-[10vh] flex flex-col justify-between'>
    <div className='grid md:grid-cols-2 max-w-[1240px] m-auto'>
    <div className='m-[2vh] lg:mt-[10vh]'>
        <img src='https://i.ibb.co/7V3XX60/about.jpg' alt='imageurl' className='w-[100%] ' loading='lazy' />
     </div>
     <div className='flex flex-col justify-center md:items-start w-full px-2 py-8 sm:ml-6 mt-[-20vh]' >
      <p  className='text-4xl mt-[20vh] lg:text-3xl  font-extrabold> our vision'> OUR VISION</p>
        <p className='pt-3'> Who we are and what we do  </p>
        <h1 className='sm:text-xl Tcolor text-[14px]'>Our vision is to create a vibrant online community where individuals can share their thoughts, ideas, and experiences through engaging and informative blog posts. We aim to provide a platform that inspires creativity, sparks meaningful conversations, and fosters a sense of connection among readers and writers from diverse backgrounds.</h1>
     </div>
    </div>
</div>
    </>
  )
}

export default About;


