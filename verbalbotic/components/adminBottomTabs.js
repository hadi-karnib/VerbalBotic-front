import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
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
          if (route.name === "adminHome") {
            return <MaterialIcons name="home" size={35} color={color} />;
          } else if (route.name === "adminChildren") {
            return <FontAwesome5 name="robot" size={size} color={color} />;
          } else if (route.name === "adminProfile") {
            return <FontAwesome5 name="user" size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: "#0288D1",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { backgroundColor: "#F5F5F5", paddingTop: 10 },
      })}
    >
      <Tab.Screen
        name="Home"
        component={AdminHome}
        options={{ headerShown: false }}
        initialParams={{ streak }}
      />
      <Tab.Screen
        name="adminChildren"
        component={Adminchildren}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="adminProfile"
        component={AdminProfile}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default AdminTabs;
