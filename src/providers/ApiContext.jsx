import { createContext, useContext, useEffect, useState } from "react";
import { ConfigContext } from "./ConfigContext";

const ApiContext = createContext(null);

const ApiContextProvider = ({ children, value = {} }) => {
  const { API_BASE_URL } = useContext(ConfigContext);
  const [getID, setGetID] = useState("");

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
    fetchGamesID();
  }, [API_BASE_URL]);

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

export { ApiContext, ApiContextProvider };
