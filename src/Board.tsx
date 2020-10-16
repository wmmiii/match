import React from 'react';
import { forEachCell, getCell, State, Piece as GamePiece } from './engine/state';
import pieceTypes from './base/pieceTypes';
import './Board.scss';
import { Coordinate } from './engine/util';
import Piece from './Piece';

interface BoardProps {
  gameState: State;
  onStart: (s: Coordinate) => false;
  onEnd: (e: Coordinate) => false;
};

interface BoardState {
  lastCoordinates: Coordinate | undefined;
  scale: number;
  translateX: number;
  translateY: number;
  gridWidth: number;
  gridHeight: number;
}

const scale = 64;

export class Board extends React.Component<BoardProps, BoardState> {
  private boardRef: React.RefObject<HTMLDivElement>;
  private gridRef: React.RefObject<HTMLDivElement>;

  constructor(props: BoardProps) {
    super(props);

    this.boardRef = React.createRef();
    this.gridRef = React.createRef();

    let maxX = -Infinity;
    let minX = Infinity;
    let maxY = -Infinity;
    let minY = Infinity;

    forEachCell(this.props.gameState.board, (x, y) => {
      maxX = Math.max(x, maxX);
      maxY = Math.max(y, maxY);
      minX = Math.min(x, minX);
      minY = Math.min(y, minY);
    });

    this.state = {
      lastCoordinates: undefined,
      scale: scale,
      translateX: 0,
      translateY: 0,
      gridWidth: (maxX - minX + 1),
      gridHeight: (maxY - minY + 1),
    };
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.onResize = this.onResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
    this.onResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
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

  onResize() {
    const rect = this.boardRef.current?.getBoundingClientRect();
    if (rect == null) {
      return;
    }

    const currentWidth = this.state.gridWidth * scale;
    const currentHeight = this.state.gridHeight * scale;

    const targetWidth = rect.width - 32;
    const targetHeight = rect.height - 32;

    let scaleFactor: number;
    if (targetWidth / targetHeight > currentWidth / currentHeight) {
      // Calculate in terms of height
      scaleFactor = targetHeight / currentHeight;
    } else {
      scaleFactor = targetWidth / currentWidth;
    }

    this.setState({ scale: scaleFactor });
  }

  render() {
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
    });

    const pieces: JSX.Element[] = [];
    const destroyed = (x: number, y: number, piece: GamePiece) => {
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
    };
    forEachCell(this.props.gameState.destroyedThisTick, destroyed);
    forEachCell(this.props.gameState.destroyedLastTick, destroyed);
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

    const innerStyle = {
      width: this.state.gridWidth * scale,
      height: this.state.gridHeight * scale,
    };

    const transform = `scale(${this.state.scale})`;

    const contextStyle = { transform: transform };

    return <div className="Board" ref={this.boardRef}>
      <div className="context" style={contextStyle}>
        <div className="Board-grid" ref={this.gridRef} style={innerStyle}>{cells}</div>
        <div className="Board-pieces" style={innerStyle}>{pieces}</div>
      </div>
    </div>
  }

  private toGridSpace(clientX: number, clientY: number): Coordinate {
    const rect = this.gridRef.current?.getBoundingClientRect();
    const left = rect?.left;
    if (left == null) {
      throw Error('Could not get left of board ref!');
    }
    const top = rect?.top;
    if (top == null) {
      throw Error('Could not get top of board ref!');
    }
    return {
      x: Math.floor((clientX - left) / scale / this.state.scale),
      y: Math.floor((clientY - top) / scale / this.state.scale),
    };
  }
}

export default Board;
