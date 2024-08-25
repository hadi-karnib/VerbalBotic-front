import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { getSelf } from "../store/user/userActions";
import { useDispatch } from "react-redux";
const Profile = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSelf());
  }, [dispatch]);
  return (
    <View>
      <Text>Profile</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Profile;
