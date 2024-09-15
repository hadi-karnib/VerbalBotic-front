import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Modal,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import LottieView from "lottie-react-native";
import {
  markHomeworkAsDone,
  getUserDailyHomework,
} from "../store/Chats/chatsActions";

const DailyHomework = () => {
  const dispatch = useDispatch();

  // Get the dailyHomework and loading state from Redux
  const { dailyHomework, loading } = useSelector((state) => state.chats);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHomework, setSelectedHomework] = useState(null);

  // Fetch daily homework on component mount
  useEffect(() => {
    dispatch(getUserDailyHomework());
  }, []);

  // Separate the completed and not completed homework
  const notCompletedHomework =
    dailyHomework?.filter((homework) => !homework.isCompleted) || [];

  const completedHomework =
    dailyHomework?.filter((homework) => homework.isCompleted) || [];

  const handleCardPress = (homework) => {
    setSelectedHomework(homework);
    setModalVisible(true);
  };

  const markAsDone = () => {
    if (selectedHomework) {
      // Optimistically update without showing any loading
      dispatch(markHomeworkAsDone(selectedHomework._id));

      // Close the modal immediately after the dispatch
      setModalVisible(false);
    }
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Daily Exercises</Text>
        </View>

        {/* Display loading spinner or homework content */}
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <ScrollView contentContainerStyle={styles.content}>
            <Text style={styles.sectionTitle}>Not Completed</Text>
            {notCompletedHomework.map((homework) => (
              <TouchableOpacity
                key={homework._id}
                style={styles.card}
                onPress={() => handleCardPress(homework)}
              >
                <View style={styles.cardContent}>
                  <View style={styles.textContainer}>
                    <Text style={styles.cardTitle}>{homework.title}</Text>
                    <Text style={styles.cardDescription}>
                      {homework.description}
                    </Text>
                    <Text style={styles.cardTime}>
                      Time: {homework.timeInMinutes} minutes
                    </Text>
                  </View>
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={24}
                    color="black"
                  />
                </View>
              </TouchableOpacity>
            ))}

            <Text style={styles.sectionTitle}>Completed</Text>
            {completedHomework.map((homework) => (
              <TouchableOpacity
                key={homework._id}
                style={styles.card}
                onPress={() => handleCardPress(homework)}
              >
                <View style={styles.cardContent}>
                  <View style={styles.textContainer}>
                    <Text style={styles.cardTitle}>{homework.title}</Text>
                    <Text style={styles.cardDescription}>
                      {homework.description}
                    </Text>
                    <Text style={styles.cardTime}>
                      Time: {homework.timeInMinutes} minutes
                    </Text>
                  </View>
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={24}
                    color="black"
                  />
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        {selectedHomework && (
          <Modal
            transparent={true}
            visible={modalVisible}
            animationType="slide"
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <MaterialIcons name="close" size={24} color="black" />
                </TouchableOpacity>

                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>
                    {selectedHomework.title}
                  </Text>
                  <Text style={styles.modalTime}>
                    Time: {selectedHomework.timeInMinutes} minutes
                  </Text>
                </View>
                <Text style={styles.modalDescription}>
                  {selectedHomework.description}
                </Text>

                <TouchableOpacity
                  onPress={markAsDone}
                  style={styles.doneButton}
                >
                  <Text style={styles.doneButtonText}>Mark as Done</Text>
                </TouchableOpacity>

                <LottieView
                  source={require("../assets/ChildPressing.json")}
                  autoPlay
                  loop
                  style={styles.lottieAnimation}
                />
              </View>
            </View>
          </Modal>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#E3F2FD",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  content: {
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0288D1",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 2,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  cardDescription: {
    fontSize: 14,
    color: "#333",
    marginVertical: 5,
    flexWrap: "nowrap",
  },
  cardTime: {
    fontSize: 12,
    color: "#666",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    marginTop: 30,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  modalTime: {
    fontSize: 14,
    fontWeight: "bold",
    color: "green",
  },
  modalDescription: {
    fontSize: 16,
    color: "#333",
    textAlign: "justify",
    flexWrap: "nowrap",
    marginBottom: 10,
  },
  doneButton: {
    marginTop: 20,
    alignItems: "center",
    backgroundColor: "#0288D1",
    padding: 10,
    borderRadius: 5,
  },
  doneButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  lottieAnimation: {
    width: 200,
    height: 200,
    marginTop: -20,
    alignSelf: "center",
  },
});

export default DailyHomework;
