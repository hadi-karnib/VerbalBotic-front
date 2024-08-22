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
import Icon from "react-native-vector-icons/FontAwesome";

export default function SignupScreen({ navigation }) {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
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
          <Text style={styles.dateText}>
            {date.toDateString() === new Date().toDateString()
              ? "Your Date of Birth"
              : date.toDateString()}
          </Text>
          <TouchableOpacity onPress={showDatepicker}>
            <Icon name="calendar" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        {show && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChange}
            maximumDate={new Date()}
            style={styles.datePicker}
          />
        )}

        <TextInput
          placeholder="Phone number ie:03111111"
          style={styles.input}
          keyboardType="phone-pad"
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#fff",
  },
  dateText: {
    fontSize: 16,
    color: "#C7C7CD",
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
