import React from 'react';
import './Game.scss';
import Board from './Board';
import { ImmutableState, State } from './engine/state';
import Engine from './engine';
import generator from './base/generator';
import moves from './base/moves';
import matchRules from './base/matchRules';
import { Coordinate } from './engine/util';

interface GameState  {
  engine: Engine;
  gameState: ImmutableState;
  start: Coordinate | undefined;
  totalScore: number;
  score: number;
  multiplier: number;
}

export default class Game extends React.Component<any, GameState> {
  private interval: Map<keyof GameState, number> = new Map();
  private lastNumber: Map<keyof GameState, number> = new Map();

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
      totalScore: 0,
      score: 0,
      multiplier: 0,
      pieces: [],
      destroyedThisTick: [],
      destroyedLastTick: [],
      settled: false,
    };

    const engine = new Engine(gameState, generator, moves, matchRules);
    engine.initialize();

    this.state = {
      engine: engine,
      gameState: engine.state,
      start: undefined,
      totalScore: engine.state.totalScore,
      score: engine.state.score,
      multiplier: engine.state.multiplier,
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
        this.update(engine.tick());
        let interval = window.setInterval(() => {;
          this.update(engine.tick());
          if (this.state.gameState.settled) {
            window.clearInterval(interval);
          }
        }, 150);
      }
    }
    this.setState({ start: undefined });
    return false;
  }

  update(state: ImmutableState) {
    this.setState({
      gameState: state,
      multiplier: state.multiplier,
    });
    this.targetNumber('totalScore', state.totalScore, 2000);
    if (state.score !== 0) {
      this.targetNumber('score', state.score, 200); 
    } else {
      this.setState({ score: 0 });
      window.clearInterval(this.interval.get('score'));
      this.lastNumber.set('score', 0);
    }
  }

  targetNumber(property: keyof GameState, value: number, speed: number) {
    if (this.lastNumber.get(property) === value) {
      return;
    }

    const startTime = new Date().getTime();
    const startValue = this.state[property] as number;

    console.log(`reset ${property} target`);
    window.clearInterval(this.interval.get(property));
    const interval = window.setInterval(() => {
      let t = (new Date().getTime() - startTime) / speed;
      if (t > 1) {
        const state: any = {};
        state[property] = value;
        this.setState(state);
        console.log(`${property} complete`);
        window.clearInterval(interval);
        return;
      }
      const state: any = {};
      state[property] = Math.floor(this.easeOutCirc(t, startValue, value - startValue));
      this.setState(state);
    }, 10);

    this.interval.set(property, interval);
    this.lastNumber.set(property, value);
  }

  render() {
    return (
      <div className="Game">
        <div className="header">
          <div className="score">
            {this.state.totalScore}
          </div>
          <div className="space"></div>
          <div className="score">
            {this.state.score}
          </div>
          <div className="spacer"></div>
          <div className="score">
            x{this.state.multiplier}
          </div>
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
