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

const AdminHome = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { children, loading, error } = useSelector((state) => state.children);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateAnim = useRef(new Animated.Value(10)).current;

  useEffect(() => {
    dispatch(fetchChildren());

    // Animation effect
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
    <LinearGradient colors={["#f3cfd6", "#90c2d8"]} style={styles.gradient}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.title}>Children</Text>

          {loading && <Text style={styles.loadingText}>Loading...</Text>}
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
                  <MaterialIcons
                    name="arrow-forward-ios"
                    size={15}
                    color="#757575"
                    style={styles.arrowIcon}
                  />
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
    paddingTop: 20,
  },
  title: {
    paddingHorizontal: 20,
    fontSize: 24,
    fontWeight: "bold",
    color: "#0288D1",
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
    backgroundColor: "#F0F0F0",
    padding: 15,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
  },
  noChildrenText: {
    fontSize: 18,
    color: "#757575",
    textAlign: "center",
  },
  arrowIcon: {
    marginLeft: 5,
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
