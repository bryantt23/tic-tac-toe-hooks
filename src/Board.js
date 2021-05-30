import Square from './Square';

function Board({ board, callBack }) {
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