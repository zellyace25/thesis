import { View, Text, Pressable, Alert, StyleSheet, Image } from "react-native";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";

export default function SelectionContainer({
  title,
  option1,
  option2,
  option3,
}) {
  const handleExit = () => {
    router.replace("/Pages/Dashboard")
  }
  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.titleStyle}>{title}</Text>
          <Pressable onPress={handleExit} style={styles.exit}>
            <Image
              style={styles.exitIcon}
              source={require("../../src/assets/exit.png")}
            />
          </Pressable>
        </View>

        <View style={styles.selectionContainer}>
          <Pressable
            style={styles.selection}
            onPress={() => Alert.alert("Clicked", option1)}
          >
            <Text style={styles.selectionText}>{option1}</Text>
          </Pressable>
          <Pressable
            style={styles.selection}
            onPress={() => Alert.alert("Clicked", option2)}
          >
            <Text style={styles.selectionText}>{option2}</Text>
          </Pressable>
          <Pressable
            style={styles.selection}
            onPress={() => Alert.alert("Clicked", option3)}
          >
            <Text style={styles.selectionText}>{option3}</Text>
          </Pressable>
        </View>

        <Pressable style={styles.confirm}>
          <Text style={styles.confirmText}>Confirm</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: 400,
    backgroundColor: "#EAEDF2",
    alignItems: "center",
    position: "absolute",
    zIndex: 1,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#1740E6",
    padding: 10,
  },
  selectionContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
    width: "100%",
    gap: 10,
  },
  selection: {
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    height: 45,
    borderRadius: 15,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  selectionText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  confirm: {
    backgroundColor: "#FF9800",
    padding: 10,
    display: "flex",
    alignItems: "center",
    width: 200,
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
  confirmText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  exit: {
    height: 30,
    width: 30,
    alignItems: "center",
    position: "absolute",
    right: 20,
  },
  exitIcon: {
    height: "100%",
    width: "100%",
  },
  titleStyle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
});
