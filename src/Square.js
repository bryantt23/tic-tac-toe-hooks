import React from 'react';

function Square({ callBack, row, col }) {
  return (
    <span
      onClick={() => {
        console.log(
          '🚀 ~ file: Square.js ~ line 4 ~ Square ~ row, col',
          row,
          col
        );

        callBack(row, col);
      }}
    >
      Square
    </span>
  );
}

export default Square;
