import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'

export default function Selection({option}) {
  return (
    <Pressable>
        <Text>{option}</Text>
    </Pressable>
  )
}
const styles = StyleSheet.create({
    buttonContainer: {
        height: 20,
        width: 100,
        borderRadius: 5,
        shadowColor: "grey",
    },
})