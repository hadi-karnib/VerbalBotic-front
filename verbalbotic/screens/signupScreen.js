import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  Image, // Import the Image component
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useDispatch } from "react-redux";
import { signupUser } from "../store/user/userActions"; // Import the signupUser action
import DateTimePicker from "@react-native-community/datetimepicker";
import RNPickerSelect from "react-native-picker-select";

export default function SignupScreen({ navigation }) {
  const [date, setDate] = useState(new Date());
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");
  const [age, setAge] = useState(null);
  const dispatch = useDispatch();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    calculateAge(currentDate);
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    let years = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      years--;
    }

    setAge(years);
  };

  const handleRegister = () => {
    const formData = {
      name: username,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
      UserType: role,
      age: age,
    };

    dispatch(signupUser(formData, navigation));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {/* Adjusting for the keyboard opening */}
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : null}
      >
        {/* Add the logo */}
        <Image
          source={require("../assets/VerbalBotic-removebg.png")} // Ensure the path to the logo image is correct
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.signupBox}>
          <Text style={styles.signupText}>Sign Up</Text>
          <TextInput
            placeholder="Full Name"
            style={styles.input}
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
          <TextInput
            placeholder="Email"
            style={styles.input}
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />

          <View style={styles.datePickerContainer}>
            <TextInput
              placeholder="Your Date of Birth"
              value={age !== null ? `Age: ${age} years` : ""}
              style={styles.dateTextInput}
              editable={false}
            />
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
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
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

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E3F2FD",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20, // Add spacing between logo and signup box
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
    width: "100%",
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    backgroundColor: "#fff",
  },
  dateTextInput: {
    flex: 1,
    color: "#000",
  },
  datePicker: {
    flex: 1,
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
    paddingRight: 30,
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
    paddingRight: 30,
    backgroundColor: "#fff",
    marginBottom: 15,
    width: "100%",
  },
});
