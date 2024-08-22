import axios from "axios";
import { userActions } from "./userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";
import { Alert } from "react-native";

// Modified loginUser Action
export const loginUser = (email, password, navigation) => async (dispatch) => {
  console.log(API_URL);

  console.log("login formData: ", { email, password });
  dispatch(userActions.loginUserRequest());

  try {
    const response = await axios.post(`${API_URL}/api/user/login`, {
      email,
      password,
    });

    const { token, success } = response.data;

    if (success) {
      await AsyncStorage.setItem("token", token);
      dispatch(userActions.loginUserSuccess(response.data));

      // Navigate to Home screen upon successful login
      navigation.navigate("Home");
    } else {
      Alert.alert(
        "Login Failed",
        "Please check your credentials and try again."
      );
    }
  } catch (err) {
    console.error("login error: ", err);
    dispatch(userActions.loginUserFailure(err.response?.data || err.message));
    Alert.alert(
      "Login Error",
      err.response?.data?.message || "An error occurred"
    );
  }
};
export const signupUser = (formData, navigation) => async (dispatch) => {
  dispatch(userActions.signupUserRequest());

  try {
    const response = await axios.post(`${API_URL}/api/user/signup`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("signup response: ", response);
    const { token, success } = response.data;

    if (success) {
      await AsyncStorage.setItem("token", token);
      dispatch(userActions.signupUserSuccess(response.data));
    } else {
      Alert.alert("Signup Failed", "Please try again.");
    }
  } catch (err) {
    console.error("signup error: ", err);
    dispatch(userActions.signupUserFailure(err.response?.data || err.message));
    Alert.alert(
      "Signup Error",
      err.response?.data?.message || "An error occurred"
    );
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
