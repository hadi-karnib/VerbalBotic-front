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
      navigation.navigate("Bio");
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

export const addBio = (bioData, navigation) => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      throw new Error("No token found, please log in again.");
    }

    const response = await axios.put(`${API_URL}/api/user/add-bio`, bioData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const { success } = response.data;

    if (success) {
      dispatch(userActions.updateUserSuccess(response.data.data));
      Alert.alert("Bio Updated", "Your bio has been successfully updated.");
      navigation.navigate("Home");
    } else {
      Alert.alert("Update Failed", "Could not update bio, please try again.");
    }
  } catch (err) {
    console.error("addBio error: ", err);
    dispatch(userActions.updateUserFailure(err.response?.data || err.message));
    Alert.alert(
      "Update Error",
      err.response?.data?.message ||
        "An error occurred while updating your bio."
    );
  }
};
