import { Text, StyleSheet, Pressable, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'

export default function CircleDays({day, setDayBtn}) {
  const [btn, setBtn] = useState(false);
  useEffect(()=> {
    setDayBtn(btn);
  },[btn])

  return (
    <Pressable onPress={()=> setBtn(!btn)} style={[styles.circle, btn? styles.active:""]} >
      <Text>{day}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    circle: {
        height: 45,
        width: 45,
         borderRadius: 50,
         backgroundColor: "#EAEDF2",
         display: "flex",
         alignItems: "center",
         justifyContent: "center",
    },
    active: {
        backgroundColor: "orange"
    }
})