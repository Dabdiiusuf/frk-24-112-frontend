import "./App.css";
import { useContext, useCallback } from "react";
import { ApiContext } from "./providers/ApiContext";
import { GomokuContext } from "./providers/GomokuContext";
import { Board, GameBoard, Background, GameOver } from "frk-24-112-components";

export default function App() {
  const { isNewGame, isDraw } = useContext(ApiContext);
  const { randomText, DrawText } = useContext(GomokuContext);

  const handleCellClick = useCallback((row, col, value) => {
    console.log("Clicked:", { row, col, value });
    //will work with icon placement logic here later this is just a start..
  }, []);

  if (!isNewGame?.board) return <p>Is Loading</p>;

  const { rows, cols, tiles } = isNewGame.board;

  return (
    <div>
      <Background>
        <GameBoard>
          <Board
            rows={rows}
            cols={cols}
            tiles={tiles}
            size={57}
            onCellClick={handleCellClick}
          />
        </GameBoard>
        {isDraw ? (
          <GameOver GameOverText={DrawText} />
        ) : (
          <GameOver GameOverText={randomText} />
        )}
      </Background>
    </div>
  );
}
