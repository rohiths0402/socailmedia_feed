// src/slices/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: null,
  email: null,
  photoURL: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.photoURL = action.payload.photoURL;
    },
    logout: (state) => {
      state.username = null;
      state.email = null;
      state.photoURL = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
