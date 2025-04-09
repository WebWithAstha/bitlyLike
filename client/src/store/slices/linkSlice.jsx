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
  },
});

export const {
  setLinks,
  setSelectedAnalytics,
  setLoading,
  setError,
  setQuick,
  clearAnalytics,
} = linkSlice.actions;

export default linkSlice.reducer;
