import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { Audio } from "expo-av"
import Header from './src/components/Header';
import Timer from './src/components/Timer';
import { clear } from 'i/lib/inflections';

const colors = ["#F7DC6F", "#A2D9CE", "#D7BDE2"];

export default function App() {
  const [isWorking, setIsWoking] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [currentTime, setCurrentTime] = useState("POMO" | "SHORT" | "BREAK");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      //Run Timer
      interval = setInterval(() => {
        setTime(time - 1);
      }, 1000);
    } else {
      //Clear Interval
      clearInterval(interval);
    }
    if (time === 0) {
      setIsActive(false);
      setIsWoking(prev => !prev);
      setTime(isWorking ? 300 : 1500);
    }

    return () => clearInterval(interval);
  }, [isActive, time])

  function handleStartStop() {
    playSound();
    setIsActive(!isActive);
  }

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/Click.wav")
    )
    await sound.playAsync();
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors[currentTime] }]}>
      <View style={styles.view}>
        <Text style={styles.text}>Pomodoro App</Text>
        <Header
          currenTime={currentTime}
          setCurrentTime={setCurrentTime}
          setTime={setTime}
        />
        <Timer time={time} />
        <TouchableOpacity onPress={handleStartStop} style={styles.button}>
          <Text style={styles.textStart}>{isActive ? "STOP" : "START"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  view: {
    flex: 1,
    paddingHorizontal: 15,
  },
  textStart: {
    color: "#fff",
    fontWeight: 'bold',
    fontSize: 30,
  },
  button: {
    backgroundColor: "#333333",
    padding: 15,
    marginTop: 15,
    borderRadius: 15,
    alignItems: "center"
  },

});
