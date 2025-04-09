import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader.jsx'
import { loadUser } from '../store/actions/authActions.jsx'; // update path if needed

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const [attemptedLoad, setAttemptedLoad] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(loadUser());
    }
  }, [isAuthenticated,  dispatch]);

  if (loading) {
    return <Loader/>; 
  }
  if (!isAuthenticated) {
    navigate("/");
    return null;
  }
  return children;
};

export default ProtectedRoute;
