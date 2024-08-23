import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  return (
    <LinearGradient colors={["#f3cfd6", "#90c2d8"]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}>Home</Text>
        </View>

        <View style={styles.dailyStreakContainer}>
          <Text style={styles.dailyStreakText}>Daily streak</Text>
          <View style={styles.streakBox}>
            <Text style={styles.streakNumber}>2</Text>
          </View>
        </View>

        <View style={styles.microphoneContainer}>
          <TouchableOpacity style={styles.microphoneButton}>
            <MaterialIcons name="mic" size={80} color="#0288D1" />
          </TouchableOpacity>
        </View>

        <Text style={styles.analyzingText}>
          Analyzing ... Result will be underway
        </Text>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  header: {
    marginTop: 20,
    marginLeft: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  dailyStreakContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFF3E0",
    margin: 20,
    padding: 15,
    borderRadius: 10,
  },
  dailyStreakText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  streakBox: {
    backgroundColor: "#E0E0E0",
    padding: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  streakNumber: {
    fontSize: 24,
    color: "#0288D1",
    fontWeight: "bold",
  },
  microphoneContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  microphoneButton: {
    width: 100,
    height: 100,
    backgroundColor: "#B3E5FC",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  analyzingText: {
    textAlign: "center",
    marginBottom: 40,
    fontSize: 16,
    color: "#555",
  },
});

export default HomeScreen;
