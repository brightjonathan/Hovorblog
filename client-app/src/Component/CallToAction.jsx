import { Button } from 'flowbite-react';
import { Link } from 'react-router-dom'

const CallToAction = () => {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
    <div className="flex-1 justify-center flex flex-col">
        <h2 className='text-2xl'>
            Want to know more about the world?
        </h2>
        <p className='text-gray-500 my-2'>
            Checkout these resources with 100 of articles
        </p>
        <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none'>
            <Link to={'/search'}>
                articles
            </Link>
        </Button>
    </div>
    <div className="p-7 flex-1">
        <img src="https://i.ibb.co/sy85W5K/beach.jpg" alt="beach" border="0"/>
    </div>
</div>
  )
}

export default CallToAction;
