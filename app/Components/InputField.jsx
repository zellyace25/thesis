import { View, TextInput, StyleSheet, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";

export default function InputFieldPage({
  placeHolder,
  secureTextEntry,
  onChangeText,
  value,
  open,
  closed,
  setViewPass,
}) {
  const [eyePass, setEyePass] = useState(false);
  useEffect(() => {
    setViewPass(eyePass);
  }, [eyePass]);

  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder={placeHolder}
        style={styles.input}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        value={value}
      />
      <Pressable style={styles.eyeBtn} onPress={() => setEyePass(!eyePass)}>
        <Image source={eyePass ? closed : open} style={styles.eye} />
      </Pressable>
    </View>
  );
}
``;

const styles = StyleSheet.create({
  inputContainer: {
    width: 350,
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 8,
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  input: {
    width: "95%",
    borderRadius: 10,
    fontSize: 18,
  },
  eyeBtn: {
    height: 20,
    width: 20,
  },
  eye: {
    height: "100%",
    width: "100%",
    opacity: 0.5,
  },
});
