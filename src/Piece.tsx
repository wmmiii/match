import React from 'react';
import './Piece.css';

interface PieceProps {
  color: string,
  icon: string,
  id: string,
  scale: number,
  x: number,
  y: number,
};

const Piece = ({color, icon, id, scale, x, y}: PieceProps) => {
  const style = {
    color: color,
    height: scale,
    left: x * scale + 'px',
    top: y * scale + 'px',
    width: scale,
  };
  icon = '#' + icon;
  return <div className="Piece" style={style} key={id}>
    <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <use xlinkHref={icon} />
    </svg>
  </div>;
}

export default Piece;
