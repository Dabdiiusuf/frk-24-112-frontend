import { createContext } from "react";

const ConfigContext = createContext(null);

const ConfigContextProvider = ({ children }) => {
  const API_BASE_URL = "http://localhost:3001/api/gomoku/";

  return (
    <ConfigContext.Provider
      value={{
        API_BASE_URL,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export { ConfigContext, ConfigContextProvider };
