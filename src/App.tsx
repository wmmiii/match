import React from 'react';
import BasePieces from './base/pieces';
import './App.css';
import Board from './Board';
import { State } from './engine/state';
import Engine from './engine';
import generator from './base/generator';
import moves from './base/moves';
import matchRules from './base/matches';
import { Coordinate } from './engine/util';

interface AppState  {
  engine: Engine;
  gameState: State;
  start: Coordinate | undefined;
  score: number;
}

export default class App extends React.Component<any, AppState> {
  private interval: number = 0;

  constructor(props: any) {
    super(props);

    const gameState: State = {
      board: {
        0: {
          1: true,
          2: true,
          3: true,
        },
        1: {
          0: true,
          1: true,
          2: true,
          3: true,
          4: true,
        },
        2: {
          0: true,
          1: true,
          2: true,
          3: true,
          4: true,
        },
        3: {
          0: true,
          1: true,
          2: true,
          3: true,
          4: true,
        },
        4: {
          1: true,
          2: true,
          3: true,
        },
      },
      score: 0,
      pieces: [],
      destroyedPieces: [],
      settled: false,
    };

    const engine = new Engine(gameState, generator, moves, matchRules);
    engine.initialize();

    this.state = {
      engine: engine,
      gameState: engine.state,
      start: undefined,
      score: engine.state.score,
    };
    this.onStart = this.onStart.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  onStart(s: Coordinate): false {
    this.setState({ start: s });
    return false;
  };

  onEnd(e: Coordinate | undefined): false {
    const engine = this.state.engine;
    if (e != null && this.state.start != null && engine.state.settled) {
      if (engine.move(this.state.start, e)) {
        this.setState({ gameState: engine.state });
        this.targetScore(engine.state.score);
        this.forceUpdate();
        let interval = window.setInterval(() => {;
          this.setState({ gameState: engine.tick() });
          this.targetScore(engine.state.score);
          this.forceUpdate();
          if (this.state.gameState.settled) {
            window.clearInterval(interval);
          }
        }, 200);
      }
    }
    this.setState({ start: undefined });
    return false;
  }

  targetScore(score: number): void {
    window.clearInterval(this.interval);
    const startTime = new Date().getTime();
    const startScore = this.state.score;

    const interval = window.setInterval(() => {
      let t = (new Date().getTime() - startTime) / 1000;
      if (t > 1) {
        this.setState({ score: score });
        window.clearInterval(interval);
        return;
      }
      this.setState({
        score: Math.floor(this.easeOutCirc(t, startScore, score - startScore)),
      });
    }, 10);

    this.interval = interval;
  }

  render() {
    return (
      <div className="App">
        <BasePieces />
        <div className="score">
          {this.state.score}
        </div>
        <Board gameState={this.state.gameState}
            onStart={this.onStart}
            onEnd={this.onEnd}></Board>
      </div>
      );
  }

  private easeOutCirc(t: number, start: number, delta: number) {
    t--;
    return delta * Math.sqrt(1 - t*t) + start;
  };
}
