import { createContext } from "react";

const ConfigContext = createContext(null);

const ConfigContextProvider = ({ children, value = {} }) => {
  return (
    <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
  );
};

export { ConfigContext, ConfigContextProvider };
