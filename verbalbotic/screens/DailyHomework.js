import React from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

const DailyHomework = () => {
  const { user } = useSelector((state) => state.user);

  // Filter the not completed and completed homework
  const notCompletedHomework = user.dailyHomework.filter(
    (homework) => !homework.isCompleted
  );
  const completedHomework = user.dailyHomework.filter(
    (homework) => homework.isCompleted
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Daily Exercises</Text>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.sectionTitle}>Not Completed</Text>
          {notCompletedHomework.map((homework) => (
            <View key={homework._id} style={styles.card}>
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
            </View>
          ))}

          <Text style={styles.sectionTitle}>Completed</Text>
          {completedHomework.map((homework) => (
            <View key={homework._id} style={styles.card}>
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
            </View>
          ))}
        </ScrollView>
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
  },
  cardTime: {
    fontSize: 12,
    color: "#666",
  },
});

export default DailyHomework;
