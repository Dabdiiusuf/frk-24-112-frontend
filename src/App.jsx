import "./App.css";
import { useContext, useState, useEffect } from "react";
import { ApiContext } from "./providers/ApiContext";
import { GomokuContext } from "./providers/GomokuContext";
import {
  Board,
  GameBoard,
  Background,
  GameOver,
  Instructions,
  GCP,
} from "frk-24-112-components";

export default function App() {
  const {
    isNewGame,
    fetchNewGame,
    playerOne,
    playerTwo,
    createPlayers,
    playPiece,
    currentPlayer,
  } = useContext(ApiContext);

  const { randomText, DrawText, handleCellClick, message } =
    useContext(GomokuContext);
  const [showModal, setShowModal] = useState(false);

  // if (!isNewGame?.board) return <p>Is Loading</p>;

  // const { rows, cols, tiles } = isNewGame.board;

  const rows = isNewGame?.board?.rows ?? 16;
  const cols = isNewGame?.board?.cols ?? 16;
  const tiles = isNewGame?.board?.tiles ?? [];

  useEffect(() => {
    const hasSeen = localStorage.getItem("modalShown");
    if (!hasSeen) {
      setShowModal(true);
      localStorage.setItem("modalShown", "true");
    }
  }, []);

  return (
    <div>
      <Background>
        <GameBoard>
          <Board
            rows={rows}
            cols={cols}
            tiles={tiles}
            size={57}
            message={message}
            onCellClick={(row, col, value) => {
              handleCellClick(row, col, value);
              playPiece(row, col);
            }}
            currentPlayer={currentPlayer}
          />
        </GameBoard>

        {!isNewGame && showModal ? (
          <Instructions
            fetchNewGame={fetchNewGame}
            playerOne={playerOne}
            playerTwo={playerTwo}
            createPlayers={createPlayers}
          />
        ) : (
          ""
        )}
        <GCP
          playerOne={playerOne}
          playerTwo={playerTwo}
        />
        {/* {isDraw === "tie" ? (
          <GameOver GameOverText={DrawText} />
        ) : (
          <GameOver GameOverText={randomText} />
        )} */}
      </Background>
    </div>
  );
}
