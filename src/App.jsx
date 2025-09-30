import "./App.css";
import { useContext, useCallback } from "react";
import { ApiContext } from "./providers/ApiContext";
import { Board } from "frk-24-112-components";

export default function App() {
  const { isNewGame } = useContext(ApiContext);

  if (!isNewGame?.board) return <p>Is Loading</p>;

  const { rows, cols, tiles } = isNewGame.board;

  const handleCellClick = useCallback((row, col, value) => {
    console.log("Clicked:", { row, col, value });
    //will work with icon placement logic here later this is just a start..
  }, []);

  return (
    <Board
      rows={rows}
      cols={cols}
      tiles={tiles}
      size={61}
      onCellClick={handleCellClick}
    />
  );
}
