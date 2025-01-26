import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  token: localStorage.getItem("token") || null, // Token should be a string, no need to parse it
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setSignupData(state, action) {
      state.signupData = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload; // Set the token
    },
    setUser(state, action) {
      state.user = action.payload; // Set user details
    },
    clearAuth(state) {
      state.user = null; // Clear user details
      state.token = null; // Clear token
    },
  },
});

export const { setSignupData, setLoading, setToken, setUser, clearAuth } = authSlice.actions;

export default authSlice.reducer;
