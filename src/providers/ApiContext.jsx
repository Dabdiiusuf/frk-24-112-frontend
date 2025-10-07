import { createContext, useContext, useState, useEffect } from "react";
import { ConfigContext } from "./ConfigContext";
import { GomokuContextProvider, GomokuContext } from "./GomokuContext";

const ApiContext = createContext(null);

const ApiContextProvider = ({ children }) => {
  const { API_BASE_URL } = useContext(ConfigContext);

  const { setShowInstructions, setTimeleft } = useContext(GomokuContext);
  const [isNewGame, setIsNewGame] = useState(null);
  const [showGameOver, setShowGameOver] = useState(false);
  const [playerOne, setplayerOne] = useState(localStorage.getItem("fPlayer"));
  const [playerTwo, setplayerTwo] = useState(localStorage.getItem("sPlayer"));
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [isGameDraw, setIsGameDraw] = useState(0);
  const [gameWon, setGameWon] = useState(null);
  const [error, setError] = useState("");
  const [firstPoints, setFirstPoints] = useState(0);
  const [secondPoints, setSecondPoints] = useState(0);
  const [firstIcon, setFirstIcon] = useState(false);

  const fetchNewGame = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}games/add`);
      const data = await res.json();
      localStorage.setItem("newGame", data.id);
      console.log("New Game:", data);
    } catch (e) {
      console.error(e);
    }

    const game = localStorage.getItem("newGame");
    const firstPlayer = localStorage.getItem("firstPlayer");
    const secondPlayer = localStorage.getItem("secondPlayer");
    if (!secondPlayer || !firstPlayer) {
      setError("Please generate a name");
      return;
    }
    try {
      const result = await fetch(
        `${API_BASE_URL}player/join/${game}/${firstPlayer}`
      );
      const data = await result.json();
      console.log("first game set:", data);
    } catch (e) {
      console.error(e);
    }
    try {
      const result = await fetch(
        `${API_BASE_URL}player/join/${game}/${secondPlayer}`
      );
      const data = await result.json();
      setIsNewGame(data);
      console.log("second game set:", data);
    } catch (e) {
      console.error(e);
    }
    return;
  };

  const createPlayers = async () => {
    const res1 = await fetch(`${API_BASE_URL}player/create`);
    const p1 = await res1.json();
    localStorage.setItem("firstPlayer", p1.id);
    localStorage.setItem("fPlayer", p1.name);
    setplayerOne(p1.name);
    console.log("first player:", p1);

    const res2 = await fetch(`${API_BASE_URL}player/create`);
    const p2 = await res2.json();
    localStorage.setItem("secondPlayer", p2.id);
    localStorage.setItem("sPlayer", p2.name);
    setplayerTwo(p2.name);
    console.log("second player:", p2);

    setError("");
    return;
  };

  const playPiece = async (col, row) => {
    const game = localStorage.getItem("newGame");
    const firstPlayer = localStorage.getItem("firstPlayer");
    const secondPlayer = localStorage.getItem("secondPlayer");

    console.log("this is player1 UUID ", firstPlayer);

    const playerId = currentPlayer === 1 ? firstPlayer : secondPlayer;

    const res = await fetch(
      `${API_BASE_URL}player/play/${game}/${playerId}/${col}/${row}`
    );
    if (res.status === 409) {
      console.log("error", res.status);
      return;
    }

    const updatedGame = await res.json();
    setIsNewGame(updatedGame);
    setIsGameDraw(updatedGame.round);
    if (updatedGame.state === "won") {
      localStorage.setItem("winner", updatedGame.winner.name);
      setGameWon(updatedGame.winner.name);
      setShowGameOver(true);
    }
    if (updatedGame.winnerNumber === 1) {
      setFirstPoints((count) => count + 1);
      setFirstIcon(true);
    } else if (updatedGame.winnerNumber === 2) {
      setSecondPoints((count) => count + 1);
    }
    setCurrentPlayer((prev) => {
      if (typeof updatedGame.nextPlayer === "number") {
        return updatedGame.nextPlayer;
      }
      if (typeof updatedGame.player === "number") {
        return updatedGame.player === 1 ? 2 : 1;
      }
      console.log("Game Information:", updatedGame);

      return prev === 1 ? 2 : 1;
    });
  };

  const playAgain = async () => {
    try {
      localStorage.removeItem("newGame");
      setIsNewGame(null);
      setGameWon(null);
      setIsGameDraw(0);
      setCurrentPlayer(1);
      setFirstIcon(false);
      // setTimeleft(5);

      await fetchNewGame();
      setShowGameOver(false);
      console.log(showGameOver);
    } catch (e) {
      console.error(e);
    }
  };

  const resetGame = () => {
    localStorage.clear();

    setIsNewGame(null);
    setGameWon(null);
    setIsGameDraw(0);
    setCurrentPlayer(1);
    setFirstIcon(false);
    setShowGameOver(false);
    setFirstPoints(0);
    setSecondPoints(0);
    setplayerTwo(localStorage.getItem("sPlayer"));
    setplayerOne(localStorage.getItem("fPlayer"));

    setShowInstructions(true);
  };

  return (
    <ApiContext.Provider
      value={{
        playPiece,
        resetGame,
        fetchNewGame,
        createPlayers,
        setCurrentPlayer,
        setShowGameOver,
        playAgain,
        isGameDraw,
        gameWon,
        isNewGame,
        playerOne,
        playerTwo,
        currentPlayer,
        showGameOver,
        error,
        firstPoints,
        secondPoints,
        firstIcon,
      }}
    >
      <GomokuContextProvider
        gameWon={gameWon}
        setShowGameOver={setShowGameOver}
      >
        {children}
      </GomokuContextProvider>
    </ApiContext.Provider>
  );
};

export { ApiContext, ApiContextProvider };
