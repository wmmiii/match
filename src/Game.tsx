import React from 'react';
import './Game.scss';
import Board from './Board';
import { forEachCell, ImmutableState, State } from './engine/state';
import Engine from './engine';
import generator from './base/generator';
import moves from './base/moves';
import matchRules from './base/matchRules';
import { Coordinate } from './engine/util';

interface GameState {
  engine: Engine;
  gameState: ImmutableState;
  start: Coordinate | undefined;
  totalScore: number;
  score: number;
  multiplier: number;
}

interface GameProps {
  audio: boolean;
}

export default class Game extends React.Component<GameProps, GameState> {
  private lastNumber: Map<keyof GameState, number> = new Map();
  private aBlipRef: React.RefObject<HTMLAudioElement>;
  private amBlipRef: React.RefObject<HTMLAudioElement>;
  private emBlipRef: React.RefObject<HTMLAudioElement>;
  private gmBlipRef: React.RefObject<HTMLAudioElement>;

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

    this.aBlipRef = React.createRef();
    this.amBlipRef = React.createRef();
    this.emBlipRef = React.createRef();
    this.gmBlipRef = React.createRef();

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
    const blips = [
      this.aBlipRef,
      this.amBlipRef,
      this.emBlipRef,
      this.gmBlipRef,
    ];
    if (this.props.audio) {
      let count = 0;
      forEachCell(state.destroyedThisTick, () => {
        count++;
        window.setTimeout(() => {
          const index = Math.floor(Math.random() * blips.length);
          const element = blips[index];
          if (element != null && element.current != null) {
            const audio = (element.current.cloneNode(true) as HTMLAudioElement);
            audio.volume = 1 / count;
            audio.play();
          }
        }, count * 40);
      });
    }

    this.setState({
      gameState: state,
      multiplier: state.multiplier,
    });
    this.targetNumber('totalScore', state.totalScore, 2000);
    if (state.score !== 0) {
      this.targetNumber('score', state.score, 200); 
    } else {
      this.setState({ score: 0 });
      this.lastNumber.set('score', 0);
    }
  }

  targetNumber(property: keyof GameState, value: number, speed: number) {
    if (this.lastNumber.get(property) === value) {
      return;
    }

    const startTime = new Date().getTime();
    const startValue = this.state[property] as number;

    const onFrame = () => {
      if (this.lastNumber.get(property) !== value) {
        return;
      }

      let t = (new Date().getTime() - startTime) / speed;
      if (t > 1) {
        const state: any = {};
        state[property] = value;
        this.setState(state);
        return;
      }
      const state: any = {};
      state[property] = Math.floor(this.easeOutCirc(t, startValue, value - startValue));
      this.setState(state);
      window.requestAnimationFrame(onFrame);
    };
    window.requestAnimationFrame(onFrame);

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
        <audio ref={this.aBlipRef} src="aBlip.wav" />
        <audio ref={this.amBlipRef} src="amBlip.wav" />
        <audio ref={this.emBlipRef} src="emBlip.wav" />
        <audio ref={this.gmBlipRef} src="gmBlip.wav" />
      </div>
      );
  }

  private easeOutCirc(t: number, start: number, delta: number) {
    t--;
    return delta * Math.sqrt(1 - t*t) + start;
  };
}
