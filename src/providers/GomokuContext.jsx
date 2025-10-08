import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
  useRef,
} from "react";
import { ApiContext } from "./ApiContext";

const GomokuContext = createContext(null);

const GomokuContextProvider = ({ children, gameWon, setShowGameOver }) => {
  const api = useContext(ApiContext);
  const winnerName =
    gameWon ?? api?.gameWon ?? localStorage.getItem("winner") ?? "";
  const [playerOne, setPlayerOne] = useState("");
  const [playerTwo, setPlayerTwo] = useState("");
  const [randomText, setRandomText] = useState("");
  const [colValue, setColValue] = useState(null);
  const [rowValue, setRowValue] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [warning, setWarning] = useState(false);
  const [running, setRunning] = useState(false);
  const [timeLeft, setTimeleft] = useState(5);
  const DrawText =
    "Arrr, the battle be fierce and the cannons run dry! Neither crew be claimin’ the seas this day, the game be a stalemate, matey!";
  const message = "placed";
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!winnerName) return;

    const RandomTextArray = [
      `Yo-ho-ho! The match be over, and ${winnerName} claims the treasure o’ triumph! The rest be feedin’ the fishes!`,
      `Shiver me timbers! The game’s end has come, and it be ${winnerName} who hoists the black flag o’ victory!`,
      `Arrr, the board be conquered! ${winnerName} rules these seas, leavin’ naught but wreckage in his wake!`,
      `Game over, ye scallywags! ${winnerName} be the last pirate standin’, with the crown o’ glory upon his head!`,
      `Blimey! The cannons be silenced and the battle be won. ${winnerName} sails away with victory’s bounty!`,
      `Arrr! The seas be still, the battle be done... Cap’n ${winnerName} stands victorious upon the bones of his foes!`,
    ];

    const textIndex = Math.floor(Math.random() * RandomTextArray.length);
    setRandomText(RandomTextArray[textIndex]);
  }, [winnerName]);

  const handleCellClick = useCallback((row, col, value) => {
    console.log("Clicked:", { row, col, value });
    setColValue(col);
    setRowValue(row);
  }, []);

  const openInstructions = () => {
    setShowInstructions(true);
  };
  const closeInstructions = () => {
    setShowInstructions(false);
  };

  useEffect(() => {
    const hasSeen = localStorage.getItem("modalShown");
    if (!hasSeen) {
      setShowModal(true);
      localStorage.setItem("modalShown", "true");
    }
  }, []);

  const resetWarning = () => {
    setWarning(true);
    setShowModal(true);
  };

  const startTimer = () => {
    if (running || timeLeft <= 0) return;

    setRunning(true);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setTimeleft((t) => {
        if (t <= 1) {
          setRunning(false);
          setShowGameOver(true);
          return 0;
        }
        console.log(showModal);
        return t - 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <GomokuContext.Provider
      value={{
        playerOne,
        playerTwo,
        randomText,
        DrawText,
        colValue,
        rowValue,
        message,
        showInstructions,
        showModal,
        warning,
        timeLeft,
        running,
        setPlayerOne,
        setPlayerTwo,
        setRandomText,
        handleCellClick,
        openInstructions,
        closeInstructions,
        setShowModal,
        setShowInstructions,
        resetWarning,
        startTimer,
        setTimeleft,
        setRunning,
        stopTimer,
      }}
    >
      {children}
    </GomokuContext.Provider>
  );
};

export { GomokuContext, GomokuContextProvider };
