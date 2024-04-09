import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function BoxContainer({category, selected}) {
  return (
    <View style={styles.boxOption}>
      <Text style={styles.selected}>{selected}</Text>
      <Text style={styles.category}>{category}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  boxOption: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  selected: {
    fontWeight: "bold",
    fontSize: 22,
  },
  category: {
    fontSize: 20,
  },
});
