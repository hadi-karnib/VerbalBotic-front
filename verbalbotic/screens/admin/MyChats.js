import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { getMyChats } from "../../store/Chats/chatsActions";

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
    // Your send message logic here
  };

  return (
    <LinearGradient colors={["#f3cfd6", "#90c2d8"]} style={styles.gradient}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <KeyboardAwareScrollView
            ref={scrollViewRef}
            contentContainerStyle={styles.scrollContainer}
            extraHeight={10}
          >
            <View style={styles.headerContainer}>
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>{user?.name?.charAt(0)}</Text>
              </View>
              <Text style={styles.headerText}>My Chats</Text>
            </View>

            {loading ? (
              <View style={styles.loadingContainer}>
                <LottieView
                  source={require("../../assets/loading.json")}
                  autoPlay
                  loop
                  style={styles.loadingAnimation}
                />
              </View>
            ) : chats.length === 0 ? (
              <View style={styles.noChatsContainer}>
                <LottieView
                  source={require("../../assets/NoChats.json")}
                  autoPlay
                  loop
                  style={styles.noChatsAnimation}
                />
                <Text style={styles.noChatsText}>
                  No chats for now. Let’s Start!
                </Text>
              </View>
            ) : (
              chats.map((chat, index) => {
                return (
                  <View key={index} style={styles.messageBubble}>
                    <Text style={styles.messageText}>{chat.message}</Text>
                    <Text style={styles.timeText}>
                      {new Date(chat.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </Text>
                  </View>
                );
              })
            )}
          </KeyboardAwareScrollView>

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
        </KeyboardAvoidingView>
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
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
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
    alignSelf: "flex-end",
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
  noChatsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noChatsText: {
    fontSize: 20,
    color: "#000",
    marginTop: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noChatsAnimation: {
    width: 200,
    height: 200,
  },
  loadingAnimation: {
    width: 150,
    height: 150,
  },
});

export default MyChats;
