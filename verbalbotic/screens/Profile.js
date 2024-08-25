import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getSelf, updateUser } from "../store/user/userActions";
import * as Animatable from "react-native-animatable";

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

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
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
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#E0F7FA",
  },
});

export default Profile;
