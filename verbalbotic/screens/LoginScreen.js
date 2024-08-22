import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function LoginScreen({ navigation }) {
  return (
    <LinearGradient colors={["#f3cfd6", "#90c2d8"]} style={styles.container}>
      <View style={styles.loginBox}>
        <Text style={styles.loginText}>Login</Text>
      </View>
    </LinearGradient>
  );
}
