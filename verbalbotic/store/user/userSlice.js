import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // Changed to store the logged-in user's data
  token: null, // Store the authentication token
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
      state.user = action.payload.user; // Assuming the response includes the user data
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
      state.user = action.payload.user; // Assuming the response includes the user data
      state.token = action.payload.token;
    },
    signupUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      state.loading = false;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
