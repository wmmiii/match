import React from 'react';
import { forEachCell, getCell, State } from './engine/state';
import Piece from './Piece';
import pieceTypes from './base/pieceTypes';
import './Board.css';
import { Coordinate } from './engine/util';

interface BoardProps {
  gameState: State;
  onStart: (s: Coordinate) => false;
  onEnd: (e: Coordinate) => false;
};

interface BoardState {
  lastCoordinates: Coordinate | undefined;
}

const scale = 64;

export class Board extends React.Component<BoardProps, BoardState> {
  private boardRef: React.RefObject<HTMLDivElement>;

  constructor(props: BoardProps) {
    super(props);

    this.boardRef = React.createRef();

    this.state = {
      lastCoordinates: undefined,
    };
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  onStart(event: MouseEvent | TouchEvent) {
    if (event instanceof MouseEvent) {
      this.props.onStart(this.toGridSpace(event.clientX, event.clientY));
    } else {
      const touch = event.touches[0];
      this.props.onStart(this.toGridSpace(touch.clientX, touch.clientY));
    }
  }

  onMove(event: MouseEvent | TouchEvent) {
    if (event instanceof MouseEvent) {
      this.setState({ lastCoordinates: this.toGridSpace(event.clientX, event.clientY) });
    } else {
      const touch = event.touches[0];
      this.setState({ lastCoordinates: this.toGridSpace(touch.clientX, touch.clientY) });
    }
  }

  onEnd() {
    if (this.state.lastCoordinates != null) {
      this.props.onEnd(this.state.lastCoordinates);
    }
    this.setState({ lastCoordinates: undefined });
  }

  render() {
    let maxX = -Infinity;
    let minX = Infinity;
    let maxY = -Infinity;
    let minY = Infinity;

    const cells: JSX.Element[] = [];
    forEachCell(this.props.gameState.board, (x, y) => {
      const style = {
        left: x * scale + 'px',
        top: y * scale + 'px',
      };
      const key = `${x},${y}`;
      const className = ['Board-cell']
      if (getCell(this.props.gameState.board, x, y - 1) == null) {
        className.push('Board-entry');
      }
      cells.push(<div className={className.join(' ')} style={style} key={key}></div>);

      maxX = Math.max(x, maxX);
      maxY = Math.max(y, maxY);
      minX = Math.min(x, minX);
      minY = Math.min(y, minY);
    });

    const pieces: JSX.Element[] = [];
    forEachCell(this.props.gameState.destroyedPieces, (x, y, piece) => {
      const type = pieceTypes[piece.type];
      pieces.push(<Piece
        color={type.baseColor}
        destroyed={true}
        icon={type.icon}
        id={piece.id}
        key={piece.id}
        scale={scale}
        selected={false}
        x={x}
        y={y}

        actionDown={() => {}}
        actionMove={() => {}}
        actionUp={() => {}} />);
    });
    forEachCell(this.props.gameState.pieces, (x, y, piece) => {
      const type = pieceTypes[piece.type];
      const selected = this.state.lastCoordinates != null
        && this.state.lastCoordinates.x === x
        && this.state.lastCoordinates.y === y;
      pieces.push(<Piece
        color={type.baseColor}
        destroyed={false}
        icon={type.icon}
        id={piece.id}
        key={piece.id}
        scale={scale}
        selected={selected}
        x={x}
        y={y}
        
        actionDown={this.onStart}
        actionMove={this.onMove}
        actionUp={this.onEnd} />);
    });

    const style = {
      width: (maxX - minX + 1) * scale + 'px',
      height: (maxY - minY + 1) * scale + 'px',
    };

    return <div className="Board" ref={this.boardRef} style={style}>
      <div className="Board-grid">{cells}</div>
      <div className="Board-pieces">{pieces}</div>
    </div>
  }

  private toGridSpace(clientX: number, clientY: number): Coordinate {
    const rect = this.boardRef.current?.getBoundingClientRect();
    const left = rect?.left;
    if (left == null) {
      throw Error('Could not get left of board ref!');
    }
    const top = rect?.top;
    if (top == null) {
      throw Error('Could not get top of board ref!');
    }
    return {
      x: Math.floor((clientX - left) / scale),
      y: Math.floor((clientY - top) / scale),
    };
  }
}

export default Board;
