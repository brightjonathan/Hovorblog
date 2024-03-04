import { Dropdown } from 'flowbite-react';
import { useDispatch } from 'react-redux';
import Notiflix from "notiflix";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { 
  signoutUserFailure, 
  signoutUserStart, 
  signoutUserSuccess 
} from '../Redux/User/AuthSlice';

const SignOut = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignout = async () =>{
      try {
        dispatch(signoutUserStart());
        const res = await fetch('/api/auth/signout');
        const data = await res.json();
        if (data.success === false) {
          dispatch(signoutUserFailure(data.message));
          return;
        }
          dispatch(signoutUserSuccess(data))
          toast.success("Sign out successfully");
          navigate('/sign-in')
       } catch (error) {
        dispatch(signoutUserFailure(data));
       }
    };


    const confirmLoggedout = () => {
      Notiflix.Confirm.show(
        "Logout Account!!!",
        "You are about to Signout from this account!!",
        "Signout",
        "Cancel",
        function okCb() {
          handleSignout();
        },
        function cancelCb() {
          console.log("Logout Canceled");
        },
        {
          width: "320px",
          borderRadius: "3px",
          titleColor: "blue",
          okButtonBackground: "green",
          cssAnimationStyle: "zoom",
        }
      );
    };



  return (
    <Dropdown.Item onClick={confirmLoggedout}>
      Sign out
    </Dropdown.Item>
  )
}

export default SignOut;
