import { View, TextInput, StyleSheet, Image } from 'react-native'
import React from 'react'

export default function InputFieldPage({placeHolder, secureTextEntry, onChangeText, value }) {
    return (
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={placeHolder}
          style={styles.input}
          secureTextEntry={secureTextEntry}
          onChangeText={onChangeText}
          value={value}
          
        />
      </View>
    );
  }``
  
  const styles = StyleSheet.create({
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
    },
    input: {
      borderRadius: 8,
      paddingVertical: 5,
      paddingHorizontal: 10,
      backgroundColor: "white",
      width: "85%",
      borderRadius: 10,
      fontSize: 18,
    },
  });
  