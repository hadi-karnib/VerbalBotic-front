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

  console.log("Children data in component:", children);
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
    navigation.navigate("adminTabs", { screen: "Adminchildren" });
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
                  <TouchableOpacity onPress={handleChildPress}>
                    <View style={styles.childRow}>
                      <View style={styles.avatarPlaceholder}>
                        <Text style={styles.avatarText}>
                          {child.name.charAt(0)}
                        </Text>
                      </View>
                      <View style={styles.childInfo}>
                        <Text style={styles.childName}>{child.name}</Text>
                        <Text style={styles.childAge}>
                          {child.age} years old
                        </Text>
                      </View>
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
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  childRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatarPlaceholder: {
    backgroundColor: "#0288D1",
    borderRadius: 25,
    height: 50,
    width: 50,
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
    fontSize: 20,
    color: "#333",
    fontWeight: "600",
  },
  childAge: {
    fontSize: 16,
    color: "#757575",
    marginTop: 4,
  },
  noChildrenText: {
    fontSize: 18,
    color: "#757575",
    textAlign: "center",
    marginTop: 20,
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
  arrowIcon: {
    alignItems: "center",
    paddingTop: 10,
  },
});

export default AdminHome;
