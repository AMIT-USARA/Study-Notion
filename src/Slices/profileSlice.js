import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // Only store user details here, no need to store token
  loading: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload; // Update user details
    },
    setLoading(state, action) {
      state.loading = action.payload; // Update loading state
    },
    clearProfile(state) {
      state.user = null; // Clear user details
    },
  },
});

export const { setUser, setLoading, clearProfile } = profileSlice.actions;

export default profileSlice.reducer;
