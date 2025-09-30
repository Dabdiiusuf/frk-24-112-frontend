import { createContext, useState } from "react";

const GomokuContext = createContext(null);

const GomokuContextProvider = ({ children }) => {
  //   const [playerOne, setPlayerOne] = useState("");
  //   const [playerTwo, setPlayerTwo] = useState("");
  //   const [randomText, setRandomText] = useState("");

  return (
    <GomokuContext.Provider
      value={
        {
          // playerOne,
          // playerTwo,
          // randomText,
          // setPlayerOne,
          // setPlayerTwo,
          // setRandomText,
        }
      }
    >
      {children}
    </GomokuContext.Provider>
  );
};

export { GomokuContext, GomokuContextProvider };
