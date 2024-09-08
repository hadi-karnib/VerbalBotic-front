import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chats: [],
  loading: false,
  error: null,
  savingVoiceNote: false,
  saveVoiceNoteError: null,
  updatingChatGPT: false,
  updateChatGPTError: null,
  analyzingVoiceNote: false,
  analysisError: null,
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
    updateChatGPTRequest: (state) => {
      state.updatingChatGPT = true;
      state.updateChatGPTError = null;
    },
    updateChatGPTSuccess: (state, action) => {
      state.updatingChatGPT = false;
      const updatedMessageIndex = state.chats.findIndex(
        (chat) => chat._id === action.payload._id
      );
      if (updatedMessageIndex !== -1) {
        state.chats[updatedMessageIndex] = action.payload;
      }
    },
    updateChatGPTFailure: (state, action) => {
      state.updatingChatGPT = false;
      state.updateChatGPTError = action.payload;
    },
    updateAfterAnalysisRequest: (state) => {
      state.analyzingVoiceNote = true;
      state.analysisError = null;
    },
    updateAfterAnalysisSuccess: (state, action) => {
      state.analyzingVoiceNote = false;
      const updatedMessageIndex = state.chats.findIndex(
        (chat) => chat._id === action.payload._id
      );
      if (updatedMessageIndex !== -1) {
        state.chats[updatedMessageIndex] = action.payload;
      }
    },
    updateAfterAnalysisFailure: (state, action) => {
      state.analyzingVoiceNote = false;
      state.analysisError = action.payload;
    },
    clearChatErrors: (state) => {
      state.error = null;
      state.saveVoiceNoteError = null;
      state.updateChatGPTError = null;
      state.analysisError = null;
    },
    transcribeAudioGoogleRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    transcribeAudioGoogleSuccess: (state, action) => {
      state.loading = false;
      state.lastTranscriptionResult = action.payload;
    },
    transcribeAudioGoogleFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getChildChatsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getChildChatsSuccess: (state, action) => {
      state.loading = false;
      state.chats = Array.isArray(action.payload) ? action.payload : [];
    },
    getChildChatsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getParentAdviceRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getParentAdviceSuccess: (state, action) => {
      state.loading = false;
      state.parentAdvice = action.payload; // Save the AI advice
    },
    getParentAdviceFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearChats: (state) => {
      state.chats = [];
    },
  },
});

export const chatsActions = chatsSlice.actions;

export default chatsSlice.reducer;
