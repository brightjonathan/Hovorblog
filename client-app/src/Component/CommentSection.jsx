import { Alert, Button, Modal, TextInput, Textarea } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const CommentSection = ({postId}) => {

    const { currentUser } = useSelector((state) => state.user);
    const [comment, setComment] = useState('');
    const [commentError, setCommentError] = useState(null);
    const [comments, setComments] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState(null);
    const navigate = useNavigate();


    //handles the submit functionality
    const handleSubmit = ()=> {

    };

  return (
    <div className='max-w-2xl mx-auto w-full p-3'>
      {currentUser ? 
      (
        <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
          <p>Signed in as:</p>
          <img
            className='h-5 w-5 object-cover rounded-full'
            src={currentUser.photo}
            alt=''
          />
          <Link
            to={'/dashboard?tab=profile'}
            className='text-xs text-cyan-600 hover:underline'
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className='text-sm text-teal-500 my-5 flex gap-1'>
        You must be signed in to comment.
        <Link className='text-blue-500 hover:underline' to={'/sign-in'}>
          Sign In
        </Link>
      </div>
      )}

      {currentUser && (
        <form
        onSubmit={handleSubmit}
        className='border border-teal-500 rounded-md p-3'
      >
        <Textarea
          placeholder='Add a comment...'
          rows='3'
          maxLength='250'
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        />
        <div className='flex justify-between items-center mt-5'>
          <p className='text-gray-500 text-xs'>
            {250 - comment.length} characters remaining
          </p>
          <Button outline gradientDuoTone='purpleToBlue' type='submit'>
            Submit
          </Button>
        </div>
        {/* {commentError && (
          <Alert color='failure' className='mt-5'>
            {commentError}
          </Alert>
        )} */}
      </form>
      )}
    </div>
  )
}

export default CommentSection;



