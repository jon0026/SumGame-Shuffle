import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Number from "./Number";

export default Game = ({ randomNumbersCount }) => {
    const [randomNumbers, setRandomNumbers] = useState([]);
    const [target, setTarget] = useState(0);
    const [selectedNumbers, setSelectedNumbers] = useState([]);
   

    // const target  = 10 + Math.floor(40 * Math.random()); //10....50//
    // const numbers = Array.from({ length: randomNumbers }).map(() => 1 + Math.floor(10 * Math.random()));
    // const target = numbers.slice(0, randomNumbers - 2).reduce((acc, cur) => acc + cur, 0);

    //No Array → Exc all the time
    //Empty array → Exc once the first time
    //Full array → Exec on Change
    //Return → Exc on dismount
    useEffect(() => {
        const numbers = Array.from({ length: randomNumbersCount }).map(() => 1 + Math.floor(10 * Math.random()));
        const target = numbers.slice(0, randomNumbersCount - 2).reduce((acc, cur) => acc + cur, 0);

        setRandomNumbers(numbers);
        setTarget(target);
    }, []);

    const isNumberSelected = (numberIndex) =>
        selectedNumbers.some((number) => number === numberIndex);
    const selectNumber = (number) =>
        setSelectedNumbers([...selectedNumbers, number]);

    return (
        <View>
            <Text style={styles.target}>{target}</Text>
            <View style={styles.randomContainer}>
                {randomNumbers.map((number, index) => (
                    <Number
                        key={index}
                        id={index}
                        number={number}
                        isSelected={isNumberSelected(index)}
                        onSelected={selectNumber}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    target: {
        fontSize: 40,
        backgroundColor: "#aaa",
        textAlign: "center",
    },
    randomContainer: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
});
