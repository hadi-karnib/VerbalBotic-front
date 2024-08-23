import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ChatsScreen from "../screens/ChatsScreen";
import ProfileScreen from "../screens/Profile";
import HomeIcon from "../assets/Home.svg"; // Importing the SVG file as a component
import MessageBotIcon from "../assets/Message Bot.svg"; // Importing the SVG file as a component
import UserIcon from "../assets/User.svg"; // Importing the SVG file as a component

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Home") {
            return <HomeIcon width={size} height={size} fill={color} />;
          } else if (route.name === "Chats") {
            return <MessageBotIcon width={size} height={size} fill={color} />;
          } else if (route.name === "Profile") {
            return <UserIcon width={size} height={size} fill={color} />;
          }
        },
        tabBarActiveTintColor: "#0288D1", // Blue when active
        tabBarInactiveTintColor: "gray", // Gray when inactive
        tabBarStyle: { backgroundColor: "#F5F5F5" }, // Background color
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Chats"
        component={ChatsScreen}
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
