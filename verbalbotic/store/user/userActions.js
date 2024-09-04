import axios from "axios";
import { userActions } from "./userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";
import { Alert } from "react-native";

export const loginUser = (email, password, navigation) => async (dispatch) => {
  console.log(API_URL);

  console.log("login formData: ", { email, password });
  dispatch(userActions.loginUserRequest());

  try {
    const response = await axios.post(`${API_URL}/api/user/login`, {
      email,
      password,
    });

    const { token, success, streak, UserType } = response.data;

    if (success) {
      await AsyncStorage.setItem("token", token);
      dispatch(userActions.loginUserSuccess(response.data));

      if (UserType === "parent") {
        navigation.reset({
          index: 0,
          routes: [{ name: "adminTabs", params: { streak } }],
        });
      } else if (UserType === "child") {
        navigation.reset({
          index: 0,
          routes: [{ name: "Tabs", params: { streak } }],
        });
      } else {
        Alert.alert("Login Error", "Unknown UserType, please contact support.");
      }
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
    const { token, success, UserType } = response.data;

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

export const logoutUser = (navigation) => async (dispatch) => {
  try {
    await AsyncStorage.removeItem("token");
    dispatch(userActions.logoutUser());

    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  } catch (err) {
    console.error("logout error: ", err);
  }
};

export const addBio = (bioData, navigation) => async (dispatch) => {
  dispatch(userActions.updateUserRequest());

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

    const { success, data } = response.data;

    if (success) {
      dispatch(userActions.updateUserSuccess(data));
      Alert.alert("Bio Updated", "Your bio has been successfully updated.");

      if (data.UserType === "parent") {
        navigation.reset({
          index: 0,
          routes: [{ name: "adminTabs" }],
        });
      } else if (data.UserType === "child") {
        navigation.reset({
          index: 0,
          routes: [{ name: "Tabs" }],
        });
      } else {
        Alert.alert(
          "Navigation Error",
          "Unknown UserType, please contact support."
        );
      }
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

export const getSelf = () => async (dispatch) => {
  dispatch(userActions.getSelfRequest());

  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      throw new Error("No token found, please log in again.");
    }

    const response = await axios.get(`${API_URL}/api/user/self`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { data } = response;

    dispatch(userActions.getSelfSuccess(data));
  } catch (err) {
    console.error("getSelf error: ", err);
    dispatch(userActions.getSelfFailure(err.response?.data || err.message));
    Alert.alert(
      "Fetch User Error",
      err.response?.data?.message ||
        "An error occurred while fetching user data."
    );
  }
};
export const updateUser = (formData) => async (dispatch) => {
  dispatch(userActions.updateUserRequest());

  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      throw new Error("No token found, please log in again.");
    }

    const response = await axios.patch(`${API_URL}/api/user`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const { success, data } = response.data;

    if (success) {
      dispatch(userActions.updateUserSuccess(data));
      Alert.alert(
        "Profile Updated",
        "Your profile has been successfully updated."
      );
      dispatch(getSelf());
    } else {
      Alert.alert(
        "Update Failed",
        "Could not update profile, please try again."
      );
    }
  } catch (err) {
    console.error("updateUser error: ", err);
    dispatch(userActions.updateUserFailure(err.response?.data || err.message));
    Alert.alert(
      "Update Error",
      err.response?.data?.message ||
        "An error occurred while updating your profile."
    );
  }
};
