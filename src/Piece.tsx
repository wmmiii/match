import React from 'react';
import './Piece.css';

interface PieceProps {
  color: string,
  icon: string,
  id: string,
  scale: number,
  selected: boolean;
  x: number,
  y: number,

  actionDown: (event: MouseEvent | TouchEvent) => void;
  actionMove: (event: MouseEvent | TouchEvent) => void;
  actionUp: () => void;
};

interface PieceState {
  visible: boolean;
}

export default class Piece extends React.Component<PieceProps, PieceState> {

  constructor(props: PieceProps) {
    super(props);

    this.state = {
      visible: false,
    };
  }

  componentDidMount() {
    window.setTimeout(() => {
      this.setState({ visible: true });
    }, 100);
  }

  render() {
    const scale = this.props.scale
    const style = {
      color: this.props.color,
      height: scale,
      left: this.props.x * scale + 'px',
      top: this.props.y * scale + 'px',
      width: scale,
    };
    const icon = '#' + this.props.icon;
    const className = ['Piece'];
    if (!this.state.visible) {
      className.push('hidden');
    }
    if (this.props.selected) {
      className.push('selected');
    }

    return <div
        className={className.join(' ')}
        style={style}
        onMouseDown={(event) => this.props.actionDown(event.nativeEvent)}
        onMouseMove={(event) => this.props.actionMove(event.nativeEvent)}
        onMouseUp={this.props.actionUp}
        onTouchStart={(event) => this.props.actionDown(event.nativeEvent)}
        onTouchMove={(event) => this.props.actionMove(event.nativeEvent)}
        onTouchEnd={this.props.actionUp}>
      <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
        <use xlinkHref={icon} />
      </svg>
    </div>;
  }
}
