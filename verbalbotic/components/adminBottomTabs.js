import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Alert } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { isAdmin } from "./checkUser"; // Import isAdmin function
import AdminHome from "../screens/admin/adminHome";
import AdminProfile from "../screens/admin/adminProfile";
import Adminchildren from "../screens/admin/adminchildren";
import { useNavigation } from "@react-navigation/native"; // To navigate to login if not admin

const Tab = createBottomTabNavigator();

const AdminTabs = ({ route }) => {
  const [loading, setLoading] = useState(true);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const navigation = useNavigation();
  const { streak } = route.params || {};

  useEffect(() => {
    const checkAdminStatus = async () => {
      const adminStatus = await isAdmin();
      if (adminStatus) {
        setIsAdminUser(true);
      } else {
        Alert.alert(
          "Access Denied",
          "You are not authorized to access this page."
        );
        navigation.navigate("Login"); // Redirect to login if not admin
      }
      setLoading(false); // Stop loading after check
    };

    checkAdminStatus();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0288D1" />
      </View>
    );
  }

  if (!isAdminUser) {
    return null; // Return nothing if the user is not admin (to prevent screen flicker)
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home-outline";
          } else if (route.name === "Children Chats") {
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
        tabBarStyle: {
          backgroundColor: "#fff",
          paddingTop: 10,
          elevation: 5,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 3.84,
          shadowColor: "#000",
        },
        tabBarLabelStyle: { marginBottom: -7 },
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
