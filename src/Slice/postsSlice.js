import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [
    {
      id: 13,
      name: "Daniel Harris",
      timestamp: "2024-12-06T21:00:00Z",
      text: "Just got a new!",
      hashtags: '["#puppy", "#cute"]',
      images: "",
      likes: 90,
      video:
        "https://v1.pinimg.com/videos/mc/720p/c0/1d/12/c01d124f8c97b75a78fb20800e0f8cf8.mp4",
    },
  ], // Initialize as an empty array
  loading: false,
  lastVisible: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = [...state.posts, ...action.payload.posts];
      state.lastVisible = action.payload.lastVisible;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setPosts, setLoading } = postsSlice.actions;
export default postsSlice.reducer;
