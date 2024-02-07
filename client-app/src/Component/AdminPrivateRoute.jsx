import {Navigate, Outlet} from 'react-router-dom';
import {useSelector} from 'react-redux';

const AdminPrivateRoute = () => {

    const {currentUser} = useSelector(state => state.user); 

  return (
    <div>
    { currentUser.isAdmin ? (<Outlet/>) : (<Navigate to={'/sign-in'}/>) }
    </div>
  )
}

export default AdminPrivateRoute;
