const size = 3;
let playerTurn = 0;

export default function GameManager() {
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

  function hasWinner(board) {
    const winner =
      horizontalWinner(board) || verticalWinner(board) || diagonalWinner(board);

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

  function nextPlayerTurn(board, setMessage) {
    let messageLocal;
    if (hasWinner(board)) {
      messageLocal = whichPlayerTurn() + ' has won!';
    } else {
      playerTurn++;
      if (playerTurn === 9) {
        messageLocal = "It's a draw!";
      } else {
        messageLocal = `It is ${whichPlayerTurn()}'s turn`;
      }
    }
    setMessage(messageLocal);
  }

  function whichPlayerTurn() {
    return playerTurn % 2 == 0 ? 'X' : 'O';
  }

  function getPlayerTurn() {
    return playerTurn;
  }

  function setPlayerTurn(turn) {
    playerTurn = turn;
  }

  function isValidMove(row, col, board) {
    return board[row][col].mark === '_';
  }

  return {
    initializeBoard,
    hasWinner,
    nextPlayerTurn,
    whichPlayerTurn,
    getPlayerTurn,
    setPlayerTurn,
    isValidMove
  };
}
