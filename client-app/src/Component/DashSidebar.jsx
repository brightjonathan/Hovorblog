import { useEffect, useState } from 'react';
import { Sidebar } from 'flowbite-react';
import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiAnnotation,
  HiChartPie,
} from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';



const DashSidebar = () => {

    const location = useLocation();
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    const [tab, setTab] = useState('');


    useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const tabFromUrl = urlParams.get('tab');
      if (tabFromUrl) {
        setTab(tabFromUrl);
      }
    }, [location.search]);


  return (
    <Sidebar className='w-full md:w-56'>
      <Sidebar.Items>
       <Sidebar.ItemGroup className='flex flex-col gap-1'>  
       <Sidebar.Item
                active={tab === 'dash' || !tab}
                icon={HiChartPie}
                as='div'
              >
                Dashboard
              </Sidebar.Item>

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
            icon={HiUser}
            labelColor='dark'
            as='div'
            >
              Edit profile
            </Sidebar.Item>
          </Link>
       </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar;



