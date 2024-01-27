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

const DashEditProfile = () => {

    const filePickerRef = useRef();
    const dispatch = useDispatch();

  const { currentUser} = useSelector((state) => state.user);

  const initialState = {
    username: currentUser?.username,
    phone: currentUser?.phone,
    bio: currentUser?.bio,
    photo: currentUser?.photo,
};


  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [formData, setFormData] = useState(initialState);
  

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
        setImageFileUploadError(
          'Could not upload image (File must be less than 2MB)'
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
    <h1 className='my-7 text-center font-semibold text-3xl'>Update Profile</h1>
    <form className='flex flex-col gap-4'>
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
      {/* <TextInput
        type='text'
        id='title'
        placeholder='your title'
        defaultValue={currentUser.username}
        onChange={handleChange}
      /> */}
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
      >
        Update
      </Button>
    </form>
  </div>
  )
}

export default DashEditProfile;



