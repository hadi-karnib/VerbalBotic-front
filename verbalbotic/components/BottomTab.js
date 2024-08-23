import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ChatsScreen from "../screens/ChatsScreen";
import ProfileScreen from "../screens/Profile";

// SVG to JSX components
const HomeIcon = ({ color, size }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
  >
    <path d="M10 20v-6h4v6h5v-8h3l-10-9-10 9h3v8z" />
  </svg>
);

const MessageBotIcon = ({ color, size }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
  >
    <path d="M20 7h-3v-2h1v-1h-5v1h1v2h-6v-2h1v-1h-5v1h1v2h-3c-1.104 0-2 .896-2 2v10c0 1.104.896 2 2 2h16c1.104 0 2-.896 2-2v-10c0-1.104-.896-2-2-2zm-3 12h-10v-1h10v1zm0-3h-10v-1h10v1zm3-3h-16v-6h16v6z" />
  </svg>
);

const UserIcon = ({ color, size }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
  >
    <path d="M12 12c2.209 0 4-1.791 4-4s-1.791-4-4-4-4 1.791-4 4 1.791 4 4 4zm0 2c-2.67 0-8 1.338-8 4v2h16v-2c0-2.662-5.33-4-8-4z" />
  </svg>
);

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Home") {
            return <HomeIcon color={color} size={size} />;
          } else if (route.name === "Chats") {
            return <MessageBotIcon color={color} size={size} />;
          } else if (route.name === "Profile") {
            return <UserIcon color={color} size={size} />;
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
