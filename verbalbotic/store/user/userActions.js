import axios from "axios";
import { userActions } from "./userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";

export const loginUser = (email, password) => async (dispatch) => {
  console.log("login formData: ", { email, password });
  dispatch(userActions.loginUserRequest());

  try {
    const response = await axios.post(`${API_URL}/api/user/login`, {
      email,
      password,
    });

    console.log("login response: ", response);
    const { token } = response.data;
    await AsyncStorage.setItem("token", token);

    dispatch(userActions.loginUserSuccess(response.data));
  } catch (err) {
    console.error("login error: ", err);
    dispatch(userActions.loginUserFailure(err.response?.data || err.message));
  }
};
