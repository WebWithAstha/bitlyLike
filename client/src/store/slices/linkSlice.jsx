import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allLinks: [],
  selectedLinkAnalytics: null,
  quick:null,
  loading: false,
  error: null,
};

const linkSlice = createSlice({
  name: 'links',
  initialState,
  reducers: {
    setLinks: (state, action) => {
      state.allLinks = action.payload;
    },
    setSelectedAnalytics: (state, action) => {
      state.selectedLinkAnalytics = action.payload;
    },
    
    setQuick: (state, action) => {
      state.quick = action.payload;
    },
    
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearAnalytics: (state) => {
      state.selectedLinkAnalytics = null;
    },
    addLink: (state, action) => {
      state.allLinks.push(action.payload);
    },
  },
});

export const {
  setLinks,
  setSelectedAnalytics,
  setLoading,
  setError,
  setQuick,
  clearAnalytics,
  addLink,
} = linkSlice.actions;

export default linkSlice.reducer;
