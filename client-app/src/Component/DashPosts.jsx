import { useEffect, useState } from 'react';
import { Modal, Table, Button } from 'flowbite-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";



const DashPosts = () => {

  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
          //console.log(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser) {
      fetchPosts();
    }
  }, [currentUser._id]);


  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(
        `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };


    //delete func...
    const delProduct = async (_id) => {
      
    try {
      const res = await fetch(
        `/api/post/deletepost/${_id}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (!res.ok) {
        //console.log(data.message);
        //toast.success(data.message)
        toast.success('post deleted')
      } else {
        setUserPosts((prev) =>
          prev.filter((post) => post._id !== _id)
        );
        
      }
     } catch (error) {
      console.log(error.message);
     }
     
    };
  
    const confirmDelete = (_id) => {
      confirmAlert({
        title: "Delete Post",
        message: "Are you sure you want to delete this Post.",
        buttons: [
          {
            label: "Delete",
            onClick: () => delProduct(_id),
          },
          {
            label: "Cancel",
            // onClick: () => alert('Click No')
          },
        ],
      });
    };



  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
    {currentUser && userPosts.length > 0 ? (
      <>
        <Table hoverable className='shadow-md'>
          <Table.Head >
            <Table.HeadCell>Date updated</Table.HeadCell>
            <Table.HeadCell>Post image</Table.HeadCell>
            <Table.HeadCell>Post title</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
            <Table.HeadCell> <span>Edit</span> </Table.HeadCell>
          </Table.Head>
          {userPosts.map((post) => {
            const {_id} = post;
            return (
            <Table.Body className='divide-y' key={_id}>
              <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                <Table.Cell>
                  {new Date(post.updatedAt).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell>
                  <Link to={`/post/${post.slug}`}>
                    <img
                      src={post.image}
                      alt={post.title}
                      className='w-20 h-10 object-cover bg-gray-500'
                    />
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <Link
                    className='font-medium text-gray-900 dark:text-white'
                    to={`/post/${post.slug}`}
                  >
                    {post.title}
                  </Link>
                </Table.Cell>
                <Table.Cell>{post.category}</Table.Cell>
                <Table.Cell>
                  <span
                    onClick={() => confirmDelete(_id)}  
                   className='font-medium text-red-500 hover:underline cursor-pointer'>
                    Delete
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <Link
                    className='text-teal-500 hover:underline'
                    to={`/update-post/${_id}`}
                  >
                    <span>Edit</span>
                  </Link>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
            )})}
        </Table>
        {showMore && (
          <button
            onClick={handleShowMore}
            className='w-full text-teal-500 self-center text-sm py-7'
          >
            Show more
          </button>
        )}
      </>
    ) : (
      <p>You have no posts yet!</p>
    )}
    
  </div>
  )
}

export default DashPosts;



