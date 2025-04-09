import {  logout, setLoading, setUser } from '../slices/authSlice';
import axios from '../../utils/axios';

export const loginUser = (data,navigate) => async (dispatch) => {
  try {
    const res = await axios.post('/auth/login', data);
    const { user } = res.data;
    dispatch(setUser(user));
    navigate('/dashboard');
    console.log("Log in success");
  } catch (error) {
    console.error('Login failed:', error.response?.data?.message);
  }
};

export const loadUser = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const { data } = await axios.get('/auth/user', { withCredentials: true });
      dispatch(setUser(data.user));
    } catch (err) {
      dispatch(logout());
    } finally {
      dispatch(setLoading(false));
    }
};

export const logoutUser =(navigate)=> async(dispatch)=>{
  try {
    const { data } = await axios.post('/auth/logout', { withCredentials: true });
    dispatch(logout());
    console.log("Logged out.")
    navigate('/');
  } catch (error) {
    console.log(error)
    
  }
}