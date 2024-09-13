import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { useSelector } from "react-redux";

const DailyHomework = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}>Daily Exercises</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.text}>
            Your daily homework will be shown here.
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#E3F2FD", // Similar background color
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
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 18,
    color: "#000",
    textAlign: "center",
  },
});

export default DailyHomework;
