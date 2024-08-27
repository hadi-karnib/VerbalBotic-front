import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const AdminHome = () => {
  return (
    <LinearGradient colors={["#f3cfd6", "#90c2d8"]} style={styles.gradient}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.childrenList}>
            <Text style={styles.title}>Children</Text>

            <TouchableOpacity style={styles.childItem}>
              <Text style={styles.childName}>Child 1</Text>
              <Text style={styles.childAge}>8 years</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.childItem}>
              <Text style={styles.childName}>Child 2</Text>
              <Text style={styles.childAge}>8 years</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.childItem}>
              <Text style={styles.childName}>Child 3</Text>
              <Text style={styles.childAge}>8 years</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              Here you can monitor what your child talks with our AI and what
              his tasks are to perform better.
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "space-between", // Ensure the children and info box are spaced correctly
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0288D1",
    marginBottom: 20,
  },
  childrenList: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  childItem: {
    backgroundColor: "#F5F5F5",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Adds shadow for Android
  },
  lastChildItem: {
    marginBottom: 20, // Extra margin for the last child
  },
  childName: {
    fontSize: 18,
    color: "#0288D1",
  },
  childAge: {
    fontSize: 16,
    color: "#757575",
  },
  infoBox: {
    flex: 1, // Makes the info box fill the remaining space
    backgroundColor: "#F5F5F5",
    padding: 20,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Adds shadow for Android
  },
  infoText: {
    fontSize: 32,
    color: "#333",
    textAlign: "center",
  },
});

export default AdminHome;
