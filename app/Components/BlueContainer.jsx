import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";

export default function BlueContainer({
  icon,
  category,
  selected,
  handleClick,
  setViewOptions,
}) {
  const [click, setClick] = useState(false);
  return (
    <Pressable
      style={styles.container}
      onPress={() => setViewOptions((prev) => !prev)}
    >
      <Image source={icon} style={{ height: 40, width: 40 }} />
      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          width: 300,
        }}
      >
        <View style={styles.boxCategory}>
          <Text style={styles.category}>{category}</Text>
          <Text style={styles.selected}>{selected}</Text>
        </View>

        <Pressable
          style={styles.buttonContainer}
          onPress={() => {
            setViewOptions((prev) => !prev);
          }}
        >
          <Pressable style={[styles.bgButton, click ? styles.on : styles.off]} onPress={() => {
                setClick((prev) => !prev);
                handleClick((prev) => !prev);
              }}>
            <Pressable
              style={styles.button}
              onPress={() => {
                setClick((prev) => !prev);
                handleClick((prev) => !prev);
              }}
            />
          </Pressable>
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    paddingVertical: 2,
    backgroundColor: "#1740E6",
    borderRadius: 30,
    height: 80,
    width: 400,
    gap: 10,
  },
  boxCategory: {
    justifyContent: "center",
  },
  category: {
    fontSize: 15,
    color: "white",
  },
  selected: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
  },
  buttonContainer: {
    display: "flex",
    backgroundColor: "#A1A0A0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    width: 65,
    height: 35,
    gap: 2,
    overflow: "hidden",
  },
  bgButton: {
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    borderRadius: 20,
    paddingHorizontal: 1,
  },
  on: {
    backgroundColor: "#00D42F",
    transform: [{ translateX: 0 }],
    height: "100%",
    width: "100%",
  },
  off: {
    backgroundColor: "#A1A0A0",
    transform: [{ translateX: -30 }],
  },
  button: {
    height: 25,
    width: 25,
    borderRadius: 20,
    backgroundColor: "#D9D9D9",
    marginHorizontal: 5,
  },
});
