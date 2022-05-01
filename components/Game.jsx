import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import Number from "./Number";

export default Game = ({ randomNumbersCount, initialSeconds }) => {
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [target, setTarget] = useState();
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds);
  const [gameStatus, setGameSatus] = useState("PLAYING");

  let intervalId = useRef();

  useEffect(() => console.log(selectedNumbers), [selectedNumbers]);

  useEffect(() => {
    const numbers = Array.from({ length: randomNumbersCount }).map(
      () => 1 + Math.floor(10 * Math.random())
    );
    const target = numbers
      .slice(0, randomNumbersCount - 2)
      .reduce((acc, cur) => acc + cur, 0);

    setRandomNumbers(numbers);
    setTarget(target);

    intervalId.current = setInterval(
      () => setRemainingSeconds((seconds) => seconds - 1),
      1000
    );
    return () => clearInterval(intervalId.current);
  }, []);

  useEffect(() => {
    setGameSatus(() => getGameStatus());
    if (remainingSeconds === 0 || gameStatus !== "PLAYING") {
      clearInterval(intervalId.current);
    }
  }, [remainingSeconds, selectedNumbers]);

  const isNumberSelected = (numberIndex) =>
    selectedNumbers.some((number) => number === numberIndex);
  const selectNumber = (number) => {
    setSelectedNumbers([...selectedNumbers, number]);
  };

  const getGameStatus = () => {
    const sumSelected = selectedNumbers.reduce(
      (acc, cur) => acc + randomNumbers[cur],
      0
    );
    if (remainingSeconds === 0 || sumSelected > target) {
      return "LOST";
    } else if (sumSelected === target) {
      return "WON";
    } else {
      return "PLAYING";
    }
  };

  return (
    <View>
      <Text style={styles.target}>{target}</Text>
      <Text style={[styles.target, styles[gameStatus]]}>{gameStatus}</Text>
      <Text>{remainingSeconds}</Text>
      <View style={styles.randomContainer}>
        {randomNumbers.map((number, index) => (
          <Number
            key={index}
            id={index}
            number={number}
            isSelected={isNumberSelected(index) || gameStatus !== "PLAYING"}
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
  PLAYING: {
    backgroundColor: "#bbb",
    color: "white",
  },
  LOST: {
    backgroundColor: "#EE251C",
    color: "white",
  },
  WON: {
    backgroundColor: "#33FF39",
    color: "white",
  },
});
