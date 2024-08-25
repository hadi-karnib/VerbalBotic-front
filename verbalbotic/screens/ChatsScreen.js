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
import LottieView from "lottie-react-native";
import loadingAnimation from "../assets/loading.json";

const ChatsScreen = () => {
  const dispatch = useDispatch();
  const { chats, loading, error } = useSelector((state) => state.chats);
  const [currentPlaying, setCurrentPlaying] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    dispatch(getMyChats());
  }, [dispatch]);

  const playVoiceNote = async (chatId, messagePath) => {
    if (currentPlaying?.sound) {
      await currentPlaying.sound.unloadAsync(); // Stop and unload the previous sound
    }

    const chat = chats.find((chat) => chat._id === chatId);
    if (!chat || !chat.voiceNoteMetadata?.duration) {
      console.error("Error: Invalid or missing duration.");
      return;
    }

    try {
      const fullPath = `${API_URL}/${messagePath}`;
      console.log("Playing voice note from:", fullPath);

      const { sound, status } = await Audio.Sound.createAsync(
        { uri: fullPath },
        { shouldPlay: true },
        (status) => onPlaybackStatusUpdate(chatId, status)
      );

      setCurrentPlaying({
        chatId,
        sound,
        duration: chat.voiceNoteMetadata.duration,
      });
      setProgress(0); // Reset progress when a new note starts playing
    } catch (error) {
      console.error("Error playing sound", error);
    }
  };

  const stopVoiceNote = async () => {
    if (currentPlaying?.sound) {
      await currentPlaying.sound.unloadAsync();
      setCurrentPlaying(null);
      setProgress(0);
    }
  };

  const togglePlayPause = async (chatId, messagePath) => {
    if (currentPlaying?.chatId === chatId) {
      if (currentPlaying.isPlaying) {
        await currentPlaying.sound.pauseAsync();
      } else {
        await currentPlaying.sound.playAsync();
      }
    } else {
      await playVoiceNote(chatId, messagePath);
    }
  };

  const onPlaybackStatusUpdate = (chatId, status) => {
    if (status.isLoaded) {
      const newProgress = status.positionMillis / (status.durationMillis || 1);
      setProgress(newProgress);

      setCurrentPlaying((prev) => ({
        ...prev,
        isPlaying: status.isPlaying,
      }));

      if (status.didJustFinish) {
        stopVoiceNote();
      }
    } else {
      console.error("Error: Sound not loaded correctly.");
    }
  };

  const formatTime = (timeInMillis) => {
    if (!timeInMillis || isNaN(timeInMillis)) return "0:00";
    const timeInSeconds = Math.floor(timeInMillis / 1000);
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <LinearGradient colors={["#f3cfd6", "#90c2d8"]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {loading && (
            <View style={styles.lottieContainer}>
              <LottieView
                source={loadingAnimation}
                autoPlay
                loop
                style={styles.lottie}
              />
            </View>
          )}
          {error && <Text>Error: {error}</Text>}
          {!loading &&
            chats.map((chat) => (
              <View key={chat._id} style={styles.messageContainer}>
                <View style={styles.messageBubble}>
                  <View style={styles.voiceNoteContainer}>
                    <TouchableOpacity
                      onPress={() => togglePlayPause(chat._id, chat.message)}
                      style={styles.iconButton}
                    >
                      <MaterialIcons
                        name={
                          currentPlaying?.chatId === chat._id &&
                          currentPlaying.isPlaying
                            ? "pause"
                            : "play-arrow"
                        }
                        size={24}
                        color="#0288D1"
                      />
                    </TouchableOpacity>
                    <Slider
                      style={styles.progressBar}
                      value={currentPlaying?.chatId === chat._id ? progress : 0}
                      minimumValue={0}
                      maximumValue={1}
                      minimumTrackTintColor="#0288D1"
                      maximumTrackTintColor="#ccc"
                      thumbTintColor="white"
                      onSlidingComplete={async (value) => {
                        if (currentPlaying?.chatId === chat._id) {
                          const position =
                            value * currentPlaying.duration * 1000;
                          await currentPlaying.sound.setPositionAsync(position);
                          setProgress(value);
                        }
                      }}
                    />
                    <Text style={styles.durationText}>
                      {formatTime(
                        progress * (currentPlaying?.duration || 0) * 1000
                      )}{" "}
                      / {formatTime((currentPlaying?.duration || 0) * 1000)}
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
    flexGrow: 1,
    justifyContent: "center",
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
  progressBar: {
    flex: 1,
    height: 20,
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
    fontSize: 10,
    color: "#666",
    position: "absolute",
    bottom: 4,
    right: 10,
  },
  lottieContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 300,
  },
  lottie: {
    width: 200,
    height: 200,
  },
});

export default ChatsScreen;
