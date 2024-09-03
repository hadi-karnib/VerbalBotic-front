import axios from "axios";
import { chatsActions } from "./chatsSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL, ML_URL } from "@env";
import { Alert } from "react-native";

export const getMyChats = () => async (dispatch) => {
  try {
    console.log("getting chats");

    dispatch(chatsActions.getChatsRequest());

    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(`${API_URL}/api/messages/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("successful");

    dispatch(chatsActions.getChatsSuccess(response.data));
  } catch (error) {
    dispatch(
      chatsActions.getChatsFailure(
        error.response?.data?.message || error.message
      )
    );
    console.log("failure");
  }
};

export const saveVoiceNote = (formData, uri, language) => async (dispatch) => {
  try {
    dispatch(chatsActions.saveVoiceNoteRequest());

    const token = await AsyncStorage.getItem("token");

    const response = await axios.post(`${API_URL}/api/messages/`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    dispatch(chatsActions.saveVoiceNoteSuccess(response.data));
    Alert.alert(
      "Message uploaded successfully",
      "Your voice note is being analyzed. You can continue using the app."
    );
    console.log(response.data);

    if (language) {
      dispatch(transcribeAudioGoogle(language, response.data._id));
    } else {
      dispatch(analyzeVoiceNoteInBackground(response.data._id, uri));
    }
  } catch (error) {
    dispatch(
      chatsActions.saveVoiceNoteFailure(
        error.response?.data?.message || error.message
      )
    );
    console.error("Error saving voice note: ", error);
  }
};

export const analyzeVoiceNoteInBackground =
  (messageId, fileUri) => async (dispatch) => {
    console.log(`sending to ai and sending it to ${ML_URL}/transcribe/ `);

    try {
      const formData = new FormData();
      formData.append("file", {
        uri: fileUri,
        name: "voiceNote.m4a",
        type: "audio/m4a",
      });

      const response = await axios.post(`${ML_URL}/transcribe/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 60000,
      });

      const { analysis } = response.data;

      await dispatch(updateDiagnosis(messageId, analysis));

      dispatch(updateAfterChatGPT(messageId, analysis));
    } catch (error) {
      console.error("Error during analysis: ", error);
    }
  };

export const updateDiagnosis = (messageId, diagnosis) => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem("token");

    const response = await axios.patch(
      `${API_URL}/api/messages/${messageId}/analysis`,
      { diagnosis },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(chatsActions.updateAfterAnalysisSuccess(response.data));
  } catch (error) {
    console.error("Error updating diagnosis: ", error);
  }
};

export const updateAfterChatGPT =
  (messageId, diagnosis) => async (dispatch) => {
    try {
      dispatch(chatsActions.updateChatGPTRequest());

      const token = await AsyncStorage.getItem("token");

      const response = await axios.patch(
        `${API_URL}/api/messages/${messageId}/chatgpt`,
        { diagnosis },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      dispatch(chatsActions.updateChatGPTSuccess(response.data));
      Alert.alert(
        "AI Response Updated",
        "The AI has finished processing your request."
      );
      dispatch(getMyChats());
    } catch (error) {
      dispatch(
        chatsActions.updateChatGPTFailure(
          error.response?.data?.message || error.message
        )
      );
      console.error("Error updating AI response: ", error);
    }
  };

export const transcribeAudioGoogle =
  (language, messageId) => async (dispatch) => {
    try {
      dispatch(chatsActions.transcribeAudioGoogleRequest());

      const token = await AsyncStorage.getItem("token");

      const response = await axios.post(
        `${API_URL}/api/messages/transcribeGoogle`,
        { language, messageId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const { analysis } = response.data;

      await dispatch(updateDiagnosis(messageId, analysis));

      await dispatch(updateAfterChatGPT(messageId, analysis));

      dispatch(chatsActions.transcribeAudioGoogleSuccess(response.data));
    } catch (error) {
      dispatch(
        chatsActions.transcribeAudioGoogleFailure(
          error.response?.data?.message || error.message
        )
      );
      Alert.alert("Error in transcribing", "Please use the selected language");
    }
  };

export const fetchChildChats = (childId) => async (dispatch) => {
  try {
    dispatch(chatsActions.clearChats());
    dispatch(chatsActions.getChildChatsRequest());

    const token = await AsyncStorage.getItem("token");
    const response = await axios.post(
      `${API_URL}/api/messages/child-chats`,
      { childId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch(chatsActions.getChildChatsSuccess(response.data));
  } catch (error) {
    console.error("Error fetching child chats:", error);
    dispatch(
      chatsActions.getChildChatsFailure(
        error.response?.data?.message || error.message
      )
    );
  }
};
