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
import NoChildrenAnimation from "../../assets/NoChildren.json";
import { getSelf } from "../../store/user/userActions";

const Adminchildren = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { children, loading } = useSelector((state) => state.children);
  const { user, loading: userLoading } = useSelector((state) => state.user);

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const translateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    dispatch(fetchChildren());
    dispatch(getSelf());
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

  const handlePress = (childId, childName, color) => {
    navigation.navigate("ChildChats", { id: childId, name: childName, color });
  };

  const handleSelfPress = () => {
    if (user) {
      navigation.navigate("MyChats", {
        name: user.name,
        color: "#66b3ff",
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Title for Children */}
        <Text style={styles.title}>Children</Text>
        <View style={styles.childrenList}>
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
          {!loading &&
            children.length > 0 &&
            children.map((child, index) => (
              <TouchableOpacity
                key={child._id}
                onPress={() =>
                  handlePress(child._id, child.name, getColorForIndex(index))
                }
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
                      <Text style={styles.childAge}>{child.age} years old</Text>
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
          {!loading && children.length === 0 && (
            <View style={styles.noChildrenContainer}>
              <LottieView
                source={NoChildrenAnimation}
                autoPlay
                loop
                style={styles.noChildrenLottie}
              />
              <Text style={styles.noChildrenText}>No children added yet.</Text>
            </View>
          )}
        </View>

        <Text style={styles.title}>My Chats</Text>
        {userLoading && (
          <View style={styles.loadingContainer}>
            <LottieView
              source={require("../../assets/loading.json")}
              autoPlay
              loop
              style={styles.loadingAnimation}
            />
          </View>
        )}
        {!userLoading && user && (
          <TouchableOpacity onPress={handleSelfPress} style={styles.selfCard}>
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
                  { backgroundColor: "#66b3ff" },
                ]}
              >
                <Text style={styles.avatarText}>{user?.name?.charAt(0)}</Text>
              </View>
              <View style={styles.rowView}>
                <View style={styles.selfInfo}>
                  <Text style={styles.selfName}>{user?.name}</Text>
                  <Text style={styles.childAge}>Take advice from our AI</Text>
                </View>
                <View style={styles.SelfarrowIcon}>
                  <MaterialIcons
                    name="arrow-forward-ios"
                    size={15}
                    color="#757575"
                  />
                </View>
              </View>
            </Animated.View>
          </TouchableOpacity>
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
  rowView: {
    display: "flex",
    flexDirection: "row",
    maxWidth: "80%",
  },
  arrowIcon: {
    paddingTop: 15,
  },
  SelfarrowIcon: {
    paddingTop: 15,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#E3F2FD",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
    textAlign: "start",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingAnimation: {
    width: 150,
    height: 150,
  },
  noChildrenContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    paddingVertical: 10,
  },
  noChildrenLottie: {
    width: 200,
    height: 200,
  },
  noChildrenText: {
    fontSize: 16,
    color: "#000",
    marginTop: 10,
    textAlign: "center",
  },
  childrenList: {
    marginBottom: 20,
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
  selfCard: {
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
  selfInfo: {
    flex: 1,
  },
  selfName: {
    fontSize: 18,
    color: "#333",
    fontWeight: "600",
  },
});

export default Adminchildren;
