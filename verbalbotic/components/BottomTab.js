import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Alert } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { isAuthenticated } from "./checkUser"; // Import isAuthenticated function
import HomeScreen from "../screens/HomeScreen";
import ChatsScreen from "../screens/ChatsScreen";
import ProfileScreen from "../screens/Profile";
import DailyHomeworkScreen from "../screens/DailyHomework";
import { useNavigation } from "@react-navigation/native"; // To navigate to login if not logged in

const Tab = createBottomTabNavigator();

const Tabs = ({ route }) => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigation = useNavigation();
  const { streak } = route.params || {};

  useEffect(() => {
    const checkAuthStatus = async () => {
      const authStatus = await isAuthenticated();
      if (authStatus) {
        setIsLoggedIn(true);
      } else {
        Alert.alert("Not Logged In", "Please log in to access this page.");
        navigation.navigate("Login"); // Redirect to login if not logged in
      }
      setLoading(false); // Stop loading after check
    };

    checkAuthStatus();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0288D1" />
      </View>
    );
  }

  if (!isLoggedIn) {
    return null; // Return nothing if the user is not logged in (to prevent screen flicker)
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home-outline" : "home-outline";
          } else if (route.name === "AI Chats") {
            iconName = "robot-outline";
          } else if (route.name === "Profile") {
            iconName = "account-outline";
          } else if (route.name === "Daily Exercises") {
            iconName = "calendar-check-outline";
          }

          return (
            <MaterialCommunityIcons
              name={iconName}
              size={35}
              color={color}
              style={{
                transform: [{ translateY: focused ? -5 : 0 }],
              }}
            />
          );
        },
        tabBarActiveTintColor: "#0288D1",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { backgroundColor: "#F5F5F5", paddingTop: 10 },
        tabBarLabelStyle: { marginBottom: -7 },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
        initialParams={{ streak }}
      />
      <Tab.Screen
        name="AI Chats"
        component={ChatsScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Daily Exercises"
        component={DailyHomeworkScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
