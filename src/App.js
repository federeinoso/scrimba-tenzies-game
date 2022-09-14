import "./App.css";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import Die from "./Components/Die";
import Title from "./Components/Title";

function App() {
  const [dice, setDice] = useState(AllNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);

    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice]);

  function newGame() {
    setDice(AllNewDice());
    setTenzies(false);
    setCount(0);
  }

  function AllNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function generateNewDie() {
    return {
      value: Math.floor(Math.random() * (6 - 1 + 1) + 1),
      isHeld: false,
      id: nanoid(),
    };
  }

  function rollDice() {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.isHeld ? die : generateNewDie();
      })
    );
    setCount((prevCount) => prevCount + 1);
  }

  function holdDice(id) {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceElement = dice.map((die) => (
    <Die
      value={die.value}
      key={die.id}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  const btnTitle = count > 0 ? "Roll " + count : "Roll";

  return (
    <main>
      {tenzies && <Confetti />}
      <Title />
      <div className="grid-container">{diceElement}</div>
      <button onClick={tenzies ? newGame : rollDice}>
        {tenzies ? "New game" : btnTitle}
      </button>
      <div className="win-container">
        {tenzies && <h3>You won on {count} rolls</h3>}
      </div>
    </main>
  );
}

export default App;
