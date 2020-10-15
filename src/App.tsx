import React from 'react';
import Game from './Game';
import './App.scss';
import BasePieces from './base/pieces';

interface AppState  {
  audio: boolean;
}

export default class App extends React.Component<any, AppState> {
  constructor(prop: any) {
    super(prop);

    this.state = {
      audio: true,
    };

    this.toggleAudio = this.toggleAudio.bind(this);
  }

  toggleAudio() {
    this.setState({ audio: !this.state.audio });
  }

  render() {
    const audioClass = ['audio'];
    if (!this.state.audio) {
      audioClass.push('disabled');
    }

    return (
      <div className="App">
        <button className={audioClass.join(' ')}
            onClick={this.toggleAudio}>
          {this.state.audio ? 'Sound On' : 'Sound Off'}
        </button>
        <BasePieces />
        <Game audio={this.state.audio} />
      </div>
      );
  }
}
