import { useDispatch } from 'react-redux';
import { logoutUser } from '../actions/authActions';

const Navbar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-blue-600 text-white">
      <h1 className="text-xl font-bold">Link Dashboard</h1>
      <button onClick={handleLogout} className="bg-white text-blue-600 px-4 py-1 rounded">
        Logout
      </button>
    </nav>
  );
};
