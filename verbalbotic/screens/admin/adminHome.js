import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import { fetchChildren } from "../../store/children/childActions";
import { useNavigation } from "@react-navigation/native";

const AdminHome = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { children, loading, error } = useSelector((state) => state.children);

  useEffect(() => {
    dispatch(fetchChildren());
  }, [dispatch]);

  const handleChildPress = () => {
    navigation.navigate("adminProfile");
  };

  return (
    <LinearGradient colors={["#f3cfd6", "#90c2d8"]} style={styles.gradient}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.childrenList}>
            <Text style={styles.title}>Children</Text>

            {loading && <Text>Loading...</Text>}
            {error && <Text>Error: {error}</Text>}
            {!loading && children.length === 0 && (
              <Text style={styles.noChildrenText}>
                You still haven't added a child Lets fix that.
              </Text>
            )}
            {!loading &&
              children.map((child, index) => (
                <TouchableOpacity
                  key={child._id}
                  style={[
                    styles.childItem,
                    index === children.length - 1 && styles.lastChildItem, // Apply extra margin to the last child
                  ]}
                  onPress={handleChildPress}
                >
                  <Text style={styles.childName}>{child.name}</Text>
                  <Text style={styles.childAge}>{child.age} years</Text>
                </TouchableOpacity>
              ))}
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              Here you can monitor what your child talks with our AI and what
              their tasks are to perform better.
            </Text>
          </View>
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
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0288D1",
    marginBottom: 20,
  },
  childrenList: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  childItem: {
    backgroundColor: "#F5F5F5",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Adds shadow for Android
  },
  lastChildItem: {
    marginBottom: 20, // Extra margin for the last child
  },
  noChildrenText: {
    fontSize: 18,
    color: "#757575",
    textAlign: "center",
    marginTop: 20,
  },
  childName: {
    fontSize: 18,
    color: "#0288D1",
  },
  childAge: {
    fontSize: 16,
    color: "#757575",
  },
  infoBox: {
    flex: 1, // Makes the info box fill the remaining space
    backgroundColor: "#F5F5F5",
    padding: 20,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Adds shadow for Android
  },
  infoText: {
    fontSize: 32,
    color: "#333",
    textAlign: "center",
  },
});

export default AdminHome;
