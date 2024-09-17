import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Modal,
  TouchableOpacity,
  Animated,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import LottieView from "lottie-react-native";
import {
  markHomeworkAsDone,
  getUserDailyHomework,
} from "../store/Chats/chatsActions";
import { isAuthenticated } from "../components/checkUser";
const DailyHomework = () => {
  const dispatch = useDispatch();

  const { dailyHomework, loading } = useSelector((state) => state.chats);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHomework, setSelectedHomework] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial fade value is 0
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const authStatus = await isAuthenticated();
      if (!authStatus) {
        Alert.alert(
          "Access Denied",
          "You are not authorized to access this page."
        );
        navigation.navigate("Login"); // Redirect to login if not authenticated
      } else {
        setIsUserAuthenticated(true);
      }
      setLoadingAuth(false);
    };

    checkAuthStatus();
  }, []);

  useEffect(() => {
    if (isUserAuthenticated) {
      dispatch(getUserDailyHomework());
    }
  }, [dispatch, isUserAuthenticated]);

  useEffect(() => {
    if (modalVisible) {
      fadeIn();
    } else {
      fadeOut();
    }
  }, [modalVisible]);

  const fadeIn = () => {
    fadeAnim.setValue(0);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const notCompletedHomework =
    dailyHomework?.filter((homework) => !homework.isCompleted) || [];

  const completedHomework =
    dailyHomework?.filter((homework) => homework.isCompleted) || [];

  const handleCardPress = (homework) => {
    setSelectedHomework(homework);
    setModalVisible(true);
  };

  const markAsDone = () => {
    if (selectedHomework && !selectedHomework.isCompleted) {
      dispatch(markHomeworkAsDone(selectedHomework._id));
      setModalVisible(false);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    fadeOut();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Daily Exercises</Text>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <LottieView
              source={require("../assets/loading.json")}
              autoPlay
              loop
              style={styles.loadingAnimation}
            />
          </View>
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
            animationType="none" // Disable default animation
            onRequestClose={() => setModalVisible(false)}
          >
            <Animated.View
              style={[
                styles.modalContainer,
                { opacity: fadeAnim }, // Apply fade-in animation
              ]}
            >
              <View style={styles.modalContent}>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <MaterialIcons name="close" size={24} color="black" />
                </TouchableOpacity>

                <View style={styles.modalHeader}>
                  <Text
                    style={styles.modalTitle}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
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
                  onPress={
                    selectedHomework.isCompleted ? closeModal : markAsDone
                  }
                  style={[
                    styles.doneButton,
                    selectedHomework.isCompleted && styles.alreadyDoneButton,
                  ]}
                >
                  <Text style={styles.doneButtonText}>
                    {selectedHomework.isCompleted
                      ? "Already Done"
                      : "Mark as Done"}
                  </Text>
                </TouchableOpacity>

                {!selectedHomework.isCompleted && (
                  <LottieView
                    source={require("../assets/ChildPressing.json")}
                    autoPlay
                    loop
                    style={styles.lottieAnimation}
                  />
                )}
              </View>
            </Animated.View>
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
    backgroundColor: "rgba(0,0,0,0.5)", // Add background color to the modal
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
    alignItems: "baseline",
    marginBottom: 15,
    marginTop: 30,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    width: "60%",
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
  alreadyDoneButton: {
    backgroundColor: "#B3E5FC",
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingAnimation: {
    width: 200,
    height: 200,
  },
});

export default DailyHomework;
