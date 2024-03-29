import { useState, useEffect } from 'react';
import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../Firebase/FirebaseConfig';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate, useParams} from 'react-router-dom';
import { toast } from "react-toastify";


const initialState = {
    title: "",
    category: "",
    content: "",
    image: ""
  };
  
  
  const categoryOptions = [
    "health",
    "education",
    "sport",
    "technology",
    "politics",
    "history",
    "development",
    "business",
  ];

const UpdatePage = () => {


    const navigate = useNavigate();
    const {postId} = useParams();

  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [loading, setLoading] = useState(false);


  const [formData, setFormData] = useState(initialState);


  useEffect(()=>{
 try {

    const fetchPost = async () => {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          toast.error(data.message);
          return;
        }
        if (res.ok) {
          setFormData(data.posts[0]);
        }
      };

      fetchPost();
    
 } catch (error) {
    console.log(error.message);
 }
  },[postId]);


  //targetting the category input
const onCategoryChange = (e) => {
  setFormData({ ...formData, category: e.target.value });
};


const handleChange = (e) => {
  setFormData({...formData, [e.target.id]: e.target.value});
};

const handleChange2 = (content, delta, source, editor)=>{
  setFormData({ ...formData, content: content });
}

const handleUpdloadImage = async () => {
  try {
    if (!file) {
      setImageUploadError('Please select an image');
      return;
    }
    setImageUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + '-' + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageUploadError('Image upload failed');
        setImageUploadProgress(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUploadProgress(null);
          setImageUploadError(null);
          setFormData({ ...formData, image: downloadURL });
        });
      }
    );
  } catch (error) {
    setImageUploadError('Image upload failed');
    setImageUploadProgress(null);
    //console.log(error);
  }
};


const handleSubmit = async (e)=>{
  e.preventDefault();
 
  try {
    const res = await fetch(`/api/post/updatepost/${postId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (!res.ok) {
      toast.error(data.message);
      return;
    }

    if (res.ok) {
      navigate(`/post/${data.slug}`);
      toast.success('updated successfully');
    }
  } catch (error) {
    toast.error(error.message);
  }

  
};




  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'> Update a post </h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput
            required
            value={formData.title}
            type='text'
            placeholder='Title'
            id='title'
            className='flex-1'
            onChange={handleChange}
          />
          <Select required value={formData.category} onChange={onCategoryChange}>
          <option>Select a category</option>
                  {categoryOptions.map((option, index) => (
                    <option value={option || ""} key={index}> {option} </option>
                  ))}
          </Select>
        </div>
        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
          <FileInput
            type='file'
            accept='image/*'
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type='button'
            gradientDuoTone='purpleToBlue'
            size='sm'
            outline
            onClick={handleUpdloadImage}
             disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className='w-16 h-16'>
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              'Upload Image'
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt='upload'
            className='w-full h-72 object-cover'
          />
        )}
        <ReactQuill
          theme='snow'
          value={formData.content}
          placeholder='Write something...'
          className='h-72 mb-12'
          required
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
          //onChange={handleChange2}
        />
        <Button type='submit' gradientDuoTone='purpleToPink'>
           {loading ? (<p>Loading...</p>) : (<p>Update</p>)}
        </Button>
      </form>
    </div>
  )
}

export default UpdatePage;
