import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/user/userActions";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (email && password) {
      try {
        // Dispatch the login action
        await dispatch(loginUser(email, password));

        // Get the stored token from AsyncStorage
        const storedToken = await AsyncStorage.getItem("token");

        // Check if the token exists in AsyncStorage
        if (storedToken) {
          Alert.alert("Login Successful", `Stored Token: ${storedToken}`);
        } else {
          Alert.alert("Login Failed", "No token found");
        }
      } catch (err) {
        Alert.alert("Login Error", err.message || "An error occurred");
      }
    } else {
      Alert.alert(
        "Missing Information",
        "Please enter both email and password"
      );
    }
  };

  return (
    <LinearGradient colors={["#f3cfd6", "#90c2d8"]} style={styles.container}>
      <View style={styles.loginBox}>
        <Text style={styles.loginText}>Login</Text>
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.signupText}>
            Don't have an account?{" "}
            <Text style={styles.signupLink}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loginBox: {
    width: 300,
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 10,
    alignItems: "center",
  },
  loginText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    backgroundColor: "#fff",
  },
  button: {
    width: "100%",
    height: 40,
    backgroundColor: "#67AFCB",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  signupText: {
    marginTop: 20,
    color: "#000",
    fontSize: 14,
  },
  signupLink: {
    color: "#67AFCB",
    fontWeight: "bold",
  },
});
