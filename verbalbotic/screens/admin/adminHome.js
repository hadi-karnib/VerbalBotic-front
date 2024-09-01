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
    navigation.navigate("adminTabs", { screen: "Profile" });
  };

  const handleNoChildrenPress = () => {
    navigation.navigate("adminTabs", { screen: "Profile" });
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
              <TouchableOpacity onPress={handleNoChildrenPress}>
                <Animated.View
                  style={{
                    opacity: fadeAnim,
                    transform: [{ translateY: translateAnim }],
                  }}
                >
                  <Text style={styles.noChildrenText}>
                    You still haven't added a child. Let's fix that.
                    <View style={styles.arrowIcon}>
                      <MaterialIcons
                        name="arrow-forward-ios"
                        size={15}
                        color="#757575"
                      />
                    </View>
                  </Text>
                </Animated.View>
              </TouchableOpacity>
            )}
            {!loading &&
              children.map((child, index) => (
                <Animated.View
                  key={child._id}
                  style={[
                    styles.childItem,
                    index === children.length - 1 && styles.lastChildItem,
                    {
                      opacity: fadeAnim,
                      transform: [{ translateY: translateAnim }],
                    },
                  ]}
                >
                  <TouchableOpacity onPress={handleChildPress}>
                    <View style={styles.childRow}>
                      <Text style={styles.childName}>{child.name}</Text>
                      <Text style={styles.childAge}>{child.age} years</Text>
                    </View>
                  </TouchableOpacity>
                </Animated.View>
              ))}
          </View>

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
    elevation: 3,
  },
  childRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  lastChildItem: {
    marginBottom: 20,
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
    flex: 1,
  },
  childAge: {
    fontSize: 16,
    color: "#757575",
    marginRight: 10,
  },
  infoBox: {
    flex: 1,
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
    elevation: 3,
  },
  infoText: {
    fontSize: 32,
    color: "#333",
    textAlign: "center",
  },
  arrowIcon: {
    alignItems: "center",
    paddingTop: 10,
  },
});

export default AdminHome;
