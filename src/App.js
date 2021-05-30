import Board from './Board';
import React, { useState, useEffect } from 'react';

function initializeBoard() {
  const n = 3;
  const boardState = [];
  for (let i = 0; i < n; i++) {
    let row = [];
    for (let j = 0; j < n; j++) {
      row.push({ row: i, col: j, mark: '_' });
    }
    boardState.push(row);
  }
  return boardState;
}

function App() {
  const [playerTurn, setPlayerTurn] = useState(0);
  const [gameHasWinner, setGameHasWinner] = useState(false);
  const [board, setBoard] = useState(null);
  useEffect(() => {
    const boardState = initializeBoard();
    setBoard(boardState);
  }, []);
  const callBack = (...arg) => {
    console.log(arg);
  };

  function whichPlayerTurn() {
    return playerTurn % 2 == 0 ? 'X' : 'O';
  }

  return (
    <div>
      {`It is ${whichPlayerTurn()}'s turn`}
      <Board board={board} callBack={callBack} />
    </div>
  );
}

export default App;
