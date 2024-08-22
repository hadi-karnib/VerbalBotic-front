import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  status: "idle",
  error: null,
  token: null, // Add a token to store the JWT
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signupUserRequest: (state) => {
      state.status = "loading";
      state.error = null;
    },
    signupUserSuccess: (state, action) => {
      state.status = "succeeded";
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    signupUserFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    updateUserRequest: (state) => {
      state.status = "loading";
      state.error = null;
    },
    updateUserSuccess: (state, action) => {
      state.status = "succeeded";
      state.user = action.payload;
    },
    updateUserFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    loginUserRequest: (state) => {
      state.status = "loading";
      state.error = null;
    },
    loginUserSuccess: (state, action) => {
      state.status = "succeeded";
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    loginUserFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
