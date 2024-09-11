import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import { fetchChildren } from "../../store/children/childActions";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";

const AdminHome = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { children, loading, error } = useSelector((state) => state.children);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateAnim = useRef(new Animated.Value(10)).current;

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

  const handleChildPress = () => {
    navigation.navigate("adminTabs", { screen: "Children Chats" });
  };

  const handleNoChildrenPress = () => {
    navigation.navigate("adminTabs", { screen: "Profile" });
  };

  const scaleAnim = new Animated.Value(1);

  const animatePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const animatePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
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
        {!loading && children.length === 0 && (
          <TouchableOpacity onPress={handleNoChildrenPress}>
            <Animated.View
              style={[
                styles.noChildrenContainer,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: translateAnim }],
                },
              ]}
            >
              <Text style={styles.noChildrenText}>
                You still haven't added a child. Let's fix that.
              </Text>
            </Animated.View>
          </TouchableOpacity>
        )}
        {!loading &&
          children.length > 0 &&
          children.map((child) => (
            <Animated.View
              key={child._id}
              style={[
                styles.childItem,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: translateAnim }],
                },
              ]}
            >
              <TouchableOpacity
                onPressIn={animatePressIn}
                onPressOut={animatePressOut}
                onPress={handleChildPress}
                activeOpacity={0.8}
              >
                <Animated.View
                  style={{
                    transform: [{ scale: scaleAnim }],
                  }}
                >
                  <View style={styles.childRow}>
                    <Text style={styles.childName}>{child.name}</Text>
                    <Text style={styles.childAge}>{child.age} years</Text>
                  </View>
                </Animated.View>
              </TouchableOpacity>
            </Animated.View>
          ))}
        <Animated.View
          style={[
            styles.infoBox,
            { opacity: fadeAnim, transform: [{ translateY: translateAnim }] },
          ]}
        >
          <Text style={styles.infoText}>
            Here you can monitor what your child talks with our AI and what
            their tasks are to perform better.
          </Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#e0e0e0 ",
  },
  container: {
    flex: 1,
    paddingTop: 20,
  },
  loadingAnimation: {
    width: 150,
    height: 150,
    alignSelf: "center",
  },
  title: {
    paddingHorizontal: 20,
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 18,
    color: "#757575",
    textAlign: "center",
    marginVertical: 10,
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginVertical: 10,
  },
  noChildrenContainer: {
    backgroundColor: "#d0d0d0",
    padding: 15,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
    marginHorizontal: 20,
  },
  noChildrenText: {
    fontSize: 18,
    color: "#000",
    textAlign: "center",
  },
  childItem: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    marginHorizontal: 20,
  },
  childRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  childName: {
    fontSize: 18,
    color: "#333",
  },
  childAge: {
    fontSize: 16,
    color: "#757575",
  },
  infoBox: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 25,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
  },
  infoText: {
    fontSize: 28,
    color: "#333",
    textAlign: "center",
  },
});

export default AdminHome;
