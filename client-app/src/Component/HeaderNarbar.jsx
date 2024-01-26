import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import Notiflix from "notiflix";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import { 
  signoutUserFailure, 
  signoutUserStart, 
  signoutUserSuccess 
} from '../Redux/User/AuthSlice';
import { toggleTheme } from '../Redux/Theme/ThemeSlice';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

const HeaderNarbar = () => {

    const path = useLocation().pathname;
    const { theme } = useSelector((state) => state.theme);
    const { currentUser } = useSelector(state => state.user); 
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignout = async () =>{
      try {
        dispatch(signoutUserStart());
        const res = await fetch(`${API_BASE_URL}/api/auth/signout`);
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
    <Navbar className='border-b-2'>
       <Link to={'/'} className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>

        <span className='px-2 py-1 bg-[#166534] rounded-lg text-white'>
          Hovor
        </span>
        Blog
      </Link>

      <form>
        <TextInput
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline'
        />
      </form>

      <Button className='w-12 h-10 lg:hidden' color='gray' pill>
        <AiOutlineSearch />
      </Button>

      <div className='flex gap-2 md:order-2'>
        <Button className='w-12 h-10 hidden sm:inline' color='gray' pill  onClick={() => dispatch(toggleTheme())}>
        {theme === 'light' ? <FaSun /> : <FaMoon />}
        </Button>

        {currentUser ? (
           <Dropdown
           arrowIcon={false}
           inline
           label={
             <Avatar alt='user' img={currentUser.photo} rounded />
           }
         >
           <Dropdown.Header>
             <span className='block text-sm'>@{currentUser.username}</span>
             <span className='block text-sm font-medium truncate'>
               {currentUser.email}
             </span>
           </Dropdown.Header>
           <Link to={'/dashboard?tab=profile'}>
             <Dropdown.Item>Profile</Dropdown.Item>
           </Link>
           <Dropdown.Divider />
           <Dropdown.Item onClick={confirmLoggedout}>Sign out</Dropdown.Item>
         </Dropdown>
        ) : (
          <Link to={'/sign-in'}>
          <Button gradientDuoTone='purpleToBlue' outline>
            Sign In
          </Button>
        </Link>
        )} 
          <Navbar.Toggle />
      </div>

      <Navbar.Collapse>

       <Navbar.Link active={path === '/'} as={'div'}>
          <Link to='/'>Home</Link>
        </Navbar.Link> 
        <Navbar.Link active={path === '/about'} as={'div'}>
          <Link to='/about'>About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/contact'} as={'div'}>
          <Link to='/contact'>Contact</Link>
        </Navbar.Link>

      </Navbar.Collapse>

    </Navbar>
  )
}

export default HeaderNarbar;
