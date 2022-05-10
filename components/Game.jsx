import { StyleSheet, Text, View, Button } from "react-native";
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

    //Shuffle the numbers

    console.log("Numeros", numbers);
    /*JavaScript incluye una funcion llamada sort() que ordena arrays
    pero esta tambien puede ser configurada para ordenar de otra forma,
    en este caso se genera un numero aleatorio para cambiar el orden
    por medio de una funcion de callback*/
    setRandomNumbers(numbers.sort(() => 0.5 - Math.random()));//Le pasamos al setRandomNumbers el array de numeros ordenados aleatoriamente

    console.log("Shuffe numbers", numbers);

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

  
  //Function para reiniciar el juego
  const resetGame = () => {
    //Volvemos a generar los números aleatorios
    const numbers = Array.from({ length: randomNumbersCount }).map(
      () => 1 + Math.floor(10 * Math.random())
    );
    console.log("Numeros", numbers);

    //Volvemos a generar el target
    const target = numbers
      .slice(0, randomNumbersCount - 2)
      .reduce((acc, cur) => acc + cur, 0);

    //JavaScript incluye una funcion llamada sort() que ordena arrays
    //pero esta tambien puede ser configurada para ordenar de otra forma,
    //en este caso se genera un numero aleatorio para cambiar el orden
    //por medio de una funcion de callback
    setRandomNumbers(numbers.sort(() => 0.5 - Math.random()));//Le pasamos al setRandomNumbers el array de numeros ordenados aleatoriamente
   console.log("Shuffe numbers", numbers);
    setTarget(target);

    //Volvemos a inicializar los seleccionados
    setSelectedNumbers([]);
    //Volvemos a inicializar los segundos
    setRemainingSeconds(initialSeconds);
    //Volvemos a inicializar el estado del juego
    setGameSatus("PLAYING");
    //Volvemos a reiniciar el intervalo
    clearInterval(intervalId.current);

    intervalId.current = setInterval(
      () => setRemainingSeconds((seconds) => seconds - 1),
      1000
    );
  };
  return (
    <View>
      <Text style={styles.target}>{target}</Text>
      <Text style={[styles.target, styles[gameStatus]]}>{gameStatus}</Text>
      <Text>{remainingSeconds}</Text>
      <View display={gameStatus != "PLAYING" ? "flex" : "none"}>
        <Button title="Play Again" onPress={resetGame} />
      </View>
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
//Button that resets the game when lost or won

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
