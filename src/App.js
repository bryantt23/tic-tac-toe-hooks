import Board from './Board';
import React, { useState, useEffect } from 'react';
import GameManager from './GameManager';

const gameManager = new GameManager();

function App() {
  const [gameHasWinner, setGameHasWinner] = useState(false);
  const [board, setBoard] = useState(null);
  const [message, setMessage] = useState('');
  const [boardHistory, setBoardHistory] = useState([]);

  function changeBoardState(index) {
    const boardAtIndex = JSON.parse(JSON.stringify(boardHistory[index]));
    setBoard(boardAtIndex);
    gameManager.setPlayerTurn(index);
    gameManager.nextPlayerTurn(boardAtIndex, setGameHasWinner, setMessage);
  }

  useEffect(() => {
    const boardState = gameManager.initializeBoard();
    setBoard(boardState);
    setMessage(`It is ${gameManager.whichPlayerTurn()}'s turn`);
    setBoardHistory([]);
  }, []);

  function isValidMove(row, col) {
    return board[row][col].mark === '_';
  }

  const callBack = (row, col) => {
    if (
      isValidMove(row, col) &&
      !gameManager.hasWinner(board, setGameHasWinner)
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
      gameManager.nextPlayerTurn(boardCopy, setGameHasWinner, setMessage);
      setBoard(boardCopy);
      setBoardHistory(boardHistoryCopy);

      console.log(
        '🚀 ~ file: App.js ~ line 71 ~ callBack ~ boardHistoryCopy',
        boardHistoryCopy
      );
    }
  };

  return (
    <div>
      <p>{gameManager.getPlayerTurn()}</p>
      {message}
      <Board board={board} callBack={callBack} />
      <div>
        {boardHistory &&
          boardHistory.map((board, i) => {
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
