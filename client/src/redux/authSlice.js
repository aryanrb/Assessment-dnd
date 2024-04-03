import { createSlice } from "@reduxjs/toolkit";

const initialUser = localStorage.getItem("auth")
  ? JSON.parse(localStorage.getItem("auth"))
  : null;

const initialState = {
  isLoading: false,
  currentUser: initialUser,
  error: null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
    },
  },
});

export const { loginFailure, loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;
