import axios from "axios";
import { childrenActions } from "./childSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";

export const fetchChildren = () => async (dispatch) => {
  try {
    dispatch(childrenActions.getChildrenRequest());

    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(`${API_URL}/api/children/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(childrenActions.getChildrenSuccess(response.data));
  } catch (error) {
    dispatch(
      childrenActions.getChildrenFailure(
        error.response?.data?.message || error.message
      )
    );
  }
};
export const addChild = (childId) => async (dispatch) => {
  try {
    dispatch(childrenActions.addChildRequest());

    const token = await AsyncStorage.getItem("token");

    const response = await axios.post(
      `${API_URL}/api/children/add`,
      { childId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch(childrenActions.addChildSuccess(response.data.child));
  } catch (error) {
    dispatch(
      childrenActions.addChildFailure(
        error.response?.data?.message || error.message
      )
    );
  }
};
