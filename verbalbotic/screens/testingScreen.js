import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import getAdvice from "./../ChatGPT_Response/advice";
import { useDispatch, useSelector } from "react-redux";
import { getSelf } from "../store/user/userActions";

const TestingScreen = () => {
  const dispatch = useDispatch();
  const [advice, setAdvice] = useState("");
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getSelf());
  }, [dispatch]);

  const fetchAdvice = async () => {
    if (user) {
      const question = `My name is ${user.name}, I work as a ${
        user.work
      }, age: ${user.age}. My bio is: "${user.bio}". My speech illness is "${
        user.illness || "none"
      }". i have a speech impairment stuttering how can i fix it .give me advice .i dont want introductions just what can i do generally and maybe give me  homework on what to do daily.be creative.i just want what to do no here are   tips or something.make the answers concice and small u can 3 points excluding the homework if u want but make them unique dont forget to give me a small schedule`;
      const result = await getAdvice(question);
      setAdvice(result);
      console.log(result);
    }
  };

  return (
    <View>
      <ScrollView>
        <Text style={styles.text}>{advice}</Text>
        <TouchableOpacity
          title="Get Advice"
          onPress={fetchAdvice}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Get Advice</Text>
        </TouchableOpacity>
      </ScrollView>
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
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 100,
  },
});

export default TestingScreen;
