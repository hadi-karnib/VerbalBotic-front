import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  InteractionManager,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { fetchChildChats } from "../store/Chats/chatsActions";
import { Audio } from "expo-av";
import Slider from "@react-native-community/slider";
import { API_URL } from "@env";
import { MaterialIcons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import loadingAnimation from "../assets/loading.json";

const ChildChats = () => {
  const dispatch = useDispatch();
  const route = useRoute(); // Access route parameters
  const { id: childId } = route.params; // Assuming childId is passed in route params
  const { chats, loading, error } = useSelector((state) => state.chats);
  const [currentPlaying, setCurrentPlaying] = useState(null);
  const [progresses, setProgresses] = useState({});
  const [durations, setDurations] = useState({});
  const scrollViewRef = useRef(null);

  useEffect(() => {
    if (childId) {
      dispatch(fetchChildChats(childId)); // Dispatch with childId
    }
  }, [dispatch, childId]);

  useEffect(() => {
    if (chats.length > 0) {
      const initialDurations = {};
      chats.forEach((chat) => {
        initialDurations[chat._id] = chat.voiceNoteMetadata.duration * 1000;
      });
      setDurations(initialDurations);
    }
  }, [chats]);

  useFocusEffect(
    React.useCallback(() => {
      if (chats.length > 0) {
        InteractionManager.runAfterInteractions(() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        });
      }
    }, [chats])
  );

  const playVoiceNote = async (chatId, messagePath) => {
    if (currentPlaying && currentPlaying.sound) {
      await currentPlaying.sound.pauseAsync();
      setCurrentPlaying(null);
    }

    const chat = chats.find((chat) => chat._id === chatId);

    if (!chat || !chat.voiceNoteMetadata?.duration) {
      console.error("Error: Duration is null or undefined.");
      return;
    }

    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        playThroughEarpieceAndroid: false,
      });

      const fullPath = `${API_URL}/${messagePath}`;
      console.log("Playing voice note from:", fullPath);

      const { sound } = await Audio.Sound.createAsync(
        { uri: fullPath },
        { shouldPlay: true },
        (status) => onPlaybackStatusUpdate(chatId, status)
      );

      setCurrentPlaying({
        chatId,
        sound,
        duration: chat.voiceNoteMetadata.duration * 1000,
        isPlaying: true,
      });

      setProgresses((prev) => ({
        ...prev,
        [chatId]: 0,
      }));
    } catch (error) {
      console.error("Error playing sound", error);
    }
  };

  const stopVoiceNote = async () => {
    if (currentPlaying && currentPlaying.sound) {
      await currentPlaying.sound.pauseAsync();
      setCurrentPlaying((prev) => ({
        ...prev,
        isPlaying: false,
      }));
    }
  };

  const togglePlayPause = async (chatId, messagePath) => {
    if (currentPlaying && currentPlaying.chatId === chatId) {
      if (currentPlaying.isPlaying) {
        stopVoiceNote();
      } else {
        await currentPlaying.sound.playAsync();
        setCurrentPlaying((prev) => ({
          ...prev,
          isPlaying: true,
        }));
      }
    } else {
      playVoiceNote(chatId, messagePath);
    }
  };

  const onPlaybackStatusUpdate = (chatId, status) => {
    if (!durations[chatId]) {
      console.error("Error: Invalid duration value.");
      return;
    }

    const progressValue = status.positionMillis / durations[chatId];
    console.log("Progress:", progressValue);

    if (!isNaN(progressValue) && progressValue >= 0) {
      setProgresses((prev) => ({
        ...prev,
        [chatId]: progressValue,
      }));
    }

    if (status.didJustFinish) {
      stopVoiceNote();
      setProgresses((prev) => ({
        ...prev,
        [chatId]: 0,
      }));
    }
  };

  const formatTime = (timeInSeconds) => {
    const parsedTime = parseFloat(timeInSeconds);
    if (isNaN(parsedTime) || parsedTime < 0) {
      return "0";
    }
    return Math.floor(parsedTime);
  };

  return (
    <LinearGradient colors={["#f3cfd6", "#90c2d8"]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          ref={scrollViewRef}
        >
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
                      value={progresses[chat._id] || 0}
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
                          const position = value * durations[chat._id];
                          await currentPlaying.sound.setPositionAsync(position);
                          setProgresses((prev) => ({
                            ...prev,
                            [chat._id]: value,
                          }));
                        }
                      }}
                    />
                    <Text style={styles.durationText}>
                      {`${formatTime(
                        ((progresses[chat._id] || 0) * durations[chat._id]) /
                          1000
                      )}s / ${formatTime((durations[chat._id] || 0) / 1000)}s`}
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

export default ChildChats;
