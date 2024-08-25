import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getSelf, updateUser } from "../store/user/userActions";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MaterialIcons } from "@expo/vector-icons";
import QRCode from "react-native-qrcode-svg";

const settingsData = [
  {
    id: "1",
    title: "Profile Settings",
    options: [
      { id: "1-1", name: "Change Password", navigateTo: "Password" },
      { id: "1-2", name: "Update Email", navigateTo: "updateEmail" },
    ],
  },
  {
    id: "2",
    title: "QR Code",
    options: [],
  },
];

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    bio: "",
    illness: "",
    work: "",
  });

  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    dispatch(getSelf());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        bio: user.bio || "",
        illness: user.illness || "",
        work: user.work || "",
      });
    }
  }, [user]);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = () => {
    dispatch(updateUser(formData));
  };

  const toggleExpand = (settingId) => {
    setExpandedId(expandedId === settingId ? null : settingId);
  };

  return (
    <LinearGradient
      colors={["#f3cfd6", "#90c2d8"]}
      style={styles.gradientContainer}
    >
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAwareScrollView
          style={styles.container}
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={styles.scrollContent}
          scrollEnabled={true}
        >
          <Animatable.View animation="fadeInUp" style={styles.header}>
            <Text style={styles.headerText}>Hello, {formData.name}</Text>
          </Animatable.View>
          <Animatable.View
            animation="fadeInUp"
            delay={300}
            style={styles.inputContainer}
          >
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={formData.name}
              onChangeText={(value) => handleInputChange("name", value)}
            />
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={formData.email}
              onChangeText={(value) => handleInputChange("email", value)}
              keyboardType="email-address"
            />
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              value={formData.phoneNumber}
              onChangeText={(value) => handleInputChange("phoneNumber", value)}
              keyboardType="phone-pad"
            />
            <Text style={styles.label}>Bio</Text>
            <TextInput
              style={styles.input}
              value={formData.bio}
              onChangeText={(value) => handleInputChange("bio", value)}
              multiline={true}
            />
            <Text style={styles.label}>Illness</Text>
            <TextInput
              style={styles.input}
              value={formData.illness}
              onChangeText={(value) => handleInputChange("illness", value)}
            />
            <Text style={styles.label}>Work</Text>
            <TextInput
              style={styles.input}
              value={formData.work}
              onChangeText={(value) => handleInputChange("work", value)}
            />
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>Save Profile</Text>
            </TouchableOpacity>
          </Animatable.View>

          {/* Dropdown Section */}
          {settingsData.map((item) => (
            <Animatable.View
              key={item.id}
              animation="fadeInUp"
              duration={800}
              style={styles.settingContainer}
            >
              <TouchableOpacity
                onPress={() => toggleExpand(item.id)}
                style={styles.settingHeader}
              >
                <Text style={styles.settingText}>{item.title}</Text>
                <MaterialIcons
                  name={expandedId === item.id ? "expand-less" : "expand-more"}
                  size={24}
                  color="#fff"
                />
              </TouchableOpacity>
              {expandedId === item.id && (
                <Animatable.View
                  animation="fadeInUp"
                  duration={800}
                  style={styles.optionsContainer}
                >
                  {item.options.length > 0 ? (
                    item.options.map((option) => (
                      <TouchableOpacity key={option.id} style={styles.option}>
                        <Text style={styles.optionText}>{option.name}</Text>
                      </TouchableOpacity>
                    ))
                  ) : (
                    <View style={styles.qrContainer}>
                      <QRCode
                        value={user._id || ""}
                        size={120}
                        color="#0c7076"
                        backgroundColor="transparent"
                      />
                      <Text style={styles.qrText}>ID: {user._id}</Text>
                    </View>
                  )}
                </Animatable.View>
              )}
            </Animatable.View>
          ))}
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    padding: 20,
    backgroundColor: "#00ACC1",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: "center",
  },
  headerText: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  inputContainer: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    color: "#00796B",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#B2EBF2",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#FFF",
  },
  button: {
    backgroundColor: "#00ACC1",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  settingContainer: {
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  settingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 18,
    backgroundColor: "#00ACC1",
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  settingText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  optionsContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomColor: "#00ACC1",
    borderBottomWidth: 1,
    borderRadius: 8,
    marginVertical: 5,
  },
  optionText: {
    fontSize: 16,
    color: "#000",
  },
  qrContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  qrText: {
    fontSize: 16,
    color: "#05161a",
    marginTop: 10,
  },
});

export default Profile;
