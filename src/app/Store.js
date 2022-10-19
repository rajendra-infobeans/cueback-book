/* eslint-disable import/no-named-as-default */
import { configureStore } from '@reduxjs/toolkit';
import HeadSlice from './reducers/HeadSlice';
import BookMemorySlice from './reducers/BookMemorySlice';
export const store = configureStore({
  reducer: {
    head: HeadSlice,
    bookMemory:BookMemorySlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
