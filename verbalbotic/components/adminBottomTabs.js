import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AdminHome from "../screens/admin/adminHome";
import AdminProfile from "../screens/admin/adminProfile";
import Adminchildren from "../screens/admin/adminchildren";

const Tab = createBottomTabNavigator();

const AdminTabs = ({ route }) => {
  const { streak } = route.params || {};

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home-outline" : "home-outline";
          } else if (route.name === "Children Chats") {
            iconName = "robot-outline";
          } else if (route.name === "Profile") {
            iconName = "account-outline";
          }

          return (
            <MaterialCommunityIcons
              name={iconName}
              size={35} // Keep consistent icon size
              color={color}
              style={{
                transform: [{ translateY: focused ? -5 : 0 }],
              }}
            />
          );
        },
        tabBarActiveTintColor: "#0288D1", // Active color consistent with Tabs component
        tabBarInactiveTintColor: "gray", // Inactive color consistent with Tabs component
        tabBarStyle: {
          backgroundColor: "#F5F5F5", // Consistent background color
          paddingTop: 10, // Consistent padding top
          elevation: 5, // Elevation for Android
          shadowOffset: { width: 0, height: 2 }, // Shadow for iOS
          shadowOpacity: 0.2, // Shadow opacity for iOS
          shadowRadius: 3.84, // Shadow radius for iOS
          shadowColor: "#000", // Shadow color for iOS
        },
        tabBarLabelStyle: { marginBottom: -7 }, // Consistent label style
      })}
    >
      <Tab.Screen
        name="Home"
        component={AdminHome}
        options={{ headerShown: false }}
        initialParams={{ streak }}
      />
      <Tab.Screen
        name="Children Chats"
        component={Adminchildren}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={AdminProfile}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default AdminTabs;
