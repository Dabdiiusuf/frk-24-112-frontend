import { createContext, useContext, useEffect, useState } from "react";
import { ConfigContext } from "./ConfigContext";

const ApiContext = createContext(null);

const ApiContextProvider = ({ children }) => {
  const { API_BASE_URL } = useContext(ConfigContext);
  const [getID, setGetID] = useState(null);
  const [isDraw, setIsDraw] = useState(null);
  const [isNewGame, setIsNewGame] = useState(null);
  const [whiteWin, setWhiteWin] = useState(null);
  const [blackWin, setBlackWin] = useState(null);

  useEffect(() => {
    const fetchGamesID = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}games`);
        const data = await res.json();
        setGetID(data);
        console.log("Games:", data);
      } catch (e) {
        console.error(e);
      }
    };

    const fetchDrawGame = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}game/88aaf28d-7fef-4028-9e94-7fdbbbd662a0`
        );
        const data = await res.json();
        setIsDraw(data);
        console.log("Draw game:", data);
      } catch (e) {
        console.error(e);
      }
    };

    const fetchNewGame = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}game/015cdc04-4d22-46f7-8d8e-f1879bb9bf1b`
        );
        const data = await res.json();
        setIsNewGame(data);
        console.log("New Game:", data);
      } catch (e) {
        console.error(e);
      }
    };

    const fetchWhiteWin = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}game/6d3e9d43-9d19-4fb5-a684-b8514f0e4810`
        );
        const data = await res.json();
        setWhiteWin(data);
        console.log("White wins:", data);
      } catch (e) {
        console.error(e);
      }
    };

    const fetchBlackWin = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}game/ebdf150a-4740-42ea-a5a7-dfce2f6f3725`
        );
        const data = await res.json();
        setBlackWin(data);
        console.log("Black wins:", data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchGamesID();
    fetchDrawGame();
    fetchNewGame();
    fetchWhiteWin();
    fetchBlackWin();
  }, [API_BASE_URL]);

  return (
    <ApiContext.Provider
      value={{ getID, isDraw, isNewGame, whiteWin, blackWin }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export { ApiContext, ApiContextProvider };
