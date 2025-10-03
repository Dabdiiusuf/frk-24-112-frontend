import { createContext, useState, useEffect, useCallback } from "react";

const GomokuContext = createContext(null);

const GomokuContextProvider = ({ children }) => {
  const [playerOne, setPlayerOne] = useState("");
  const [playerTwo, setPlayerTwo] = useState("");
  const [randomText, setRandomText] = useState("");
  const [colValue, setColValue] = useState(null);
  const [rowValue, setRowValue] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const DrawText =
    "Arrr, the battle be fierce and the cannons run dry! Neither crew be claimin’ the seas this day, the game be a stalemate, matey!";

  const message = "placed";

  useEffect(() => {
    const RandomTextArray = [
      "Yo-ho-ho! The match be over, and  claims the treasure o’ triumph! The rest be feedin’ the fishes!",
      "Shiver me timbers! The game’s end has come, and it be Daniel who hoists the black flag o’ victory!",
      "Arrr, the board be conquered! Daniel rules these seas, leavin’ naught but wreckage in his wake!",
      "Game over, ye scallywags! Daniel be the last pirate standin’, with the crown o’ glory upon his head!",
      "Blimey! The cannons be silenced and the battle be won. Daniel sails away with victory’s bounty!",
      "Arrr! The seas be still, the battle be done... Cap’n Daniel stands victorious upon the bones of his foes!",
    ];
    const textIndex = Math.floor(Math.random() * RandomTextArray.length);
    setRandomText(RandomTextArray[textIndex]);
  }, []);

  const handleCellClick = useCallback((row, col, value) => {
    console.log("Clicked:", { row, col, value });
    setColValue(col);
    setRowValue(row);
  }, []);

  const openInstructions = () => {
    setShowInstructions(true);
    // localStorage.removeItem("modalShown");
    // setShowModal(false);
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
        setPlayerOne,
        setPlayerTwo,
        setRandomText,
        handleCellClick,
        openInstructions,
        closeInstructions,
        setShowModal,
      }}
    >
      {children}
    </GomokuContext.Provider>
  );
};

export { GomokuContext, GomokuContextProvider };
