import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import chatReducer from "./Chats/chatsSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    chats: chatReducer,
  },
});

export default store;
