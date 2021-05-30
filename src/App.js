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

  function isValidMove(row, col) {
    return board[row][col].mark === '_';
  }

  const callBack = (row, col) => {
    // debugger;
    if (isValidMove(row, col)) {
      const copy = [...board];
      copy[row][col].mark = whichPlayerTurn();
      setBoard(copy);
      setPlayerTurn(playerTurn + 1);
    }
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
