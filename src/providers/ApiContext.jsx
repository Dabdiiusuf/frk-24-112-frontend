import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { ConfigContext } from "./ConfigContext";

const ApiContext = createContext(null);

const ApiContextProvider = ({ children }) => {
  const { API_BASE_URL } = useContext(ConfigContext);
  const [getID, setGetID] = useState(null);
  const [isDraw, setIsDraw] = useState(null);
  const [isNewGame, setIsNewGame] = useState(null);

  const fetchNewGame = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}games/add`);
      const data = await res.json();
      localStorage.setItem("newGame", data.id);
      console.log("New Game:", data);

      const localstorageItem = localStorage.getItem("newGame");
      const result = await fetch(`${API_BASE_URL}games/${localstorageItem}`);
      const IDdata = await result.json();
      setIsNewGame(IDdata);
      console.log("Second fetch:", IDdata);
    } catch (e) {
      console.error(e);
    }
    return;
  };

  // useEffect(() => {
  //   const fetchGamesID = async () => {
  //     try {
  //       const res = await fetch(`${API_BASE_URL}games`);
  //       const data = await res.json();
  //       setGetID(data);
  //       console.log("Games:", data);
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   };

  //   const fetchDrawGame = async () => {
  //     try {
  //       const res = await fetch(
  //         `${API_BASE_URL}game/88aaf28d-7fef-4028-9e94-7fdbbbd662a0`
  //       );
  //       const data = await res.json();
  //       setIsDraw(data.state);
  //       console.log("Draw game:", data);
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   };

  //   fetchGamesID();
  //   fetchDrawGame();
  //   // fetchNewGame();
  // }, [API_BASE_URL]);

  return (
    <ApiContext.Provider value={{ getID, isDraw, isNewGame, fetchNewGame }}>
      {children}
    </ApiContext.Provider>
  );
};

export { ApiContext, ApiContextProvider };
