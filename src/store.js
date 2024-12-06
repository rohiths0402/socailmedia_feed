// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slice/userSlice";
import postsReducer from "./Slice/postsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
  },
});

export default store;
