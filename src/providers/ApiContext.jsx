import { createContext, use, useContext, useEffect, useState } from "react";
import { ConfigContext } from "./ConfigContext";

const ApiContext = createContext(null);

const ApiContextProvider = ({ children }) => {
  const { API_BASE_URL } = useContext(ConfigContext);
  const [getID, setGetID] = useState("");
  const [isDraw, setIsDraw] = useState("");

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
    fetchGamesID();
    fetchDrawGame();
  }, [API_BASE_URL]);

  return (
    <ApiContext.Provider value={{ getID }}>{children}</ApiContext.Provider>
  );
};

export { ApiContext, ApiContextProvider };
