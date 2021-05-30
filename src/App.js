import Board from './Board';
import React, { useState, useEffect } from 'react';

function disableBoard() {
  const gameBoardElement = document.querySelector('#game-board');
  gameBoardElement.classList.add('disabled-div');
}

const size = 3;
function initializeBoard() {
  const boardState = [];
  for (let i = 0; i < size; i++) {
    let row = [];
    for (let j = 0; j < size; j++) {
      row.push({ row: i, col: j, mark: '_' });
    }
    boardState.push(row);
  }
  return boardState;
}

let playerTurn = 0;
function App() {
  const [gameHasWinner, setGameHasWinner] = useState(false);
  const [board, setBoard] = useState(null);
  const [message, setMessage] = useState('');
  const [disabledState, setDisabledState] = useState(false);

  function whichPlayerTurn() {
    return playerTurn % 2 == 0 ? 'X' : 'O';
  }

  useEffect(() => {
    const boardState = initializeBoard();
    setBoard(boardState);
    setMessage(`It is ${whichPlayerTurn()}'s turn`);
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
      nextPlayerTurn();
    }
  };

  function nextPlayerTurn() {
    let messageLocal;
    if (hasWinner()) {
      messageLocal = whichPlayerTurn() + ' has won!';
      // view.disableBoard();//TODO
      setDisabledState(true);
      // let element = document.getElementById('board');
      // element.style = {
      //   pointerEvents: 'none',
      //   opacity: '0.4'
      // };
    } else {
      playerTurn++;
      if (playerTurn === 9) {
        messageLocal = "It's a draw!";
        setDisabledState(true);
        // view.disableBoard();//TODO
      } else {
        messageLocal = `It is ${whichPlayerTurn()}'s turn`;
      }
    }
    setMessage(messageLocal);
  }

  function hasWinner() {
    return horizontalWinner() || verticalWinner() || diagonalWinner();
  }

  function horizontalWinner() {
    for (let i = 0; i < size; i++) {
      let ct = 0;
      for (let j = 0; j < size; j++) {
        if (board[i][j].mark === 'X') {
          ct++;
        } else if (board[i][j].mark === 'O') {
          ct--;
        }
      }
      if (ct === 3 || ct === -3) {
        return true;
      }
    }
    return false;
  }

  function verticalWinner() {
    for (let j = 0; j < size; j++) {
      let ct = 0;
      for (let i = 0; i < size; i++) {
        if (board[i][j].mark === 'X') {
          ct++;
        } else if (board[i][j].mark === 'O') {
          ct--;
        }
      }
      if (ct === 3 || ct === -3) {
        return true;
      }
    }
    return false;
  }

  function diagonalWinner() {
    let ct = 0;
    for (let i = 0; i < size; i++) {
      if (board[i][i].mark === 'X') {
        ct++;
      } else if (board[i][i].mark === 'O') {
        ct--;
      }
    }
    if (ct === 3 || ct === -3) {
      return true;
    }

    ct = 0;
    for (let i = 0; i < size; i++) {
      if (board[i][size - i - 1].mark === 'X') {
        ct++;
      } else if (board[i][size - i - 1].mark === 'O') {
        ct--;
      }
    }
    if (ct === 3 || ct === -3) {
      return true;
    }
  }

  return (
    <div
      style={{
        pointerEvents: disabledState ? 'none' : 'auto',
        opacity: disabledState ? '0.4' : '1'
      }}
    >
      {message}
      <Board board={board} callBack={callBack} />
    </div>
  );
}

export default App;
