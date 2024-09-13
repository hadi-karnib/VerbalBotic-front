import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Animated,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import { useDispatch } from "react-redux";
import { saveVoiceNote } from "../store/Chats/chatsActions";
import SwitchToggle from "react-native-switch-toggle";
import { Dropdown } from "react-native-element-dropdown";

const HomeScreen = ({ navigation, route }) => {
  const { streak } = route.params || {};
  const dispatch = useDispatch();
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState(null);
  const [recordingText, setRecordingText] = useState(
    "Press the microphone button to start recording your voice."
  );
  const [recordingUri, setRecordingUri] = useState(null);
  const [durationMillis, setDurationMillis] = useState(0);
  const [recordingSize, setRecordingSize] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [toggleOn, setToggleOn] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const recordingInterval = useRef(null);
  const waveAnim1 = useRef(new Animated.Value(1)).current;
  const waveAnim2 = useRef(new Animated.Value(1)).current;
  const waveAnim3 = useRef(new Animated.Value(1)).current;

  const languages = [
    { label: "English (United States)", value: "en-US" },
    { label: "Arabic (Lebanese)", value: "ar-LB" },
    { label: "French (France)", value: "fr-FR" },
    // Other language options...
  ];

  const handleToggle = () => {
    setToggleOn(!toggleOn);
    if (!toggleOn) {
      setSelectedLanguage(null);
    }
  };

  const animateWaves = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(waveAnim1, {
          toValue: 1.5,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(waveAnim1, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ])
    ).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(waveAnim2, {
          toValue: 1.8,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(waveAnim2, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ])
    ).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(waveAnim3, {
          toValue: 2,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(waveAnim3, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const stopRecording = async () => {
    try {
      await recording.stopAndUnloadAsync();
      clearInterval(recordingInterval.current);

      const uri = recording.getURI();
      setRecordingUri(uri);

      const status = await recording.getStatusAsync();
      const durationInMillis = status.durationMillis || Date.now() - startTime;
      setDurationMillis(durationInMillis);

      const fileInfo = await FileSystem.getInfoAsync(uri);
      const sizeInBytes = fileInfo.size;
      setRecordingSize(sizeInBytes);

      setIsRecording(false);
      setRecordingText(
        "Press the microphone button to start recording your voice."
      );

      const formData = new FormData();
      formData.append("voiceNote", {
        uri,
        name: "voiceNote.m4a",
        type: "audio/m4a",
      });
      formData.append("duration", Math.floor(durationInMillis / 1000));
      formData.append("format", "m4a");
      formData.append("size", sizeInBytes);

      dispatch(
        saveVoiceNote(formData, uri, toggleOn ? selectedLanguage : null)
      );
    } catch (error) {
      console.error("Error stopping recording: ", error);
    }
  };

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await recording.startAsync();

      setRecording(recording);
      setStartTime(Date.now());
      setIsRecording(true);

      recordingInterval.current = setInterval(async () => {
        const status = await recording.getStatusAsync();
        setDurationMillis(status.durationMillis);
        setRecordingText(
          `Recording${".".repeat(Math.floor(status.durationMillis / 1000) % 4)}`
        );
      }, 1000);

      animateWaves(); // Start the wave animation when recording starts
    } catch (error) {
      console.error("Error starting recording: ", error);
    }
  };

  const handleMicrophonePress = async () => {
    if (isRecording) {
      await stopRecording();
    } else {
      await startRecording();
    }
  };

  const formatDuration = (millis) => {
    const totalSeconds = Math.ceil(millis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <View style={[styles.container, { backgroundColor: "#E3F2FD" }]}>
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
        <View style={styles.toggleContainer}>
          <Text style={styles.toggleLabel}>
            {toggleOn ? "Multilingual Model" : "Base Model"}
          </Text>
          <SwitchToggle
            switchOn={toggleOn}
            onPress={handleToggle}
            circleColorOff="#eeeeee"
            circleColorOn="#90caf9"
            backgroundColorOn="#2196F3"
            backgroundColorOff="#b0bec5"
            containerStyle={styles.toggleSwitch}
            circleStyle={styles.toggleCircle}
          />
        </View>
        {toggleOn && (
          <View style={styles.dropdownContainer}>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={languages}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select language"
              searchPlaceholder="Search..."
              value={selectedLanguage}
              onChange={(item) => {
                setSelectedLanguage(item.value);
              }}
            />
          </View>
        )}
        <View style={styles.microphoneContainer}>
          <TouchableOpacity
            style={[
              styles.microphoneButton,
              isRecording && { backgroundColor: "#ff6f61" }, // Pink when recording
            ]}
            onPress={handleMicrophonePress}
          >
            {!isRecording ? (
              <MaterialIcons name="mic" size={100} color="#FFFFFF" />
            ) : (
              <View style={styles.waveformContainer}>
                <Animated.View
                  style={[styles.wave, { transform: [{ scaleY: waveAnim1 }] }]}
                />
                <Animated.View
                  style={[styles.wave, { transform: [{ scaleY: waveAnim2 }] }]}
                />
                <Animated.View
                  style={[styles.wave, { transform: [{ scaleY: waveAnim3 }] }]}
                />
              </View>
            )}
          </TouchableOpacity>
        </View>

        <Text style={styles.analyzingText}>
          {isRecording
            ? `Recording... ${formatDuration(durationMillis)}`
            : recordingText}
        </Text>
      </SafeAreaView>
    </View>
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
    color: "#FF8A65",
  },
  streakBox: {
    width: 60,
    height: 60,
    backgroundColor: "#FFE0B2",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  streakNumber: {
    fontSize: 30,
    color: "#E64A19",
    fontWeight: "bold",
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  toggleLabel: {
    fontSize: 18,
    marginRight: 10,
    fontWeight: "bold",
  },
  toggleSwitch: {
    width: 60,
    height: 30,
    borderRadius: 25,
    padding: 5,
    backgroundColor: "#64b5f6",
  },
  toggleCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#42a5f5",
  },
  dropdownContainer: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  dropdown: {
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  microphoneContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  microphoneButton: {
    width: 150,
    height: 150,
    backgroundColor: "#0277BD",
    borderRadius: 75,
    justifyContent: "center",
    alignItems: "center",
  },
  waveformContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 100,
    alignItems: "center",
  },
  wave: {
    width: 10,
    backgroundColor: "#FFFFFF",
    height: 50,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  analyzingText: {
    padding: 10,
    textAlign: "center",
    marginBottom: 40,
    fontSize: 16,
    color: "#000",
  },
});

export default HomeScreen;
