import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chats: [],
  loading: false,
  error: null,
  savingVoiceNote: false,
  saveVoiceNoteError: null,
};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    getChatsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getChatsSuccess: (state, action) => {
      state.loading = false;
      state.chats = action.payload;
    },
    getChatsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    saveVoiceNoteRequest: (state) => {
      state.savingVoiceNote = true;
      state.saveVoiceNoteError = null;
    },
    saveVoiceNoteSuccess: (state, action) => {
      state.savingVoiceNote = false;
      state.chats.push(action.payload);
    },
    saveVoiceNoteFailure: (state, action) => {
      state.savingVoiceNote = false;
      state.saveVoiceNoteError = action.payload;
    },
    clearChatErrors: (state) => {
      state.error = null;
      state.saveVoiceNoteError = null;
    },
  },
});

export const chatsActions = chatsSlice.actions;

export default chatsSlice.reducer;
