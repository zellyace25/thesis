import { Text, StyleSheet, Pressable } from "react-native";
import React from "react";

export default function DisplayTimeContainer({ start, time, setTime }) {
  return (
    <Pressable style={styles.container} onPress={() => setTime((prev) => !prev)}>
      <Text>{start}</Text>
      <Text>{time}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EAEDF2",
    width: "100%",
    height: 50,
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 5,
  },
});
