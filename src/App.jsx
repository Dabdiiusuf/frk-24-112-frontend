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
} from "@dabdikeef/components";

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
    error,
    firstPoints,
    secondPoints,
    firstIcon,
    resetGame,
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
    resetWarning,
    warning,
    startTimer,
    timeLeft,
    running,
  } = useContext(GomokuContext);

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
            warning={warning}
          />
        ) : (
          ""
        )}

        {isGameDraw === 256 || timeLeft === 0 ? (
          <GameOver
            GameOverText={DrawText}
            playAgain={playAgain}
            resetGame={resetGame}
          />
        ) : (
          ""
        )}

        {gameWon && showGameOver ? (
          <GameOver
            GameOverText={randomText}
            playerOne={playerOne}
            playerTwo={playerTwo}
            playAgain={playAgain}
            firstIcon={firstIcon}
            resetGame={resetGame}
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
          resetGame={resetGame}
          resetWarning={resetWarning}
          warning={warning}
          startTimer={startTimer}
          running={running}
          timeLeft={timeLeft}
        />
      </Background>
    </div>
  );
}
