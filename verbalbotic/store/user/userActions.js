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

export const signupUser = (formData) => async (dispatch) => {
  dispatch(userActions.signupUserRequest());

  try {
    const response = await axios.post(`${API_URL}/api/user/signup`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("signup response: ", response);
    const { token } = response.data;
    await AsyncStorage.setItem("token", token);

    dispatch(userActions.signupUserSuccess(response.data));
  } catch (err) {
    console.error("signup error: ", err);
    dispatch(userActions.signupUserFailure(err.response?.data || err.message));
  }
};
export const logoutUser = () => async (dispatch) => {
  try {
    await AsyncStorage.removeItem("token");
    dispatch(userActions.logoutUser());
  } catch (err) {
    console.error("logout error: ", err);
  }
};
