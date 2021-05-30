import React from 'react';

const n = 3;
const boardState = [];

function initializeBoard() {
  for (let i = 0; i < n; i++) {
    let row = [];
    for (let j = 0; j < n; j++) {
      row.push({ row: i, col: j, move: null });
    }
    boardState.push(row);
  }
}

function Board() {
  initializeBoard();
  return (
    <div>
      Board
      {boardState.map(row => {
        return (
          <p>
            {row.map(square => {
              return <span>{JSON.stringify(square)}</span>;
            })}
          </p>
        );
      })}
    </div>
  );
}

export default Board;
