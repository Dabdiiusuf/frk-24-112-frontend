import { createContext } from "react";

const ApiContext = createContext(null);

const ApiContextProvider = ({ children, value = {} }) => {
  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

export { ApiContext, ApiContextProvider };
