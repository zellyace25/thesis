import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

export default function LoadingPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>Pestivice</Text>
      <Text style={styles.subName}>Pest Repellent Device</Text>
      <Image source={require("../../src/assets/DEVICEPIC.png")} style={styles.logo} />
    </View>

  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 26,
    fontWeight: "bold"
  },
  subName: {
    fontSize: 18,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    height: 200,
    width: 200,
  },
});
