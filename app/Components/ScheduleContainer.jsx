import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import CircleDays from "./CircleDays";
import DisplayTimeContainer from "./DisplayTimeContainer";
import SetTime from "./SetTime";
import CustomizeContainer from "./CustomizeContainer";

export default function ScheduleContainer({}) {
  const daysOfWeek = ["S", "M", "T", "W", "TH", "F", "S"];
  const [dayBtn, setDayBtn] = useState(false);
  const [startTime, setStartTime] = useState(false);
  const [endTime, setEndTime] = useState(false);
  const [back, setBack] = useState(false);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.titleStyle}>SET DAY AND TIME</Text>
        </View>
        <View style={styles.schedContainer}>
          <View style={styles.daysActive}>
            <Text>Days active</Text>
            <View style={styles.selectAllCon}>
              <Pressable style={styles.selectButton} />
              <Text>Select all</Text>
            </View>
          </View>
          <View style={styles.daysCon}>
            {daysOfWeek.map((days, i) => (
              <CircleDays key={i} day={days} setDayBtn={setDayBtn} />
            ))}
          </View>
          <Text>Time active</Text>
          <DisplayTimeContainer
            start="Start Time"
            time="00:00 AM"
            setTime={setStartTime}
          />
          <DisplayTimeContainer
            start="End Time"
            time="00:00 AM"
            setTime={setEndTime}
          />
          <View style={styles.actionContainer}>
            <Pressable style={styles.backBtn} onPress={() => setBack(!back)}>
              <Text style={styles.whiteFont}>Back</Text>
            </Pressable>
            <Pressable style={styles.nextBtn}>
              <Text style={styles.whiteFont}>Next</Text>
            </Pressable>
          </View>
        </View>
      </View>
      {startTime && (
        <SetTime title="SET START TIME" selectTime={setStartTime} />
      )}
      {endTime && <SetTime title="SET END TIME" selectTime={setEndTime} />}
      {back && <CustomizeContainer/>}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    backgroundColor: "white",
    alignItems: "center",
    position: "absolute",
    borderRadius: 20,
    zIndex: 1,
    gap: 20,
    paddingBottom: 30,
    top: 60,
    height: "100%",
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
  },
  titleStyle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  schedContainer: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 20,
  },
  daysActive: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  selectAllCon: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },

  selectButton: {
    width: 20,
    height: 20,
    borderRadius: 50,
    backgroundColor: "lightgray",
  },
  daysCon: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  actionContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 180,
    height: 50,
    backgroundColor: "orange",
    borderRadius: 50,
    marginVertical: 10,
  },
  nextBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 180,
    height: 50,
    backgroundColor: "blue",
    borderRadius: 50,
    marginVertical: 10,
  },
  whiteFont: {
    color: "white",
    fontWeight: "900",
    fontSize: 22,
  },
});
