import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  MaterialIcons,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
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
          if (route.name === "Home") {
            return (
              <MaterialCommunityIcons name="home" size={35} color={color} />
            );
          } else if (route.name === "Chats") {
            return <FontAwesome5 name="robot" size={size} color={color} />;
          } else if (route.name === "Profile") {
            return (
              <MaterialCommunityIcons
                name="account-outline"
                size={35}
                color={color}
              />
            );
          }
        },
        tabBarActiveTintColor: "#0288D1",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { backgroundColor: "#F5F5F5", paddingTop: 10 },
        tabBarLabelStyle: { MarginTop: 5, marginBottom: -5 },
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
