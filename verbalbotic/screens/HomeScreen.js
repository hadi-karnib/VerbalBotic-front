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
import AudioRecorderPlayer from "react-native-audio-recorder-player";

const HomeScreen = ({ navigation, route }) => {
  const { streak } = route.params || {};
  const [isRecording, setIsRecording] = useState(false);
  const [recordingText, setRecordingText] = useState(
    "Press the microphone button to start recording your voice."
  );
  const [audioFile, setAudioFile] = useState(null);
  const audioRecorderPlayer = useRef(new AudioRecorderPlayer()).current;

  const handleMicrophonePress = async () => {
    if (isRecording) {
      const result = await audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.removeRecordBackListener();
      setAudioFile(result);
      setIsRecording(false);
    } else {
      const path = "hello.wav";
      await audioRecorderPlayer.startRecorder(path);
      audioRecorderPlayer.addRecordBackListener((e) => {
        setRecordingText(
          `Recording${".".repeat(Math.floor((e.current_position / 500) % 4))}`
        );
      });
      setIsRecording(true);
    }
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

        <Text style={styles.analyzingText}>{recordingText}</Text>
        {audioFile && (
          <View style={styles.audioInfo}>
            <Text>File: {audioFile}</Text>
            <Text>
              Duration:{" "}
              {Math.round(
                audioRecorderPlayer.mmssss(
                  audioRecorderPlayer._player.current_position
                ) / 1000
              )}{" "}
              s
            </Text>
            <Text>Size: {new Blob([audioFile]).size / 1024} KB</Text>
          </View>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  // Same styles as before...
});

export default HomeScreen;
