import React from 'react';
import { forEachCell, State } from './engine/state';
import Piece from './Piece';
import pieceTypes from './base/pieceTypes';
import './Board.css';

interface BoardProps {
  state: State;
};

const scale = 64;

const Board = ({state}: BoardProps) => {
  let maxX = -Infinity;
  let minX = Infinity;
  let maxY = -Infinity;
  let minY = Infinity;

  const cells: JSX.Element[] = [];
  forEachCell(state.board, (x, y) => {
    const style = {
      left: x * scale + 'px',
      top: y * scale + 'px',
    };
    const key = `${x},${y}`
    cells.push(<div className="Board-cell" style={style} key={key}></div>);

    maxX = Math.max(x, maxX);
    maxY = Math.max(y, maxY);
    minX = Math.min(x, minX);
    minY = Math.min(y, minY);
  });

  const pieces: JSX.Element[] = [];
  forEachCell(state.pieces, (x, y, piece) => {
    const type = pieceTypes[piece.type];
    pieces.push(Piece({
      color: type.baseColor,
      icon: type.icon,
      id: piece.id,
      scale: scale,
      x: x,
      y: y,
    }));
  });

  const style = {
    width: (maxX - minX) * scale + 'px',
    height: (maxY - minY) * scale + 'px',
  };

  return <div className="Board" style={style}>
    <div className="Board-grid">{cells}</div>
    <div className="Board-pieces">{pieces}</div>
  </div>
}

export default Board;
