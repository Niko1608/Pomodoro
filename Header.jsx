import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const options = ["Pomodoro", "Short Breack", "Long Break"];


export default function Header({ setTime, currentTime, setCurrentTime }) {

    function handlePress(index) {
        const newTime = index === 0 ? 25 : index === 1 ? 5 : 15;
        setCurrentTime(index);
        setTime(newTime * 60);
    }

    return (
        <View style={{ flexDirection: "row" }}>
            {options.map((item, index) =>
            (
                <TouchableOpacity
                    key={index}
                    style={[styles.itemStyle, currentTime !== index && { borderColor: "transparent" }]}
                    onPress={() => handlePress(index)}
                >
                    <Text>{item}</Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    itemStyle: {
        width: "33%",
        borderWidth: 3,
        padding: 5,
        borderColor: "white",
        marginVertical: 20,
        alignItems: "center,"
    },
});
