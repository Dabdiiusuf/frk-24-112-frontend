import "./App.css";
import { useContext, useCallback } from "react";
import { ApiContext } from "./providers/ApiContext";
import { Board } from "frk-24-112-components";

export default function App() {
  const { game } = useContext(ApiContext);

  if (!game?.board) return <p>Is Loading</p>;

  const { rows, cols, tiles } = game.board;

  const handleCellClick = useCallback((row, col, value) => {
    console.log("Clicked:", { row, col, value });
    //will work with tiles logic here later this is just a start..
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
