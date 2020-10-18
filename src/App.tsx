import React from 'react';
import './App.scss';
import BasePieces from './base/pieces';
import LevelBrowser from './LevelBrowser';
import Level from './level';
import Engine, { ObjectiveStatus } from './engine';
import Game from './Game';

interface AppState  {
  audio: boolean;
  gameInSession: boolean;
  objectiveStatus: ObjectiveStatus;
  level?: Level;
  engine?: Engine;
}

export default class App extends React.Component<any, AppState> {
  constructor(prop: any) {
    super(prop);

    this.state = {
      audio: true,
      gameInSession: false,
      objectiveStatus: ObjectiveStatus.PENDING,
    };

    this.toggleAudio = this.toggleAudio.bind(this);
    this.activateLevel = this.activateLevel.bind(this);
    this.deactivateLevel = this.deactivateLevel.bind(this);
    this.setObjectiveStatus = this.setObjectiveStatus.bind(this);
  }

  toggleAudio(): void {
    this.setState({ audio: !this.state.audio });
  }

  activateLevel(level: Level): void {
    this.setState({
      level: level,
      engine: level.generate(),
      gameInSession: true,
    });
  }

  deactivateLevel(): void {
    this.setState({
      gameInSession: false,
      objectiveStatus: ObjectiveStatus.PENDING,
    });
    window.setTimeout(() => {
      this.setState({
        level: undefined,
        engine: undefined,
      });
    }, 400);
  }

  setObjectiveStatus(status: ObjectiveStatus): void {
    this.setState({ objectiveStatus: status });
  }

  render() {
    const audioClass = ['audio'];
    if (!this.state.audio) {
      audioClass.push('disabled');
    }

    const appClass = ['App'];
    if (this.state.objectiveStatus === ObjectiveStatus.SUCCEEDED) {
      appClass.push('succeeded');
    } else if (this.state.objectiveStatus === ObjectiveStatus.FAILED) {
      appClass.push('failed');
    }

    let game: JSX.Element | undefined;
    let back: JSX.Element | undefined;
    const browserClass = ['browser'];
    const gameClass = ['game'];
    if (this.state.gameInSession) {
      browserClass.push('hidden');
      back = 
        <button onClick={this.deactivateLevel}>
          Back
        </button>;
    } else {
      gameClass.push('hidden');
    }

    if (this.state.level != null && this.state.engine != null) {
      game = <Game
          audio={this.state.audio}
          engine={this.state.engine}
          setObjectiveStatus={this.setObjectiveStatus} />;
    }

    return (
      <div className={appClass.join(' ')}>
        <header>
          {back}
          <div className="spacer"></div>
          <button className={audioClass.join(' ')}
              onClick={this.toggleAudio}>
            {this.state.audio ? 'Sound On' : 'Sound Off'}
          </button>
        </header>
        <BasePieces />
        <div className="wrapper">
          <div className={browserClass.join(' ')}>
            <LevelBrowser activate={this.activateLevel} />
          </div>
          <div className={gameClass.join(' ')}>
            {game}
          </div>
        </div>
        <div className="success"></div>
        <div className="failure"></div>
      </div>
      );
  }
}
