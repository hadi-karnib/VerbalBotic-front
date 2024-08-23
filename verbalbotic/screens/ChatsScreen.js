import React, { useEffect } from "react";
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
import { API_URL } from "@env"; // Ensure you have set up @env correctly to import the API_URL

const ChatsScreen = () => {
  const dispatch = useDispatch();
  const { chats, loading, error } = useSelector((state) => state.chats);

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

      const { sound } = await Audio.Sound.createAsync({ uri: fullPath });
      await sound.playAsync();

      sound.setOnPlaybackStatusUpdate(async (status) => {
        if (status.didJustFinish) {
          await sound.unloadAsync();
        }
      });
    } catch (error) {
      console.error("Error playing sound", error);
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
                <TouchableOpacity
                  onPress={() => playVoiceNote(chat.message)}
                  style={styles.voiceNoteContainer}
                >
                  <Text style={styles.voiceNoteText}>Play Voice Note</Text>
                </TouchableOpacity>
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
    position: "relative",
    marginBottom: 10,
  },
  aiResponseBubble: {
    backgroundColor: "#fff",
    alignSelf: "flex-start",
  },
  voiceNoteContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  voiceNoteText: {
    color: "#0288D1",
    fontSize: 16,
  },
  chatText: {
    fontSize: 16,
    color: "#333",
  },
  timeText: {
    fontSize: 10,
    color: "#666",
    position: "absolute",
    bottom: 5,
    right: 10,
  },
});

export default ChatsScreen;
