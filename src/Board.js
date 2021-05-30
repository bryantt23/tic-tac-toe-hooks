import React, { useState, useEffect } from 'react';
import Square from './Square';

function initializeBoard() {
  const n = 3;
  const boardState = [];
  for (let i = 0; i < n; i++) {
    let row = [];
    for (let j = 0; j < n; j++) {
      row.push({ row: i, col: j, move: null });
    }
    boardState.push(row);
  }
  return boardState;
}

function Board() {
  const [board, setBoard] = useState(null);
  useEffect(() => {
    const boardState = initializeBoard();
    setBoard(boardState);
  }, []);

  const callBack = (r, c) => {
    console.log(r, c);
  };

  return (
    <div>
      <p>{JSON.stringify(board)}</p>
      Board
      {board &&
        board.map((row, i) => {
          return (
            <p key={i}>
              {row.map(square => {
                return (
                  <Square
                    key={`${square.row}-${square.col}`}
                    callBack={callBack}
                    row={square.row}
                    col={square.col}
                  />
                );
              })}
            </p>
          );
        })}
    </div>
  );
}

export default Board;
