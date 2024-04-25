import { View, Text, StyleSheet, Image, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import InputField from "../Components/InputField";
import { router } from "expo-router";

export default function LoginPage() {
  const open = require("../../src/assets/view.png");
  const closed = require("../../src/assets/hide.png");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [viewPass, setViewPass] = useState(false);
  const adminName = "";
  const adminPass = "";
  const handleUsername = (user) => {
    setUserName(user);
  };

  const handlePassword = (pass) => {
    setPassword(pass);
  };
  const handleLogin = () => {
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (trimmedUsername === adminName && trimmedPassword === adminPass) {
      router.push("/Pages/Dashboard")
    } else {
      Alert.alert("Invalid credentials!")
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <View style={styles.header}>
          
          <Text style={styles.loginText}>Hello!</Text>
          <Text style={styles.loginAdmin}>Login to continue</Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputField}>
            <InputField
              placeHolder={"Username"}
              value={username}
              onChangeText={handleUsername}
              setViewPass={setViewPass}
              
            />
            <InputField
              placeHolder={"Password"}
              secureTextEntry={viewPass?false: true}
              value={password}
              onChangeText={handlePassword}
              setViewPass={setViewPass}
              open={open}
              closed={closed}
            />
            <Pressable style={styles.signinButton} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"#EAEDF2",
  },
  loginContainer: {
    height: 500,
    width: "100%",
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    fontSize: 25,
    fontWeight: "bold",
  },
  loginAdmin: {
    fontSize: 18,
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
  },
  inputField: {
    gap: 10,
  },
  signinButton: {
    backgroundColor: "#F2AC2D",
    padding: 10,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    fontWeight: "semibold",
    alignSelf: "center",
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",

  },
});