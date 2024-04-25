import React, { useState, useRef } from "react";
import axios from "axios";
import { useEffect } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";

export default function SetTime({ title, selectTime }) {
  const [selectedHour, setSelectedHour] = useState(1);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [selectedPeriod, setSelectedPeriod] = useState("AM");
  const scrollRefHour = useRef(null);
  const scrollRefMinute = useRef(null);
  const scrollRefPeriod = useRef(null);

  const chosenTime = `${selectedHour}:${selectedMinute} ${selectedPeriod}`;

  // State to hold the current time
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update the current time every second
  useEffect(() => {
    const timerID = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(timerID);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  });

  const currentHours = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();
  const currentPeriod = currentHours >= 12 ? "PM" : "AM";

  useEffect(() => {
    const activateFrequency = async () => {
      // Alert.alert(`${data[selectedTarget]}`);
      await axios.post("https://kinetzki.pythonanywhere.com/frequency/update", {
        frequency: "10000",
      });
    };
    const offFuck = async () => {
      await axios.post("https://kinetzki.pythonanywhere.com/frequency/update", {
        frequency: "0",
      });
    };
    if (
      currentHours === selectedHour &&
      currentMinutes === selectedMinute &&
      currentPeriod === selectedPeriod
    ) {
      activateFrequency();
      Alert.alert("speaker is on");
    } else {
      offFuck();
    }
  }, [formattedTime]);

  const handleHourSelection = (hour) => {
    setSelectedHour(hour);
    scrollRefHour.current.scrollTo({ y: hour * 70 });
  };

  const handleMinuteSelection = (minute) => {
    setSelectedMinute(minute);
    scrollRefMinute.current.scrollTo({ y: minute * 70 });
  };

  const handlePeriodSelection = (period) => {
    setSelectedPeriod(period);
    scrollRefPeriod.current.scrollTo({ y: period === "AM" ? 0 : 70 });
  };

  const handleHourScroll = (event) => {
    const offsetY = Math.round(event.nativeEvent.contentOffset.y);
    let hour;
    if (offsetY === 0) {
      hour = 12; // Handle the case when offsetY is at the top
    } else {
      hour = Math.round(offsetY / 70); // Calculate selected hour based on scroll position
    }
    setSelectedHour(hour);
  };

  const handleMinuteScroll = (event) => {
    const offsetY = Math.round(event.nativeEvent.contentOffset.y);
    const minute = Math.round(offsetY / 70);
    setSelectedMinute(minute);
  };

  const handlePeriodScroll = (event) => {
    const offsetY = Math.round(event.nativeEvent.contentOffset.y);
    const period = offsetY === 0 ? "AM" : "PM";
    setSelectedPeriod(period);
  };

  const hours = Array.from(Array(12).keys()).map((hour) => {
    const formattedHour = hour === 0 ? 12 : hour;
    return (
      <TouchableOpacity
        key={formattedHour}
        onPress={() => handleHourSelection(formattedHour)}
        style={[
          styles.timeItem,
          selectedHour === formattedHour && styles.selectedTimeItem,
        ]}
      >
        <Text style={styles.timeText}>{formattedHour}</Text>
      </TouchableOpacity>
    );
  });

  const minutes = Array.from(Array(60).keys()).map((minute) => {
    const formattedMinute = minute < 10 ? `0${minute}` : `${minute}`;
    return (
      <TouchableOpacity
        key={formattedMinute}
        onPress={() => handleMinuteSelection(minute)}
        style={[
          styles.timeItem,
          selectedMinute === minute && styles.selectedTimeItem,
        ]}
      >
        <Text style={styles.timeText}>{formattedMinute}</Text>
      </TouchableOpacity>
    );
  });

  const periods = ["AM", "PM"].map((period) => (
    <TouchableOpacity
      key={period}
      onPress={() => handlePeriodSelection(period)}
      style={[
        styles.timeItem,
        selectedPeriod === period && styles.selectedTimeItem,
      ]}
    >
      <Text style={styles.timeText}>{period}</Text>
    </TouchableOpacity>
  ));

  // Pass selected time back to parent component
  const handleNext = () => {
    const selectedTime = `${selectedHour}:${selectedMinute} ${selectedPeriod}`;
    selectTime(selectedTime);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.titleStyle}>{title}</Text>
        </View>

        <View>
          <Text>{formattedTime}</Text>
        </View>

        {/* Setting time */}
        <View style={styles.setTimeStyle}>
          {/* hour */}
          <ScrollView
            ref={scrollRefHour}
            vertical
            showsVerticalScrollIndicator={false}
            style={styles.scrollTime}
            onScroll={handleHourScroll}
          >
            {hours}
          </ScrollView>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>:</Text>

          {/* minute */}
          <ScrollView
            ref={scrollRefMinute}
            vertical
            showsVerticalScrollIndicator={false}
            style={styles.scrollTime}
            onScroll={handleMinuteScroll}
          >
            {minutes}
          </ScrollView>

          {/* period */}
          <ScrollView
            ref={scrollRefPeriod}
            vertical
            showsVerticalScrollIndicator={false}
            style={styles.scrollTime}
            onScroll={handlePeriodScroll}
          >
            {periods}
          </ScrollView>
        </View>
        <Text>{chosenTime}</Text>

        <View style={styles.actionContainer}>
          <Pressable style={styles.backBtn} onPress={() => selectTime(false)}>
            <Text style={styles.whiteFont}>Back</Text>
          </Pressable>
          <Pressable style={styles.nextBtn} onPress={handleNext}>
            <Text style={styles.whiteFont}>Next</Text>
          </Pressable>
        </View>
      </View>
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
  },
  titleStyle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  setTimeStyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    height: 200,
    overflow: "hidden",
    // backgroundColor: "red",
    gap: 5,
  },
  timeItem: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    display: "flex",
    justifyContent: "center",
    width: 100,
    alignSelf: "center",
    height: 70,
  },
  timeText: {
    fontSize: 30,
    textAlign: "center",
  },
  scrollTime: {
    display: "flex",
    height: 70,
    paddingHorizontal: 5,
    overflow: "visible",
    gap: 5,
    width: 20,
    backgroundColor: "#EAEDF2",
    borderRadius: 10,
  },
  actionContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
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
