import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import store from "./store/store";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import HomeScreen from "./screens/HomeScreen";
import BioScreen from "./screens/BioScreen";
import Tabs from "./components/BottomTab";
import ChatsScreen from "./screens/ChatsScreen";
import Profile from "./screens/Profile";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <LinearGradient colors={["#f3cfd6", "#90c2d8"]} style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Tabs" component={Tabs} />
            <Stack.Screen name="Home" component={HomeScreen} />

            <Stack.Screen name="Bio" component={BioScreen} />
          </Stack.Navigator>
          <StatusBar style="auto" />
        </NavigationContainer>
      </LinearGradient>
    </Provider>
  );
}
