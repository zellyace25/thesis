import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import BoxContainer from "../Components/BoxContainer";
import BlueContainer from "../Components/BlueContainer";
import axios from "axios";
import SelectionContainer from "../Components/SelectionContainer";
import CustomizeContainer from "../Components/CustomizeContainer";

export default function Dashboard() {
  const light = require("../../src/assets/light.png");
  const sched = require("../../src/assets/sched.png");
  const sound = require("../../src/assets/sound.png");
  const [freq, setFreq] = useState(false);
  const [schedule, setSched] = useState(false);
  const [lights, setLight] = useState(false);
  const [viewPests, setViewPests] = useState(false);
  const [viewLight, setViewLight] = useState(false);
  const [viewSched, setViewSched] = useState(false);
  const [selectedTarget, setSelectedTarget] = useState("MOSQUITO");
  const [selectedLight, setSelectedLight] = useState("");

  const data = {
    MOSQUITO: 10000, //30000
    COCKROACH: 15000, //40000
    RAT: 60000, //50000
  };

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
  
  // update frequency
  useEffect(() => {
    const activateFrequency = async () => {
      // Alert.alert(`${data[selectedTarget]}`);
      await axios.post(
        "https://kinetzki.pythonanywhere.com/frequency/update",
        {
          "frequency": `${data[selectedTarget]}`
        }
      );
    };

    const offFuck = async ()=> {
      await axios.post(
        "https://kinetzki.pythonanywhere.com/frequency/update",
        {
          "frequency": "0"
        }
      );
    }
    if (freq) {
      activateFrequency();
    } else {
      offFuck();
    }
  }, [freq, selectedTarget]);

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
              <Text style={styles.status}>{freq?"ACTIVE": "INACTIVE"}</Text>
              <Text style={styles.frequency}>{ freq? data[selectedTarget] / 1000 : "00"}</Text>
              <Text style={styles.unit}>KHZ</Text>
              <Image
                source={require("../../src/assets/wave.gif")}
                style={styles.gif}
              />
            </View>
          </ImageBackground>
        </View>
      </View>
      <View style={styles.featureContainer}>
        {/* options */}
        <View style={styles.optionsContainer}>
          <BoxContainer
            selected={schedule ? "AUTO" : "MANUAL"}
            category={"MODE"}
          />
          <BoxContainer
            selected={freq ? selectedTarget : "R/M/C"}
            category={"TARGET"}
          />
          <BoxContainer
            selected={lights ? selectedLight : "B/N/D"}
            category={"LIGHT"}
          />
        </View>

        <BlueContainer
          icon={sound}
          category={"Target Pest"}
          selected={freq? selectedTarget : "R/M/C"}
          setViewOptions={setViewPests}
          handleClick={setFreq}
        />
        <BlueContainer
          icon={light}
          category={"Light"}
          selected={lights ? selectedLight : "B/N/D"}
          setViewOptions={setViewLight}
          handleClick={setLight}
        />
        <BlueContainer
          icon={sched}
          category={"Schedule"}
          selected={"DAILY"}
          setViewOptions={setViewSched}
          handleClick={setSched}
        />

        {/* Selection Container */}
        {freq && viewPests && (
          <SelectionContainer
            title={"CHOOSE TARGET PEST"}
            option1={"RAT"}
            option2={"MOSQUITO"}
            option3={"COCKROACH"}
            setSelectedOption={(target) => {
              setSelectedTarget(target);
              setViewPests(false);
            }}
          />
        )}
        {lights && viewLight && (
          <SelectionContainer
            title={"CHOOSE LIGHT SETTING"}
            option1={"BRIGHT"}
            option2={"NORMAL"}
            setSelectedOption={(light) => {
              setSelectedLight(light);
              setViewLight(false);
            }}
            option3={"DIM"}
          />
        )}
        {sched && viewSched && (
          <CustomizeContainer setViewSched={setViewSched}
          />
        )}
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
    position: "absolute",
    zIndex: -1,
    height: 200,
    width: 230,
    bottom: 0,
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
    marginBottom: 5,
    width: "100%",
    height: 50,
  },
  featureContainer: {
    flex: 1,
    alignItems: "center",
    position: "relative",
    gap: 10,
    paddingBottom: 20,
  },
});
