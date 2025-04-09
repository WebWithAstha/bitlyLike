import axios from '../../utils/axios.js';
import {
  setLinks,
  setSelectedAnalytics,
  setLoading,
  setError,
  setQuick,
} from '../slices/linkSlice.jsx';


export const fetchAllLinks = () => async (dispatch) => {
  dispatch(setLoading(true));
  console.log("at fetchAllLink")
  try {
    const res = await axios.get('/links');
    console.log(res)
    dispatch(setLinks(res.data));
  } catch (error) {
    console.log(error?.response?.data?.message)
    dispatch(setError(error));
  }
  dispatch(setLoading(false));
};

export const createShortLink = (formData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    console.log(formData)
    const res = await axios.post('/links/shorten', formData);
    console.log(res)
    dispatch(fetchAllLinks()); // Refresh list after creation
  } catch (error) {
    dispatch(setError(error.message));
  }
  dispatch(setLoading(false));
};

export const fetchAnalytics = (linkId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axios.get(`/analytics/${linkId}`);
    console.log(res);
    dispatch(setSelectedAnalytics(res.data));
  
  } catch (error) {
    console.log(error)
    dispatch(setError(error.message));
  }
  dispatch(setLoading(false));
};
export const fetchQuickStats = (linkId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axios.get(`/analytics/overview`);
    console.log(res);
    dispatch(setQuick(res.data));
  
  } catch (error) {
    console.log(error)
    dispatch(setError(error.message));
  }
  dispatch(setLoading(false));
};
export const clickShortUrl = (shortCode) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axios.get(`/${shortCode}`);
    console.log(res.data.msg)
    dispatch(fetchQuickStats())

  } catch (error) {
    console.log(error)
    dispatch(setError(error.message));
  }
  dispatch(setLoading(false));
};
