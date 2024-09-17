import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Function to decode the token and check if the user is an admin
export const isAdmin = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) return false; // No token, not logged in

    // Decode the token
    const decoded = jwtDecode(token);

    // Check if the user is an admin
    return decoded.UserType === "parent"; // Assuming 'parent' means admin
  } catch (error) {
    console.error("Error decoding token or checking admin status", error);
    return false;
  }
};

// Function to check if the user is authenticated (either admin or regular user)
export const isAuthenticated = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) return false; // No token, not logged in

    // Decode the token
    const decoded = jwtDecode(token);

    // Check if the user is logged in (either admin or regular user)
    return decoded.UserType === "parent" || decoded.UserType === "child"; // Adjust according to your roles
  } catch (error) {
    console.error("Error decoding token or checking login status", error);
    return false;
  }
};
