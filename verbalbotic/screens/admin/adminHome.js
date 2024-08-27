import React from "react";
import { StyleSheet, Text, View } from "react-native";

const AdminHome = () => {
  return (
    <View style={styles.mainView}>
      <Text>Admin Home</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
  },
});

export default AdminHome;
