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
import TestingScreen from "./screens/testingScreen";
import AdminHome from "./screens/admin/adminHome";
import AdminProfile from "./screens/admin/adminProfile";
import AdminTabs from "./components/adminBottomTabs";
import Adminchildren from "./screens/admin/adminchildren";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <LinearGradient colors={["#f3cfd6", "#90c2d8"]} style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Tabs" component={Tabs} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Chats" component={ChatsScreen} />
            <Stack.Screen name="Bio" component={BioScreen} />
            <Stack.Screen name="Test" component={TestingScreen} />
            <Stack.Screen name="adminHome" component={AdminHome} />
            <Stack.Screen name="adminProfile" component={AdminProfile} />
            <Stack.Screen name="adminChildren" component={Adminchildren} />
          </Stack.Navigator>
          <StatusBar style="auto" />
        </NavigationContainer>
      </LinearGradient>
    </Provider>
  );
}
