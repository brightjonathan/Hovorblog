import { useEffect, useState } from 'react';
import { Sidebar } from 'flowbite-react';
import Notiflix from "notiflix";
import { HiUser, HiChartPie } from 'react-icons/hi';
import { GoSignOut } from "react-icons/go";
import { MdPostAdd } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { MdOutlineGroups3 } from "react-icons/md";
import { FaRegComments } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { 
  signoutUserFailure, 
  signoutUserStart, 
  signoutUserSuccess 
} from '../Redux/User/AuthSlice';



const DashSidebar = () => {
  
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState('');


    useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const tabFromUrl = urlParams.get('tab');
      if (tabFromUrl) {
        setTab(tabFromUrl);
      }
    }, [location.search]);


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
    <Sidebar className='w-full md:w-56'>
      <Sidebar.Items>
       <Sidebar.ItemGroup className='flex flex-col gap-1'>

        {currentUser.isAdmin && (
          <Link to={'/dashboard?tab=admin-dashboard'}>
             <Sidebar.Item
                active={tab ===  'admin-dashboard'}
                icon={HiChartPie}
                as='div'
              >
                Dashboard
              </Sidebar.Item>
          </Link>
             )}

             {currentUser.isAdmin && (
              <Link to={'/dashboard?tab=all-users'}>
              <Sidebar.Item
              active={tab === 'all-users'}
                icon={MdOutlineGroups3}
                as='div'
              >
                All Users
              </Sidebar.Item>
              </Link>
             )}

             {currentUser.isAdmin && (
               <Link to={'/dashboard?tab=comments'}>
               <Sidebar.Item
                  active={tab === 'comments'}
                  icon={FaRegComments}
                  as='div'
               > 
                comments
               </Sidebar.Item>
               </Link>
             )}

              <Link to='/dashboard?tab=profile'>
            <Sidebar.Item
              active={tab === 'profile'}
              icon={HiUser}
              label={currentUser.isAdmin ? 'Admin' : 'User'}
              labelColor='dark'
              as='div'
            >
              Profile
            </Sidebar.Item>
          </Link>
          <Link to='/dashboard?tab=edit-profile'>
          <Sidebar.Item
            // className="mt-3"
            active={tab === 'edit-profile'}
            icon={FaUserEdit}
            labelColor='dark'
            as='div'
            >
              Edit profile
            </Sidebar.Item>
          </Link>
          <Link to='/dashboard?tab=all-posts'>
          <Sidebar.Item
            // className="mt-3"
            active={tab === 'all-posts'}
            icon={MdPostAdd}
            labelColor='dark'
            as='div'
            >
              {currentUser.isAdmin ? 'All Admin posts' : 'All User posts'}
            </Sidebar.Item>
          </Link>

           <div className='flex m-[1vh]' onClick={confirmLoggedout}>
            <GoSignOut className='mr-4' size={24}/>
            <button className='pr-[3vh]'> Sign out </button>
           </div>

       </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar;



