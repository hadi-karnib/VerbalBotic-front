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
          if (route.name === "Home") {
            return <MaterialIcons name="home" size={35} color={color} />;
          } else if (route.name === "Children Chats") {
            return <FontAwesome5 name="robot" size={size} color={color} />;
          } else if (route.name === "Profile") {
            return <FontAwesome5 name="user" size={size} color={color} />;
          }
        },
        tabBarLabelStyle: { marginTop: 2 },
        tabBarActiveTintColor: "#0288D1",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "#F5F5F5",
          marginBottom: -10,
          paddingTop: 7,
        },
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
