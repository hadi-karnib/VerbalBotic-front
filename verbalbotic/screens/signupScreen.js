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
    <LinearGradient
      colors={["#f3cfd6", "#90c2d8"]}
      style={styles.container}
    ></LinearGradient>
  );
}
