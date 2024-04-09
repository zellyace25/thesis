import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function App() {
  const [text, setText] = useState("");
  const data = {
    "frequency": "0"
  }
  const turnOn = async () => {
    await axios.get("https://kinetzki.pythonanywhere.com/turn-on");
  };
  const turnOff = async () => {
    await axios.get("https://kinetzki.pythonanywhere.com/turn-off");
  };
  const updateFreq = async () => {
    await axios.post("https://kinetzki.pythonanywhere.com/frequency/update", data);
  };
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          setText("clicked");
          turnOn();
        }}
      >
          <Text>Turn On</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          setText("clicked");
          turnOff();
        }}
      >
          <Text>Turn Off</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          setText("clicked");
          updateFreq();
        }}
      >
          <Text>Update Frequency</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 50
  },
});
