import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { Audio } from "expo-av";

const HomeScreen = ({ navigation, route }) => {
  const { streak } = route.params || {};
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState(null);
  const [recordingText, setRecordingText] = useState(
    "Press the microphone button to start recording your voice."
  );
  const [recordingUri, setRecordingUri] = useState(null);
  const [durationMillis, setDurationMillis] = useState(0);

  const recordingInterval = useRef(null);

  const handleMicrophonePress = async () => {
    if (isRecording) {
      // Stop recording
      try {
        await recording.stopAndUnloadAsync();
        clearInterval(recordingInterval.current);
        const uri = recording.getURI();
        setRecordingUri(uri);
        setIsRecording(false);
        setRecordingText(
          "Press the microphone button to start recording your voice."
        );
        console.log("Recording stopped and stored at", uri);
      } catch (error) {
        console.error("Error stopping recording: ", error);
      }
    } else {
      // Start recording
      try {
        await Audio.requestPermissionsAsync();

        const recording = new Audio.Recording();
        await recording.prepareToRecordAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );
        await recording.startAsync();

        setRecording(recording);
        setIsRecording(true);

        recordingInterval.current = setInterval(() => {
          const newDurationMillis = recording
            .getStatusAsync()
            .then((status) => status.durationMillis);
          setDurationMillis(newDurationMillis);
          setRecordingText(
            `Recording${".".repeat(Math.floor(newDurationMillis / 1000) % 4)}`
          );
        }, 1000);
      } catch (error) {
        console.error("Error starting recording: ", error);
      }
    }
  };

  const formatDuration = (millis) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <LinearGradient colors={["#f3cfd6", "#90c2d8"]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}>Home</Text>
        </View>

        <View style={styles.dailyStreakContainer}>
          <Text style={styles.dailyStreakText}>Daily streak</Text>
          <View style={styles.streakBox}>
            <Text style={styles.streakNumber}>{streak || 0}</Text>
          </View>
        </View>

        <View style={styles.microphoneContainer}>
          <TouchableOpacity
            style={[
              styles.microphoneButton,
              isRecording && styles.recordingButton,
            ]}
            onPress={handleMicrophonePress}
          >
            <MaterialIcons
              name="mic"
              size={100}
              color={isRecording ? "#FF3B30" : "#0288D1"}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.analyzingText}>
          {isRecording
            ? `Recording... ${formatDuration(durationMillis)}`
            : recordingText}
        </Text>
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
    justifyContent: "space-between",
  },
  header: {
    marginTop: 20,
    marginLeft: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  dailyStreakContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFF3E0",
    margin: 20,
    padding: 15,
    borderRadius: 10,
  },
  dailyStreakText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  streakBox: {
    width: 60,
    height: 60,
    backgroundColor: "#E0E0E0",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  streakNumber: {
    fontSize: 30,
    color: "#0288D1",
    fontWeight: "bold",
  },
  microphoneContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  microphoneButton: {
    width: 150,
    height: 150,
    backgroundColor: "#B3E5FC",
    borderRadius: 75,
    justifyContent: "center",
    alignItems: "center",
  },
  recordingButton: {
    backgroundColor: "#FFCDD2",
  },
  analyzingText: {
    textAlign: "center",
    marginBottom: 40,
    fontSize: 16,
    color: "#555",
  },
});

export default HomeScreen;
