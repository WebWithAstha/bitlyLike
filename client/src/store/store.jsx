import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import linkSlice from './slices/linkSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    links: linkSlice,
  },
});

