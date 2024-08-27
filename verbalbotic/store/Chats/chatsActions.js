import axios from "axios";
import { chatsActions } from "./chatsSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";
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
    console.log("successfull");

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

export const saveVoiceNote = (formData) => async (dispatch) => {
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

    // Trigger the analysis and ChatGPT process in the background
    dispatch(analyzeVoiceNoteInBackground(response.data._id));
  } catch (error) {
    dispatch(
      chatsActions.saveVoiceNoteFailure(
        error.response?.data?.message || error.message
      )
    );
    console.error("Error saving voice note: ", error);
  }
};

// Analyze Voice Note in Background
export const analyzeVoiceNoteInBackground = (messageId) => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem("token");

    const response = await axios.patch(
      `${API_URL}/api/messages/${messageId}/analysis`,
      { diagnosis: "stuttering" }, // Placeholder for real analysis
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(chatsActions.updateAfterAnalysisSuccess(response.data));

    if (response.data.diagnosis === "stuttering") {
      // Proceed to ChatGPT interaction if stuttering is detected
      dispatch(updateAfterChatGPT(response.data._id));
    }
  } catch (error) {
    console.error("Error during analysis: ", error);
    // Handle error
  }
};

// Update After ChatGPT
export const updateAfterChatGPT = (messageId) => async (dispatch) => {
  try {
    dispatch(chatsActions.updateChatGPTRequest());

    const token = await AsyncStorage.getItem("token");

    const response = await axios.patch(
      `${API_URL}/api/messages/${messageId}/chatgpt`,
      {},
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
