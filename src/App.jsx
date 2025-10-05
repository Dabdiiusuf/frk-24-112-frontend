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
    isGameDraw,
    gameWon,
    fetchNewGame,
    playerOne,
    playerTwo,
    createPlayers,
    playPiece,
    currentPlayer,
    playAgain,
    showGameOver,
    setShowGameOver,
    error,
    firstPoints,
    secondPoints,
    firstIcon,
  } = useContext(ApiContext);

  const {
    randomText,
    DrawText,
    handleCellClick,
    message,
    openInstructions,
    showInstructions,
    showModal,
    closeInstructions,
  } = useContext(GomokuContext);

  // if (!isNewGame?.board) return <p>Is Loading</p>;

  // const { rows, cols, tiles } = isNewGame.board;

  const rows = isNewGame?.board?.rows ?? 16;
  const cols = isNewGame?.board?.cols ?? 16;
  const tiles = isNewGame?.board?.tiles ?? [];

  return (
    <div>
      <Background openInstructions={openInstructions}>
        <GameBoard>
          <Board
            rows={rows}
            cols={cols}
            tiles={tiles}
            size={57}
            message={message}
            onCellClick={(col, row, value) => {
              handleCellClick(col, row, value);
              playPiece(col + 1, row + 1);
            }}
            currentPlayer={currentPlayer}
          />
        </GameBoard>

        {showInstructions ? (
          <Instructions
            closeInstructions={closeInstructions}
            playerOne={playerOne}
            playerTwo={playerTwo}
          />
        ) : (
          ""
        )}

        {!isNewGame && showModal ? (
          <Instructions
            fetchNewGame={fetchNewGame}
            playerOne={playerOne}
            playerTwo={playerTwo}
            createPlayers={createPlayers}
            error={error}
          />
        ) : (
          ""
        )}
        {isGameDraw === 256 ? <GameOver GameOverText={DrawText} /> : ""}
        {gameWon && showGameOver ? (
          <GameOver
            GameOverText={randomText}
            playerOne={playerOne}
            playerTwo={playerTwo}
            playAgain={playAgain}
            firstIcon={firstIcon}
          />
        ) : (
          ""
        )}
        <GCP
          playerOne={playerOne}
          playerTwo={playerTwo}
          firstPoints={firstPoints}
          secondPoints={secondPoints}
          currentPlayer={currentPlayer}
        />
      </Background>
    </div>
  );
}
