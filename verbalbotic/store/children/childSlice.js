import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  children: [],
  loading: false,
  error: null,
};

const childrenSlice = createSlice({
  name: "children",
  initialState,
  reducers: {
    getChildrenRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getChildrenSuccess: (state, action) => {
      state.loading = false;
      state.children = action.payload;
      console.log("Children data stored in state:", state.children);
    },
    getChildrenFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearChildrenErrors: (state) => {
      state.error = null;
    },
  },
});

export const childrenActions = childrenSlice.actions;
export default childrenSlice.reducer;
