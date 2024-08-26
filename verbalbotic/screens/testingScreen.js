import React from "react";
import { View, Text } from "react-native";
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
      <Button title="Get Advice" onPress={fetchAdvice} />
    </View>
  );
};

export default TestingScreen;
