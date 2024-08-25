import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUserRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    loginUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signupUserRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    signupUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    signupUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateUserSuccess: (state, action) => {
      state.loading = false;
      state.user = { ...state.user, ...action.payload };
    },
    updateUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      state.loading = false;
    },
    getSelfRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getSelfSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
