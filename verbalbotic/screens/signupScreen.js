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
  const [show, setShow] = useState(false);
  const [role, setRole] = useState("");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
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

        <TouchableOpacity
          onPress={showDatepicker}
          style={styles.datePickerButton}
        >
          <Text style={styles.datePickerText}>
            {date.toDateString() === new Date().toDateString()
              ? "Your Date of Birth"
              : date.toDateString()}
          </Text>
        </TouchableOpacity>
        {show && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChange}
            maximumDate={new Date()}
          />
        )}

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
