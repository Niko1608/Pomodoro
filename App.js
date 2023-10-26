import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import Header from './Header';

const colors = ["#F7DC6F", "#A2D9CE", "#D7BDE2"];


export default function App() {
  const [isWorking, setIsWoking] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [currentTime, setCurrentTime] = useState("POMO" | "SHORT" | "BREAK");

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors[currentTime] }]}>
      <Text style={styles.text}>Pomodoro App</Text>
      <Text style={styles.text}>{time}</Text>
      <Header
        currenTime={currentTime}
        setCurrentTime={setCurrentTime}
        setTime={setTime}
      />
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
  },
});
