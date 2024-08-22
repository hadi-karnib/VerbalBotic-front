import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNPickerSelect from "react-native-picker-select";

export default function SignupScreen({ navigation }) {
  const [date, setDate] = useState(new Date());
  const [role, setRole] = useState("");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  return (
    <LinearGradient colors={["#f3cfd6", "#90c2d8"]} style={styles.container}>
      <View style={styles.signupBox}>
        <Text style={styles.signupText}>Register</Text>
        <TextInput placeholder="Username" style={styles.input} />
        <TextInput
          placeholder="Email"
          style={styles.input}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry
        />

        <View style={styles.datePickerContainer}>
          <Text style={styles.dateText}>Date of Birth</Text>
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChange}
            maximumDate={new Date()}
            style={styles.datePicker}
          />
        </View>

        <TextInput
          placeholder="Phone number ie:03111111"
          style={styles.input}
          keyboardType="phone-pad"
        />

        <RNPickerSelect
          onValueChange={(value) => setRole(value)}
          items={[
            { label: "Parent", value: "parent" },
            { label: "Child", value: "child" },
          ]}
          placeholder={{
            label: "Role",
            value: null,
          }}
          style={pickerSelectStyles}
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  signupBox: {
    width: 300,
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 10,
    alignItems: "center",
  },
  signupText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    backgroundColor: "#fff",
  },
  datePickerContainer: {
    display: "flex",
    width: "100%",
    height: 40,
    justifyContent: "center",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    backgroundColor: "#fff",
  },
  datePicker: {
    width: "100%",
    backgroundColor: "#fff",
  },
  button: {
    width: "100%",
    height: 40,
    backgroundColor: "#67AFCB",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: "#fff",
    marginBottom: 15,
    width: "100%",
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: "#fff",
    marginBottom: 15,
    width: "100%",
  },
});
