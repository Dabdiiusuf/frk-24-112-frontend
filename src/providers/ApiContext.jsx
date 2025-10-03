import { createContext, useContext, useState } from "react";
import { ConfigContext } from "./ConfigContext";
import { GomokuContext } from "./GomokuContext";

const ApiContext = createContext(null);

const ApiContextProvider = ({ children }) => {
  const { API_BASE_URL } = useContext(ConfigContext);

  const [isNewGame, setIsNewGame] = useState(null);
  const [playerOne, setplayerOne] = useState(localStorage.getItem("fPlayer"));
  const [playerTwo, setplayerTwo] = useState(localStorage.getItem("sPlayer"));
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [isGameDraw, setIsGameDraw] = useState(0);
  const [gameWon, setGameWon] = useState(null);

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
      setGameWon(updatedGame.winner.name);
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
  // const updatedGame = await res.json();
  // const value = await res.json();
  // setPlayerValue(value.player); // <---------------------------
  // console.log(playerValue);
  // console.log("col:", colValue);
  // console.log("row:", rowValue);
  // console.log("piece placed?", value);
  // };
  // playPiece();
  //d29b46e5-bfb9-4d66-b6a2-fabf2716bfea (hugethreesome)
  return (
    <ApiContext.Provider
      value={{
        playPiece,
        fetchNewGame,
        createPlayers,
        setCurrentPlayer,
        isGameDraw,
        gameWon,
        isNewGame,
        playerOne,
        playerTwo,
        currentPlayer,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export { ApiContext, ApiContextProvider };
