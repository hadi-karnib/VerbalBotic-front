import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import ChatsScreen from "../screens/ChatsScreen";
import Profile from "../screens/Profile";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home";
            return <MaterialIcons name={iconName} size={size} color={color} />;
          } else if (route.name === "Chats") {
            iconName = "robot"; // Use a different icon if needed
            return <FontAwesome name={iconName} size={size} color={color} />;
          } else if (route.name === "Profile") {
            iconName = "user";
            return <FontAwesome name={iconName} size={size} color={color} />;
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
        component={Profile}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
