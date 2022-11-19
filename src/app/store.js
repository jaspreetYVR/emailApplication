import { configureStore } from '@reduxjs/toolkit';
import mailReducer from "../features/mailSlice.js";
import userSlice from '../features/userSlice.js';

export const store = configureStore({
  reducer: {
    mail: mailReducer,
    user: userSlice
  }
});
