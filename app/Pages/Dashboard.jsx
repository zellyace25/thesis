import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import BoxContainer from "../Components/BoxContainer";
import BlueContainer from "../Components/BlueContainer";
import axios from "axios";
import SelectionContainer from "../Components/SelectionContainer";

export default function Dashboard() {
  const light = require("../../src/assets/light.png");
  const sched = require("../../src/assets/sched.png");
  const sound = require("../../src/assets/sound.png");
  const [freq, setFreq] = useState(false);
  const [schedule, setSched] = useState(false);
  const [lights, setLight] = useState(false);
  const [viewPests, setViewPests] = useState(false);
  const [viewLight, setViewLight] = useState(false);
  const [viewSched, setViewSChed] = useState(false);

  useEffect(() => {
    const activateLight = async () => {
      if (lights) {
        await axios.get("https://kinetzki.pythonanywhere.com/turn-on");
      } else {
        await axios.get("https://kinetzki.pythonanywhere.com/turn-off");
      }
    };
    activateLight();
  }, [lights]);

  return (
    <View style={styles.container}>
      <View style={styles.monitorContainer}>
        {/* title */}
        <View style={styles.titleContainer}>
          <Text style={styles.name}>Pestivice</Text>
          <Text style={styles.subName}>Pest Repellent Device</Text>
        </View>
        {/* circle */}
        <View style={styles.freqContainer}>
          <ImageBackground
            source={require("../../src/assets/CIRCLE.png")}
            style={styles.freqCircle}
          >
            <View style={styles.valueContainer}>
              <Text style={styles.status}>ACTIVE</Text>
              <Text style={styles.frequency}>00</Text>
              <Text style={styles.unit}>KHZ</Text>
              <Image source={require("../../src/assets/wave.gif")} style={styles.gif}/>
            </View>
          </ImageBackground>
        </View>
      </View>
      <View style={styles.featureContainer}>

      {/* Selection Container */}
      {(freq && viewPests) && <SelectionContainer title={"CHOOSE TARGET PEST"} option1={"RAT"} option2={"MOSQUITO"} option3={"COCKROACH"}/>}
      {(lights && viewLight) && <SelectionContainer title={"CHOOSE LIGHT SETTING"} option1={"BRIGHT"} option2={"NORMAL"} option3={"DIM"}/>}


        {/* options */}
        <View style={styles.optionsContainer}>
          <BoxContainer selected={schedule? "AUTO": "MANUAL"} category={"MODE"} />
          <BoxContainer selected={""} category={"TARGET"} />
          <BoxContainer selected={""} category={"LIGHT"} />
        </View>
        <BlueContainer
          icon={light}
          category={"Light"}
          selected={"NORMAL"}
          setViewOptions={setViewLight}
          handleClick={setLight}
        />
        <BlueContainer
          icon={sound}
          category={"Target Pest"}
          selected={"MOSQUITO"}
          setViewOptions={setViewPests}
          handleClick={setFreq}
        />
        <BlueContainer
          icon={sched}
          category={"Schedule"}
          selected={"DAILY"}
          setViewOptions={setViewSChed}
          handleClick={setSched}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    width: "100%",
    backgroundColor: "#EAEDF2",
  },
  name: {
    fontSize: 40,
    fontFamily: "Montserrat",
    fontWeight: "bold",
    textAlign: "center",
  },
  subName: {
    fontSize: 18,
    textAlign: "center",
  },
  monitorContainer: {
    flex: 1,
    alignItems: "center",
    padding: 5,
    width: "100%",
  },
  titleContainer: {
    paddingVertical: 20,
  },
  freqContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  freqCircle: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 300,
    width: 300,
  },
  valueContainer: {
    display: "flex",
    gap: 2,
    justifyContent: "center",
    width: 230,
    height: 230,
    borderRadius: 230,
    position: "relative",
    overflow: "hidden",
    alignItems: "center",
  },
  gif: {
    position:"absolute",
    zIndex: -1,
    height: 200,
    width: 230,
    bottom:0,
  },
  status: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
  },
  frequency: {
    color: "white",
    textAlign: "center",
    fontSize: 80,
    fontWeight: "bold",
  },
  unit: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  optionsContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  featureContainer: {
    flex: 1,
    alignItems: "center",
    gap: 10,
    position: "relative",
  },
});
