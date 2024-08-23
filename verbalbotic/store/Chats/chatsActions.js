import axios from "axios";
import { chatsActions } from "./chatsSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";

export const getMyChats = () => async (dispatch) => {
  try {
    dispatch(chatsActions.getChatsRequest());

    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(`${API_URL}/messages/`, {
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
  }
};
