import axios from "axios";
import { chatsActions } from "./chatsSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL, ML_URL } from "@env";
import { Alert } from "react-native";

export const getMyChats = () => async (dispatch) => {
  try {
    dispatch(chatsActions.clearChats());

    dispatch(chatsActions.getChatsRequest());
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(`${API_URL}/api/messages/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(chatsActions.getChatsSuccess(response.data));
  } catch (error) {
    dispatch(
      chatsActions.getChatsFailure(
        error.response?.data?.message || error.message
      )
    );
    console.log("failure getting my chats");
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

export const adminMessages = (messageContent) => async (dispatch) => {
  try {
    dispatch(chatsActions.adminMessageRequest());

    const token = await AsyncStorage.getItem("token");

    const response = await axios.post(
      `${API_URL}/api/messages/parentMessage`,
      { messageContent },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const { _id: messageId } = response.data;

    // Immediately update the chat list with the new message
    dispatch(chatsActions.adminMessageSuccess(response.data));

    // Fetch AI response in the background
    dispatch(getParentAdviceWithMessageId(messageContent, messageId));
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch(chatsActions.adminMessageFailure(errorMessage));
    console.error("Error sending admin message:", errorMessage);
  }
};

export const getParentAdviceWithMessageId =
  (prompt, messageId) => async (dispatch) => {
    console.log("Requesting parent advice...");

    try {
      dispatch(chatsActions.getParentAdviceRequest());

      const token = await AsyncStorage.getItem("token");
      const response = await axios.post(
        `${API_URL}/api/messages/parentAdvice`,
        { prompt, messageId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const { AI_response } = response.data;

      dispatch(chatsActions.getParentAdviceSuccess({ messageId, AI_response }));
      console.log("Parent advice received and dispatched.");
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      dispatch(chatsActions.getParentAdviceFailure(errorMessage));
      console.error("Error fetching parent advice:", errorMessage);
    }
  };

export const markHomeworkAsDone = (homeworkId) => async (dispatch) => {
  try {
    // Dispatching request action
    dispatch(chatsActions.markHomeworkAsDoneRequest());

    // Get token from AsyncStorage
    const token = await AsyncStorage.getItem("token");

    // Send PATCH request to mark homework as done
    const response = await axios.patch(
      `${API_URL}/api/messages/homework`,
      { homeworkId }, // Send the homework ID in the body
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Dispatch success action with the updated homework data
    dispatch(chatsActions.markHomeworkAsDoneSuccess(response.data));
    Alert.alert("Homework Marked as Done", "You've completed this task!");
  } catch (error) {
    // Dispatch failure action if an error occurs
    dispatch(
      chatsActions.markHomeworkAsDoneFailure(
        error.response?.data?.message || error.message
      )
    );
    console.error("Error marking homework as done: ", error);
  }
};
