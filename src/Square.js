import React from 'react';

function Square({ callBack, row, col, mark }) {
  return (
    <span
      style={{
        display: 'inline-block',
        textAlign: 'center',
        border: '1px solid black',
        minWidth: 50,
        minHeight: 50,
        backgroundColor: 'aqua'
      }}
      onClick={() => {
        console.log(
          '🚀 ~ file: Square.js ~ line 4 ~ Square ~ row, col',
          row,
          col
        );

        callBack(row, col);
      }}
    >
      {mark}
    </span>
  );
}

export default Square;
