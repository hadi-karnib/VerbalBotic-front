import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const BioScreen = ({ navigation }) => {
  const [selectedHobbies, setSelectedHobbies] = useState([]);

  const hobbies = ["Reading", "Swimming", "Playing Football", "Cooking"];
  useEffect(() => {
    console.log(selectedHobbies);
  }, [selectedHobbies]);
  const toggleHobby = (hobby) => {
    if (selectedHobbies.includes(hobby)) {
      setSelectedHobbies(selectedHobbies.filter((item) => item !== hobby));
    } else {
      setSelectedHobbies([...selectedHobbies, hobby]);
    }
  };

  return (
    <LinearGradient colors={["#f3cfd6", "#90c2d8"]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={80}
        >
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.title}>Please select your hobbies</Text>
            {hobbies.map((hobby, index) => (
              <TouchableOpacity
                key={index}
                style={styles.radioButtonContainer}
                onPress={() => toggleHobby(hobby)}
              >
                <View
                  style={[
                    styles.radioButton,
                    selectedHobbies.includes(hobby) &&
                      styles.radioButtonSelected,
                  ]}
                />
                <Text style={styles.radioText}>{hobby}</Text>
              </TouchableOpacity>
            ))}

            <Text style={styles.title}>Please add your work</Text>
            <TextInput style={styles.input} multiline={true} />

            <Text style={styles.title}>
              Any medical problem impairing speech
            </Text>
            <TextInput style={styles.input} multiline={true} />

            <Text style={styles.title}>Tell us about yourself</Text>
            <TextInput style={styles.input} multiline={true} />

            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
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
  },
  scrollContainer: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#0288D1",
    marginRight: 10,
  },
  radioButtonSelected: {
    backgroundColor: "#0288D1",
  },
  radioText: {
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#ecece5",
    height: 100,
  },
  button: {
    backgroundColor: "#0288D1",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default BioScreen;
