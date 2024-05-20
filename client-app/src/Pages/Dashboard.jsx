import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashSidebar from '../Component/DashSidebar';
import DashProfile from '../Component/DashProfile';
import DashEditProfile from '../Component/DashEditProfile';
import DashPosts from '../Component/DashPosts';
import AdminDashoard from '../Component/AdminDashoard';
import AllUsers from '../Component/AllUsers';
import DashComments from '../Component/DashComments';



const Dashboard = () => {

  const location = useLocation();
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);


  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
    <div className='md:w-56'>

      {/* Sidebar */}
       <DashSidebar />
    </div>
    {/* profile... */}
     { tab === 'profile' && <DashProfile /> }
     { tab === 'edit-profile' && <DashEditProfile /> }

    {/* posts... */}
    {tab === 'all-posts' && <DashPosts />}
    {/* users */}
    {tab === 'all-users' && <AllUsers/>}
    {/* comments  */}
    {tab === 'comments' && <DashComments />}
    {/* dashboard comp */}
    {tab === 'admin-dashboard' && <AdminDashoard/>}
    
  </div>
  )
}

export default Dashboard;
