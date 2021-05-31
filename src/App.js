import Board from './Board';
import React, { useState, useEffect } from 'react';
import GameManager from './GameManager';

const gameManager = new GameManager();

function App() {
  const [board, setBoard] = useState(gameManager.initializeBoard());
  const [message, setMessage] = useState(
    `It is ${gameManager.whichPlayerTurn()}'s turn`
  );
  const [boardHistory, setBoardHistory] = useState([]);

  function changeBoardState(index) {
    const boardAtIndex = JSON.parse(JSON.stringify(boardHistory[index]));
    setBoard(boardAtIndex);
    gameManager.setPlayerTurn(index);
    gameManager.nextPlayerTurn(boardAtIndex, setMessage);
  }

  const callBack = (row, col) => {
    if (
      gameManager.isValidMove(row, col, board) &&
      !gameManager.hasWinner(board)
    ) {
      let boardHistoryCopy = JSON.parse(JSON.stringify(boardHistory));
      const boardCopy = [...board];
      boardCopy[row][col].mark = gameManager.whichPlayerTurn();

      if (boardHistoryCopy.length === 0) {
        boardHistoryCopy[0] = [...boardCopy];
      } else {
        boardHistoryCopy.splice(gameManager.getPlayerTurn());
        boardHistoryCopy = [...boardHistoryCopy, boardCopy];
      }
      gameManager.nextPlayerTurn(boardCopy, setMessage);
      setBoard(boardCopy);
      setBoardHistory(boardHistoryCopy);
    }
  };

  return (
    <div>
      <p>{gameManager.getPlayerTurn()}</p>
      {message}
      <Board board={board} callBack={callBack} />
      <div>
        {boardHistory &&
          boardHistory.map((elem, i) => {
            return (
              <p key={i} onClick={() => changeBoardState(i)}>
                {i}
              </p>
            );
          })}
      </div>
    </div>
  );
}

export default App;
