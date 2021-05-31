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
        callBack(row, col);
      }}
    >
      {mark}
    </span>
  );
}

export default Square;
