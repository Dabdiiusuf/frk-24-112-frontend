import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { ConfigContext } from "./ConfigContext";
import { GomokuContext } from "./GomokuContext";

const ApiContext = createContext(null);

const ApiContextProvider = ({ children }) => {
  const { API_BASE_URL } = useContext(ConfigContext);
  const { rowValue, colValue } = useContext(GomokuContext);
  const [isNewGame, setIsNewGame] = useState(null);
  const [playerOne, setplayerOne] = useState("");
  const [playerTwo, setplayerTwo] = useState("");

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
    setplayerOne(p1.name);
    console.log("first player:", p1);

    const res2 = await fetch(`${API_BASE_URL}player/create`);
    const p2 = await res2.json();
    localStorage.setItem("secondPlayer", p2.id);
    setplayerTwo(p2.name);
    console.log("second player:", p2);
    return;
  };

  //d29b46e5-bfb9-4d66-b6a2-fabf2716bfea (hugethreesome)

  return (
    <ApiContext.Provider
      value={{
        isNewGame,
        fetchNewGame,
        createPlayers,
        playerOne,
        playerTwo,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export { ApiContext, ApiContextProvider };
