import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import loginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import { API_URL } from "@env"; // Import the environment variable

const Stack = createNativeStackNavigator();

export default function App() {
  console.log("API URL:", API_URL); // You can now use API_URL in your code

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={loginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
