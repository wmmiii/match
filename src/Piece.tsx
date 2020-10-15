import React from 'react';
import './Piece.css';

interface PieceProps {
  color: string,
  icon: string,
  id: string,
  scale: number,
  x: number,
  y: number,

  actionDown: () => void;
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

    return <div
        className={className.join(' ')}
        style={style}
        onMouseDown={this.props.actionDown}
        onMouseUp={this.props.actionUp}
        onTouchStart={this.props.actionDown}
        onTouchEnd={this.props.actionUp}>
      <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
        <use xlinkHref={icon} />
      </svg>
    </div>;
  }
}
