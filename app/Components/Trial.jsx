import React, { useState, useRef } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Pressable,
  StyleSheet,
} from "react-native";

export default function SetTime({ title, selectTime }) {
  const [selectedHour, setSelectedHour] = useState(1);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [selectedPeriod, setSelectedPeriod] = useState("AM");
  const scrollRefHour = useRef(null);
  const scrollRefMinute = useRef(null);
  const scrollRefPeriod = useRef(null);

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
        <Text>
          {selectedHour} : {selectedMinute} {selectedPeriod}
        </Text>

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

// import React, { useState } from 'react';
// import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

// const SetTime = () => {
//   const [selectedHour, setSelectedHour] = useState(1);
//   const [selectedMinute, setSelectedMinute] = useState(0);
//   const [selectedPeriod, setSelectedPeriod] = useState('AM');

//   const hours = Array.from(Array(12).keys()).map(hour => {
//     const formattedHour = hour === 0 ? 12 : hour;
//     return (
//       <TouchableOpacity
//         key={formattedHour}
//         onPress={() => setSelectedHour(formattedHour)}
//         style={[
//           styles.timeItem,
//           selectedHour === formattedHour && styles.selectedTimeItem,
//         ]}
//       >
//         <Text style={styles.timeText}>{formattedHour}</Text>
//       </TouchableOpacity>
//     );
//   });

//   const minutes = Array.from(Array(60).keys()).map(minute => {
//     const formattedMinute = minute < 10 ? `0${minute}` : `${minute}`;
//     return (
//       <TouchableOpacity
//         key={formattedMinute}
//         onPress={() => setSelectedMinute(minute)}
//         style={[
//           styles.timeItem,
//           selectedMinute === minute && styles.selectedTimeItem,
//         ]}
//       >
//         <Text style={styles.timeText}>{formattedMinute}</Text>
//       </TouchableOpacity>
//     );
//   });

//   const periods = ['AM', 'PM'].map(period => (
//     <TouchableOpacity
//       key={period}
//       onPress={() => setSelectedPeriod(period)}
//       style={[
//         styles.timeItem,
//         selectedPeriod === period && styles.selectedTimeItem,
//       ]}
//     >
//       <Text style={styles.timeText}>{period}</Text>
//     </TouchableOpacity>
//   ));

//   return (
//     <View style={styles.container}>
//       <View style={styles.timeContainer}>
//         <ScrollView vertical showsVerticalScrollIndicator={false}>
//           {hours}
//         </ScrollView>
//         <Text style={styles.timeSeparator}>:</Text>
//         <ScrollView vertical showsVerticalScrollIndicator={false}>
//           {minutes}
//         </ScrollView>
//         <ScrollView vertical showsVerticalScrollIndicator={false}>
//           {periods}
//         </ScrollView>
//       </View>
//       <Text style={styles.selectedTime}>Selected Time: {selectedHour}:{selectedMinute < 10 ? `0${selectedMinute}` : selectedMinute} {selectedPeriod}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   timeContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 10,
//     height: 95
//   },
//   timeItem: {
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//   },
//   selectedTimeItem: {
//     backgroundColor: 'lightblue',
//     borderRadius: 5,
//   },
//   timeText: {
//     fontSize: 18,
//   },
//   timeSeparator: {
//     fontSize: 18,
//     paddingHorizontal: 5,
//   },
//   selectedTime: {
//     fontSize: 18,
//     marginTop: 20,
//   },
// });

// export default SetTime;


