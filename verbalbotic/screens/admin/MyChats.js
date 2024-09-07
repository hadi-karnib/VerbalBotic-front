import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Animated,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";

const MyChats = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { messages, loading } = useSelector((state) => state.messages);
  const [messageInput, setMessageInput] = useState("");
  const scrollViewRef = useRef(null);

  useEffect(() => {
    dispatch(fetchMessages(user._id));
  }, [dispatch]);

  const handleSend = () => {
    if (messageInput.trim() !== "") {
      dispatch(sendMessage({ userId: user._id, message: messageInput }));
      setMessageInput("");
    }
  };

  useEffect(() => {
    // Scroll to the bottom whenever new messages arrive
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  return (
    <LinearGradient colors={["#f3cfd6", "#90c2d8"]} style={styles.gradient}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header with User Initials and Name */}
        <View style={styles.headerContainer}>
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>{user?.name?.charAt(0)}</Text>
          </View>
          <Text style={styles.headerText}>{user?.name}</Text>
        </View>

        {/* Messages ScrollView */}
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollContainer}
        >
          {loading ? (
            <Text style={styles.loadingText}>Loading messages...</Text>
          ) : (
            messages.map((msg, index) => (
              <View key={index} style={styles.messageBubble}>
                <Text style={styles.messageText}>{msg.content}</Text>
                <Text style={styles.timeText}>{msg.timestamp}</Text>
              </View>
            ))
          )}
        </ScrollView>

        {/* Message Input Section */}
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
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ccc",
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
