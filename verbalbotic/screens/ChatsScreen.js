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

  useEffect(() => {
    dispatch(getMyChats());
  }, [dispatch]);

  useEffect(() => {
    if (chats.length > 0) {
      console.log("Chats: ", chats);
    }
  }, [chats]);

  const playVoiceNote = async (chatId, messagePath) => {
    if (currentPlaying && currentPlaying.sound) {
      await currentPlaying.sound.unloadAsync();
      setCurrentPlaying(null);
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
        duration: status.durationMillis,
        isPlaying: true,
        progress: 0,
      });
    } catch (error) {
      console.error("Error playing sound", error);
    }
  };

  const stopVoiceNote = async () => {
    if (currentPlaying && currentPlaying.sound) {
      await currentPlaying.sound.stopAsync();
      setCurrentPlaying(null);
    }
  };

  const togglePlayPause = async (chatId, messagePath) => {
    if (
      currentPlaying &&
      currentPlaying.chatId === chatId &&
      currentPlaying.isPlaying
    ) {
      stopVoiceNote();
    } else {
      playVoiceNote(chatId, messagePath);
    }
  };

  const onPlaybackStatusUpdate = (chatId, status) => {
    if (status.isPlaying) {
      setCurrentPlaying((prev) => ({
        ...prev,
        progress: status.positionMillis / status.durationMillis,
        isPlaying: true,
      }));
    }

    if (status.didJustFinish) {
      setCurrentPlaying(null);
    }
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
                          currentPlaying &&
                          currentPlaying.chatId === chat._id &&
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
                      value={
                        currentPlaying && currentPlaying.chatId === chat._id
                          ? currentPlaying.progress
                          : 0
                      }
                      minimumValue={0}
                      maximumValue={1}
                      minimumTrackTintColor="#0288D1"
                      maximumTrackTintColor="#ccc"
                      thumbTintColor="white"
                      onSlidingComplete={async (value) => {
                        if (
                          currentPlaying &&
                          currentPlaying.sound &&
                          currentPlaying.chatId === chat._id
                        ) {
                          const position = value * currentPlaying.duration;
                          await currentPlaying.sound.setPositionAsync(position);
                        }
                      }}
                    />
                    <Text style={styles.durationText}>
                      {Math.floor(
                        (currentPlaying && currentPlaying.chatId === chat._id
                          ? currentPlaying.progress * currentPlaying.duration
                          : 0) / 1000
                      )}
                      s /{" "}
                      {Math.floor(
                        currentPlaying ? currentPlaying.duration / 1000 : 0
                      )}
                      s
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
  lottie: {
    width: 100,
    height: 100,
    alignSelf: "center",
  },
});

export default ChatsScreen;
