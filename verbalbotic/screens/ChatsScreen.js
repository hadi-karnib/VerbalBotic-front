import React, { useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import { getMyChats } from "../store/Chats/chatsActions";

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

  return (
    <LinearGradient colors={["#f3cfd6", "#90c2d8"]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>Chats Screen</Text>
          {loading && <Text>Loading...</Text>}
          {error && <Text>Error: {error}</Text>}
          {chats.map((chat) => (
            <View key={chat._id} style={styles.chatContainer}>
              <Text style={styles.chatText}>{chat.message}</Text>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
  },
  chatContainer: {
    padding: 15,
    backgroundColor: "#FFF3E0",
    borderRadius: 10,
    marginBottom: 10,
  },
  chatText: {
    fontSize: 16,
    color: "#333",
  },
});

export default ChatsScreen;
