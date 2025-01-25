import { configureStore } from "@reduxjs/toolkit";
import authenticationSlice from './authenticationSlice';

const store = configureStore({
  reducer: {
    authentication: authenticationSlice
  },
});

export default store;
