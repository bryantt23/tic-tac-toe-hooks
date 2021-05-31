import Square from './Square';

function Board({ board, callBack }) {
  return (
    <div>
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
                    mark={square.mark}
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
