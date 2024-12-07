import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [
    {
      id: 13,
      name: "Daniel Harris",
      timestamp: "2024-12-06T21:00:00Z",
      text: "Just got a new!",
      hashtags: '["#puppy", "#cute"]',
      images: null,
      likes: 90,
      video:
        "https://v1.pinimg.com/videos/mc/720p/c0/1d/12/c01d124f8c97b75a78fb20800e0f8cf8.mp4",
    },
    {
      id: 2,
      name: "Sophia Moore",
      timestamp: "2024-12-05T15:30:00Z",
      text: "Self love!",
      hashtags: '["#happy", "#drinks"]',
      images: "",
      likes: 120,
      video:
        "https://v1.pinimg.com/videos/mc/720p/28/13/7e/28137e8ed31f555d1da64e82ab88c40b.mp4",
    },
    {
      id: 3,
      name: "John",
      timestamp: "2024-12-07T10:15:00Z",
      text: "Had an amazing trip to the beach!",
      hashtags: '["#beach", "#vacation"]',
      images: "",
      likes: 200,
      video:
        "https://v1.pinimg.com/videos/mc/720p/d4/3b/3f/d43b3f1bd6fe00c0ef67c6652bdc0cb2.mp4",
    },
    {
      id: 4,
      name: "Emily Johnson",
      timestamp: "2024-12-04T08:00:00Z",
      text: "Best workout today!",
      hashtags: '["#fitness", "#health"]',
      images:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZDqOZPLMKZGCkjyEiNX9j3MKrqOFIBzmIyA&s",
      likes: 75,
      video: "",
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
