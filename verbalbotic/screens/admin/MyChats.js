import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { getMyChats } from "../../store/Chats/chatsActions"; // Assuming getMyChats is the correct action for fetching user chats

const MyChats = () => {
  const dispatch = useDispatch();
  const scrollViewRef = useRef(null);

  const { user } = useSelector((state) => state.user);
  const { chats = [], loading, error } = useSelector((state) => state.chats);

  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    if (user) {
      dispatch(getMyChats());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [chats]);

  const handleSend = () => {
    // Function to send new message (implementation depends on your message sending setup)
  };

  return (
    <LinearGradient colors={["#f3cfd6", "#90c2d8"]} style={styles.gradient}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContainer}>
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>{user?.name?.charAt(0)}</Text>
          </View>
          <Text style={styles.headerText}>My Chats</Text>
        </View>

        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollContainer}
        >
          {loading ? (
            <Text style={styles.loadingText}>Loading chats...</Text>
          ) : (
            chats.map((chat, index) => (
              <View key={index} style={styles.messageBubble}>
                <Text style={styles.messageText}>{chat.message}</Text>
                <Text style={styles.timeText}>
                  {new Date(chat.timestamp).toLocaleTimeString()}
                </Text>
              </View>
            ))
          )}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message"
            value={messageInput}
            onChangeText={setMessageInput}
          />
          <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
            <MaterialIcons name="send" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#f3cfd6",
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#66b3ff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  messageBubble: {
    backgroundColor: "#dcf8c6",
    padding: 15,
    borderRadius: 20,
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: 16,
    color: "#333",
  },
  timeText: {
    fontSize: 12,
    color: "#999",
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopWidth: 1,
    borderColor: "#90c2d8",
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 25,
    fontSize: 16,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#66b3ff",
    padding: 10,
    borderRadius: 25,
  },
  loadingText: {
    textAlign: "center",
    color: "#666",
    fontSize: 16,
  },
});

export default MyChats;
