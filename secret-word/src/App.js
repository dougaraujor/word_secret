// Css
import "./App.css";

// React
import { useCallBack, useEffect, useState } from "react";

// Componentes
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

// Data
import { wordsList } from "./data/words";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);
  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedtCategory] = useState("");
  const [letter, setLetters] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuessed] = useState(3);
  const [score, setScore] = useState(0);

  const pickWordAndCategory = () => {
    // Escolher categoria aleatoriamente
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

    // Escolher palavra aleatoria
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];

    return { word, category };
  };

  // Começa o jogo
  const startGame = () => {
    // Escolher palavra e categoria.
    const { word, category } = pickWordAndCategory();

    // Criar Array de letras
    let wordLetters = word.split("");
    wordLetters = wordLetters.map((l) => l.toLowerCase());
    console.log(word, category);
    console.log(wordLetters);

    // Settar os states
    setPickedWord(word);
    setPickedtCategory(category);
    setLetters(wordLetters);
    setGameStage(stages[1].name);
  };

  // Processar o input de letras
  const verifyLetter = (l) => {
    console.log(l);
  };

  // Restart jogo
  const retry = () => {
    setGameStage(stages[0].name);
  };
  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && (
        <Game
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letter={letter}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === "end" && <GameOver retry={retry} />}
    </div>
  );
}

export default App;
