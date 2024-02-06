import { Alert, Button, Modal, ModalBody, TextInput , Textarea} from 'flowbite-react';
import {useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
  } from 'firebase/storage';
import {app} from '../Firebase/FirebaseConfig';
import { CircularProgressbar } from 'react-circular-progressbar';
 import 'react-circular-progressbar/dist/styles.css';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { 
    updateProfileFailure, 
    updateProfileStart, 
    updateProfileSuccess 
} from '../Redux/User/AuthSlice';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

const DashEditProfile = () => {

    const filePickerRef = useRef(null);
    const dispatch = useDispatch();

  const { currentUser} = useSelector((state) => state.user);

  const initialState = {
    username: currentUser?.username,
    phone: currentUser?.phone,
    bio: currentUser?.bio,
    photo: currentUser?.photo,
  };


const [formData, setFormData] = useState(initialState);
const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
const [imageFileUploadError, setImageFileUploadError] = useState(null);
const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
const [updateUserError, setUpdateUserError] = useState(null);
const [imageFileUploading, setImageFileUploading] = useState(false);
const [fileUploadError, setFileUploadError] = useState(false);
const [imageFile, setImageFile] = useState(null);
const [imageFileUrl, setImageFileUrl] = useState(null);
const [loading, setLoading] = useState(false);


const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setImageFile(file);
    setImageFileUrl(URL.createObjectURL(file));
  }
};

useEffect(() => {
  if (imageFile) {
    uploadImage();
  }
}, [imageFile]);


const uploadImage = async () => {

  setImageFileUploading(true);
  setImageFileUploadError(null);
  const storage = getStorage(app);
  const fileName = new Date().getTime() + imageFile.name;
  const storageRef = ref(storage, fileName);
  const uploadTask = uploadBytesResumable(storageRef, imageFile);
  uploadTask.on(
    'state_changed',
    (snapshot) => {
      const progress =
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

      setImageFileUploadProgress(progress.toFixed(0));
    },
    (error) => {
      toast.error('Could not upload image (File must be less than 2MB)')
      // setImageFileUploadError(
      //   'Could not upload image (File must be less than 2MB)'
      // );
      console.log(error.message);
      setImageFileUploadProgress(null);
      setImageFile(null);
      setImageFileUrl(null);
      setImageFileUploading(false);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setImageFileUrl(downloadURL);
        setFormData({ ...formData, photo: downloadURL });
        console.log({ ...formData, profilePicture: downloadURL });
        setImageFileUploading(false);
      });
    }
  );
};



const handleSubmit = async (e) => {
  e.preventDefault();

  setUpdateUserError(null);
  setUpdateUserSuccess(null);
  if (Object.keys(formData).length === 0) {
    toast.error('No changes made');
    return;
  }

  if (imageFileUploading) {
    toast.error('Please wait for image to upload');
    return;
  }

  try {
      setLoading(true);
      dispatch(updateProfileStart())
    const res = await fetch(`${API_BASE_URL}/api/profile/updateprofile/${currentUser._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      dispatch(updateProfileFailure(data.message))
      setLoading(false);
      toast.error(data.message);
    } else {
      dispatch(updateProfileSuccess(data));
      setFormData(data)
      console.log(data);
      toast.success("profile updated successfully");
    }
  } catch (error) {
      setLoading(false);
      dispatch(updateProfileFailure(error.message));
    toast.error(error.message);
  }
};

const handleChange = (e) => {
  setFormData({ ...formData, [e.target.id]: e.target.value });
};

return (
    <div className='max-w-lg mx-auto p-3 w-full'>
    <h1 className='my-7 text-center font-semibold text-3xl'>Update Profile</h1>
    <form className='flex flex-col gap-4' onSubmit={handleSubmit} >
      <input
        type='file'
        accept='image/*'
        onChange={handleImageChange}
        ref={filePickerRef}
        hidden
      />
      <div
        className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'
        onClick={() => filePickerRef.current.click()}
      >
        {imageFileUploadProgress && (
          <CircularProgressbar
          value={imageFileUploadProgress || 0}
          text={`${imageFileUploadProgress}%`}
            strokeWidth={5}
            styles={{
              root: {
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
              },
              path: {
                stroke: `rgba(62, 152, 199, ${
                  imageFileUploadProgress / 100
                })`,
              },
            }}
          />
        )} 
        <img
          src={imageFileUrl || currentUser.photo}
          alt='user'
          className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
            imageFileUploadProgress &&
            imageFileUploadProgress < 100 &&
            'opacity-60'
          }`}
        />
      </div>
      {imageFileUploadError && (
          <Alert color='failure'>{imageFileUploadError}</Alert>
        )}
      <TextInput
        type='text'
        id='username'
        placeholder='username'
        defaultValue={currentUser?.username}
        onChange={handleChange}
      />
      <TextInput
        type='text'
        id='phone'
        placeholder='enter your phone'
        defaultValue={currentUser?.phone}
        onChange={handleChange}
      />
      <Textarea
        type='text'
        id='bio'
        placeholder='your bio'
        defaultValue={currentUser.bio}
        onChange={handleChange}
      />
      <Button
        type='submit'
        gradientDuoTone='purpleToBlue'
        outline
        disabled={loading || imageFileUploading}
      >
        {loading ? 'Loading...' : 'Update'}
      </Button>
    </form>
  </div>
  )
}

export default DashEditProfile;

