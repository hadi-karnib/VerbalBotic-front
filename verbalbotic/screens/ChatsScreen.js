import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import { getMyChats } from "../store/Chats/chatsActions";
import { Audio } from "expo-av";
import Slider from "@react-native-community/slider";
import { API_URL } from "@env";
import { MaterialIcons } from "@expo/vector-icons";

const ChatsScreen = () => {
  const dispatch = useDispatch();
  const { chats, loading, error } = useSelector((state) => state.chats);
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    dispatch(getMyChats());
  }, [dispatch]);

  useEffect(() => {
    if (chats.length > 0) {
      console.log("Chats: ", chats);
    }
  }, [chats]);

  const playVoiceNote = async (messagePath) => {
    try {
      const fullPath = `${API_URL}/${messagePath}`;
      console.log("Playing voice note from:", fullPath);

      const { sound: newSound, status } = await Audio.Sound.createAsync(
        { uri: fullPath },
        { shouldPlay: true },
        onPlaybackStatusUpdate
      );

      setSound(newSound);
      setDuration(status.durationMillis);
      setIsPlaying(true);
    } catch (error) {
      console.error("Error playing sound", error);
    }
  };

  const stopVoiceNote = async () => {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
    }
  };

  const togglePlayPause = async (messagePath) => {
    if (isPlaying) {
      stopVoiceNote();
    } else {
      playVoiceNote(messagePath);
    }
  };

  const onPlaybackStatusUpdate = (status) => {
    if (status.isPlaying) {
      setProgress(status.positionMillis / status.durationMillis);
    }

    if (status.didJustFinish) {
      setIsPlaying(false);
      setProgress(0);
      sound.unloadAsync();
    }
  };

  return (
    <LinearGradient colors={["#f3cfd6", "#90c2d8"]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {loading && <Text>Loading...</Text>}
          {error && <Text>Error: {error}</Text>}
          {chats.map((chat) => (
            <View key={chat._id} style={styles.messageContainer}>
              <View style={styles.messageBubble}>
                <View style={styles.voiceNoteContainer}>
                  <TouchableOpacity
                    onPress={() => togglePlayPause(chat.message)}
                    style={styles.iconButton}
                  >
                    <MaterialIcons
                      name={isPlaying ? "pause" : "play-arrow"}
                      size={24}
                      color="#0288D1"
                    />
                  </TouchableOpacity>
                  <Slider
                    style={styles.progressBar}
                    value={progress}
                    minimumValue={0}
                    maximumValue={1}
                    minimumTrackTintColor="#0288D1"
                    maximumTrackTintColor="#ccc"
                    thumbTintColor="white"
                    onSlidingComplete={async (value) => {
                      if (sound) {
                        const position = value * duration;
                        await sound.setPositionAsync(position);
                      }
                    }}
                  />
                  <Text style={styles.durationText}>
                    {Math.floor((progress * duration) / 1000)}s /{" "}
                    {Math.floor(duration / 1000)}s
                  </Text>
                </View>
                <Text style={styles.timeText}>
                  {new Date(
                    chat.voiceNoteMetadata.uploadDate
                  ).toLocaleTimeString()}
                </Text>
              </View>
              {chat.AI_response && (
                <View style={[styles.messageBubble, styles.aiResponseBubble]}>
                  <Text style={styles.chatText}>{chat.AI_response}</Text>
                  <Text style={styles.timeText}>
                    {new Date(
                      chat.voiceNoteMetadata.uploadDate
                    ).toLocaleTimeString()}
                  </Text>
                </View>
              )}
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
  },
  messageContainer: {
    marginBottom: 20,
  },
  messageBubble: {
    backgroundColor: "#dcf8c6",
    padding: 15,
    borderRadius: 20,
    alignSelf: "flex-end",
    maxWidth: "80%",
    minWidth: "60%",
    position: "relative",
    marginBottom: 10,
  },
  aiResponseBubble: {
    backgroundColor: "#fff",
    alignSelf: "flex-start",
  },
  voiceNoteContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginRight: 10,
  },
  voiceNoteText: {
    color: "#0288D1",
    fontSize: 16,
  },
  progressBar: {
    flex: 1,
    height: 20,
  },
  thumb: {
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  durationText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 10,
  },
  chatText: {
    fontSize: 16,
    color: "#333",
  },
  timeText: {
    marginTop: "10px",
    fontSize: 10,
    color: "#666",
    position: "absolute",
    bottom: 4,
    right: 10,
  },
});

export default ChatsScreen;
