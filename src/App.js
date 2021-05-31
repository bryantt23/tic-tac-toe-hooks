import Board from './Board';
import React, { useState, useEffect } from 'react';

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
  const [boardHistory, setBoardHistory] = useState([]);

  function whichPlayerTurn() {
    return playerTurn % 2 == 0 ? 'X' : 'O';
  }

  function changeBoardState(index) {
    console.log(
      '🚀 ~ file: App.js ~ line 29 ~ changeBoardState ~ index',
      index
    );
    console.log(
      '🚀 ~ file: App.js ~ line 37 ~ changeBoardState ~ playerTurn',
      playerTurn
    );

    // if (gameHasWinner && index === playerTurn) {
    //   return;
    // }

    const boardAtIndex = JSON.parse(JSON.stringify(boardHistory[index]));
    setBoard(boardAtIndex);
    // setGameHasWinner(false);
    nextPlayerTurn(boardAtIndex);
    playerTurn = index + 1;
    // const messageLocal = `It is ${whichPlayerTurn()}'s turn`;
    // setMessage(messageLocal);
  }

  useEffect(() => {
    const boardState = initializeBoard();
    setBoard(boardState);
    setMessage(`It is ${whichPlayerTurn()}'s turn`);
    setBoardHistory([]);
  }, []);

  function isValidMove(row, col) {
    return board[row][col].mark === '_';
  }

  const callBack = (row, col) => {
    // debugger;
    if (isValidMove(row, col) && !hasWinner(board)) {
      let boardHistoryCopy = JSON.parse(JSON.stringify(boardHistory));

      const boardCopy = [...board];
      boardCopy[row][col].mark = whichPlayerTurn();

      if (boardHistoryCopy.length === 0) {
        boardHistoryCopy[0] = [...boardCopy];
      } else {
        boardHistoryCopy.splice(playerTurn);
        boardHistoryCopy = [...boardHistoryCopy, boardCopy];
      }
      nextPlayerTurn(boardCopy);
      setBoard(boardCopy);
      setBoardHistory(boardHistoryCopy);

      console.log(
        '🚀 ~ file: App.js ~ line 71 ~ callBack ~ boardHistoryCopy',
        boardHistoryCopy
      );
      // boardHistoryCopy = [...boardHistoryCopy, boardCopy];
    }
  };

  function nextPlayerTurn(board) {
    let messageLocal;
    if (hasWinner(board)) {
      messageLocal = whichPlayerTurn() + ' has won!';
      // view.disableBoard();//TODO
      // let element = document.getElementById('board');
      // element.style = {
      //   pointerEvents: 'none',
      //   opacity: '0.4'
      // };
    } else {
      playerTurn++;
      if (playerTurn === 9) {
        messageLocal = "It's a draw!";
        // view.disableBoard();//TODO
      } else {
        messageLocal = `It is ${whichPlayerTurn()}'s turn`;
      }
    }
    setMessage(messageLocal);
  }

  function hasWinner(board) {
    const winner =
      horizontalWinner(board) || verticalWinner(board) || diagonalWinner(board);
    if (winner) {
      setGameHasWinner(true);
    }
    return winner;
  }

  function horizontalWinner(board) {
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

  function verticalWinner(board) {
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

  function diagonalWinner(board) {
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
    <div>
      <p>{playerTurn}</p>
      {message}
      {/* {JSON.stringify(boardHistory)} */}
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
