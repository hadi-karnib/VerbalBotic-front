import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import getAdvice from "./../ChatGPT_Response/advice";
const TestingScreen = () => {
  const [advice, setAdvice] = useState("");

  const fetchAdvice = async () => {
    const result = await getAdvice("How can I improve my coding skills?");
    setAdvice(result);
  };

  return (
    <View>
      <Text>{advice}</Text>
      <TouchableOpacity
        title="Get Advice"
        onPress={fetchAdvice}
        style={styles.button}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: "blue",
    padding: 10,
    margin: 10,
    marginTop: 100,
    height: "50%",
  },
});
export default TestingScreen;
