import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import React, { useState } from "react";
import ScheduleContainer from "./ScheduleContainer";

export default function CustomizeContainer({ setViewSched }) {
  const [addNew, setAddNew] = useState(false)
  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.titleStyle}>CUSTOMIZE MODE</Text>
          <Pressable style={styles.exitBtn} onPress={() => setViewSched(false)}>
            <Image
              source={require("../../src/assets/exit.png")}
              style={{ height: 35, width: 35 }}
            />
          </Pressable>
        </View>
        {/* customized sched */}
        <View style={styles.addedCustom}>
        </View>


        <View style={styles.actionContainer}>
          <Pressable style={styles.backBtn}>
            <Text style={styles.whiteFont} onPress={() => setAddNew(!addNew)}>Add New</Text>
          </Pressable>
          <Pressable style={styles.nextBtn}>
            <Text style={styles.whiteFont}>Delete</Text>
          </Pressable>
        </View>
      </View>
      {addNew && <ScheduleContainer/> }

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    alignItems: "center",
    position: "absolute",
    borderRadius: 20,
    zIndex: 1,
    gap: 10,
    paddingBottom: 30,
    top: 60,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 70,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#1740E6",
    padding: 10,
    position: "relative",
  },
  titleStyle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  exitBtn: {
    position: "absolute",
    right: 20,
  },
  addedCustom: {
    display: "flex",
    width: "100%",
    height: 220,
    backgroundColor: "yellowgreen",
  },
  actionContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  backBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 180,
    height: 50,
    backgroundColor: "blue",
    borderRadius: 50,
    marginVertical: 10,
  },
  nextBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 180,
    height: 50,
    backgroundColor: "#BD0000",
    borderRadius: 50,
    marginVertical: 10,
  },
  whiteFont: {
    color: "white",
    fontWeight: "900",
    fontSize: 22,
  },
});
