// src/store/userSlice.js (or wherever your user slice is defined)
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  displayName: null, // Or a fallback value if necessary
  photoURL: null, // Or a fallback value if necessary
  email: null, // Add any other fields you need
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.displayName = action.payload.displayName;
      state.photoURL = action.payload.photoURL;
      state.email = action.payload.email;
    },
    clearUser: (state) => {
      state.displayName = null;
      state.photoURL = null;
      state.email = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
