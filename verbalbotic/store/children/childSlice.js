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
    },
    getChildrenFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addChildRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    clearChildrenErrors: (state) => {
      state.error = null;
    },
  },
});

export const childrenActions = childrenSlice.actions;
export default childrenSlice.reducer;
