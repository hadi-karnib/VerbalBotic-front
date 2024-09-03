import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Animated,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchChildren } from "../../store/children/childActions";
import { LinearGradient } from "expo-linear-gradient";
import LottieView from "lottie-react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Adminchildren = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation(); // Access navigation
  const { children, loading, error } = useSelector((state) => state.children);

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const translateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    dispatch(fetchChildren());

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    Animated.spring(translateAnim, {
      toValue: 0,
      speed: 1,
      bounciness: 20,
      useNativeDriver: true,
    }).start();
  }, [dispatch]);

  const getColorForIndex = (index) => {
    const colors = ["#ff9999", "#66b3ff", "#99ff99", "#ffcc99", "#c2c2f0"];
    return colors[index % colors.length];
  };

  const handlePress = (childId, childName) => {
    navigation.navigate("ChildChats", { id: childId, name: childName });
  };

  return (
    <LinearGradient colors={["#f3cfd6", "#90c2d8"]} style={styles.gradient}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.title}>Children</Text>
          {loading && (
            <View style={styles.loadingContainer}>
              <LottieView
                source={require("../../assets/loading.json")}
                autoPlay
                loop
                style={styles.loadingAnimation}
              />
            </View>
          )}
          {error && <Text style={styles.errorText}>Error: {error}</Text>}
          {!loading && children.length > 0 && (
            <View style={styles.childrenList}>
              {children.map((child, index) => (
                <TouchableOpacity
                  key={child._id}
                  onPress={() => handlePress(child._id)}
                >
                  <Animated.View
                    style={[
                      styles.childItem,
                      {
                        opacity: fadeAnim,
                        transform: [{ translateY: translateAnim }],
                      },
                    ]}
                  >
                    <View
                      style={[
                        styles.avatarPlaceholder,
                        { backgroundColor: getColorForIndex(index) },
                      ]}
                    >
                      <Text style={styles.avatarText}>
                        {child.name.charAt(0)}
                      </Text>
                    </View>
                    <View style={styles.rowView}>
                      <View style={styles.childInfo}>
                        <Text style={styles.childName}>{child.name}</Text>
                        <Text style={styles.childAge}>
                          {child.age} years old
                        </Text>
                      </View>
                      <View style={styles.arrowIcon}>
                        <MaterialIcons
                          name="arrow-forward-ios"
                          size={15}
                          color="#757575"
                        />
                      </View>
                    </View>
                  </Animated.View>
                </TouchableOpacity>
              ))}
            </View>
          )}
          {!loading && children.length === 0 && (
            <Text style={styles.noChildrenText}>No children added yet.</Text>
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  safeArea: {
    flex: 1,
  },
  rowView: {
    display: "flex",
    flexDirection: "row",
    maxWidth: "80%",
  },
  arrowIcon: {
    paddingTop: 15,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
    textAlign: "start",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingAnimation: {
    width: 150,
    height: 150,
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginVertical: 10,
  },
  noChildrenText: {
    fontSize: 18,
    color: "#757575",
    textAlign: "center",
    marginTop: 20,
  },
  childrenList: {
    flex: 1,
  },
  childItem: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  childInfo: {
    flex: 1,
  },
  childName: {
    fontSize: 18,
    color: "#333",
    fontWeight: "600",
  },
  childAge: {
    fontSize: 16,
    color: "#757575",
    marginTop: 4,
  },
});

export default Adminchildren;
