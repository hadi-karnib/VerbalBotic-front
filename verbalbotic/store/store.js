import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import chatReducer from "./Chats/chatsSlice";
import childrenReducer from "./children/childSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    chats: chatReducer,
    children: childrenReducer,
  },
});

export default store;
