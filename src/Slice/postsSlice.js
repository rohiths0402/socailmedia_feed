// src/slices/postsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  loading: false, // Add loading state here
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
      state.loading = false; // Set loading to false when posts are set
    },
    addPost: (state, action) => {
      state.posts.unshift(action.payload);
    },
    setLoading: (state) => {
      state.loading = true; // Set loading to true when fetching starts
    },
  },
});

export const { setPosts, addPost, setLoading } = postsSlice.actions;

export default postsSlice.reducer;
