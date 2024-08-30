import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import ChatsScreen from "../screens/ChatsScreen";
import ProfileScreen from "../screens/Profile";

const Tab = createBottomTabNavigator();

const Tabs = ({ route }) => {
  const { streak } = route.params || {};

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Chats") {
            iconName = "robot-outline";
          } else if (route.name === "Profile") {
            iconName = "account-outline";
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
