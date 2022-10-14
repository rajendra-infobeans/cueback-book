/* eslint-disable import/no-named-as-default */
import { configureStore } from '@reduxjs/toolkit';
// import CommentSlice from './reducers/CommentSlice';
// import MemorySlice from './reducers/MemorySlice';
import LoginSlice from './reducers/LoginSlice';
// import AddMemorySlice from './reducers/AddMemorySlice';
// import CollectionSlice from './reducers/CollectionSlice';
// import  PromptsSlice  from './reducers/PromptsSlice';
import HeadSlice from './reducers/HeadSlice';
import UserSlice from './reducers/UserSlice';
import BookMemorySlice from './reducers/BookMemorySlice';
export const store = configureStore({
  reducer: {
    // comment: CommentSlice,
    // memory: MemorySlice,
    login: LoginSlice,
    // addMemory: AddMemorySlice,
    // collection: CollectionSlice,
    // prompt: PromptsSlice,
    head: HeadSlice,
    user:UserSlice,
    bookMemory:BookMemorySlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
