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
    setTimeleft,
    running,
    setRunning,
    stopTimer,
  } = useContext(GomokuContext);

  const handlePlayAgain = () => {
    stopTimer();
    setTimeleft(600);
    setRunning(false);
    playAgain();
  };

  const handleResetAgain = () => {
    stopTimer();
    setTimeleft(600);
    setRunning(false);
    resetGame();
  };

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
            handlePlayAgain={handlePlayAgain}
            handleResetAgain={handleResetAgain}
          />
        ) : (
          ""
        )}

        {gameWon && showGameOver ? (
          <GameOver
            GameOverText={randomText}
            playerOne={playerOne}
            playerTwo={playerTwo}
            handlePlayAgain={handlePlayAgain}
            firstIcon={firstIcon}
            handleResetAgain={handleResetAgain}
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
          handleResetAgain={handleResetAgain}
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
