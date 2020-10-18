import React from 'react';
import './Game.scss';
import Board from './Board';
import { forEachCell, GameStatus, ImmutableState } from './engine/state';
import Engine, { ObjectiveDescription, ObjectiveStatus } from './engine';
import { Coordinate } from './engine/util';

interface GameState {
  gameState: ImmutableState;
  start: Coordinate | undefined;
  totalScore: number;
  score: number;
  multiplier: number;
}

interface GameProps {
  audio: boolean;
  engine: Engine;
  setObjectiveStatus: (status: ObjectiveStatus) => void;
}

export default class Game extends React.Component<GameProps, GameState> {
  private lastNumber: Map<keyof GameState, number> = new Map();
  private aBlipRef: React.RefObject<HTMLAudioElement>;
  private amBlipRef: React.RefObject<HTMLAudioElement>;
  private emBlipRef: React.RefObject<HTMLAudioElement>;
  private gmBlipRef: React.RefObject<HTMLAudioElement>;

  constructor(props: GameProps) {
    super(props);

    this.aBlipRef = React.createRef();
    this.amBlipRef = React.createRef();
    this.emBlipRef = React.createRef();
    this.gmBlipRef = React.createRef();

    props.engine.initialize();

    this.state = {
      gameState: props.engine.state,
      start: undefined,
      totalScore: props.engine.state.totalScore,
      score: props.engine.state.score,
      multiplier: props.engine.state.multiplier,
    };
    this.onStart = this.onStart.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  onStart(s: Coordinate): false {
    this.setState({ start: s });
    return false;
  };

  onEnd(e: Coordinate | undefined): false {
    const engine = this.props.engine;
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

    if (state.status === GameStatus.FAILED
        || (this.props.engine.objectives.length > 0
          && this.props.engine.objectives.some(o => o.status === ObjectiveStatus.FAILED))) {
      this.props.setObjectiveStatus(ObjectiveStatus.FAILED);
    } else if (state.status === GameStatus.SUCCEEDED
        || (this.props.engine.objectives.length > 0
          && this.props.engine.objectives.every(o => o.status === ObjectiveStatus.SUCCEEDED))) {
      this.props.setObjectiveStatus(ObjectiveStatus.SUCCEEDED);
    } else {
      this.props.setObjectiveStatus(ObjectiveStatus.PENDING);
    }
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
    const state = this.state.gameState;
    let moveCounter: JSX.Element | undefined;
    if (state.totalMoves > 0 && state.totalMoves < Infinity) {
      const ticks: JSX.Element[] = [];
      for (let i = 0; i < state.totalMoves; ++i) {
        ticks.push(<div key={i} className="tick"></div>);
      }

      const fraction = state.moveCount / state.totalMoves;

      const style = { top: fraction * 100 + '%' }
      moveCounter =
        <div className="move-counter">
          <div className="moves-remaining" style={style}></div>
          {ticks}
        </div>
    }

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
        <div className="play-area">
          {objectiveBox(this.props.engine.objectives)}
          <Board gameState={this.state.gameState}
              onStart={this.onStart}
              onEnd={this.onEnd}></Board>
          {moveCounter}
        </div>
        <audio ref={this.aBlipRef} src="aBlip.wav" />
        <audio ref={this.amBlipRef} src="amBlip.wav" />
        <audio ref={this.emBlipRef} src="emBlip.wav" />
        <audio ref={this.gmBlipRef} src="gmBlip.wav" />
        <svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <path id="pending" d="M48 16h2a2 2 0 00-2-2v2zm-32 0v-2a2 2 0 00-2 2h2zm0 32h-2c0 1.1.9 2 2 2v-2zm32 0v2a2 2 0 002-2h-2zm0-34H16v4h32v-4zm-34 2v32h4V16h-4zm2 34h32v-4H16v4zm34-2V16h-4v32h4z" fill="#A3A3A3"/>
            <path id="success" d="M48 16h2a2 2 0 00-2-2v2zm-32 0v-2a2 2 0 00-2 2h2zm0 32h-2c0 1.1.9 2 2 2v-2zm32 0v2a2 2 0 002-2h-2zM25.41 30.59a2 2 0 10-2.82 2.82l2.82-2.82zM32 40l-1.41 1.41a2 2 0 002.82 0L32 40zm25.41-22.59a2 2 0 10-2.82-2.82l2.82 2.82zM48 14H16v4h32v-4zm-34 2v32h4V16h-4zm2 34h32v-4H16v4zm34-2V16h-4v32h4zM22.59 33.41l8 8 2.82-2.82-8-8-2.82 2.82zm10.82 8l24-24-2.82-2.82-24 24 2.82 2.82z" fill="#A3A3A3"/>
            <path id="failure" d="M48 16h2a2 2 0 00-2-2v2zm-32 0v-2a2 2 0 00-2 2h2zm0 32h-2c0 1.1.9 2 2 2v-2zm32 0v2a2 2 0 002-2h-2zM25.41 22.59a2 2 0 10-2.82 2.82l2.82-2.82zM38.6 41.4a2 2 0 102.82-2.82L38.6 41.4zm-16-2.82a2 2 0 102.82 2.82L22.6 38.6zM41.4 25.4a2 2 0 10-2.82-2.82l2.82 2.82zM48 14H16v4h32v-4zm-34 2v32h4V16h-4zm2 34h32v-4H16v4zm34-2V16h-4v32h4zM22.59 25.41l16 16 2.82-2.82-16-16-2.82 2.82zm2.82 16l16-16-2.82-2.82-16 16 2.82 2.82z" fill="#A3A3A3"/>
          </defs>
        </svg>
      </div>
      );
  }

  private easeOutCirc(t: number, start: number, delta: number) {
    t--;
    return delta * Math.sqrt(1 - t*t) + start;
  };
}

function objectiveBox(objectives: ObjectiveDescription[]): JSX.Element | undefined {
  if (objectives.length === 0) {
    return undefined;
  }
  const list = objectives.map(o => {
    let icon: string;
    if (o.status === ObjectiveStatus.SUCCEEDED) {
      icon = '#success';
    } else if (o.status === ObjectiveStatus.FAILED) {
      icon = '#failure';
    } else {
      icon = '#pending';
    }
    return <li key={o.description} className="objective">
      <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
        <use xlinkHref={icon} />
      </svg>
      <p>{o.description}</p>
    </li>;
  });
  return <div className="objectives">
      <h3>{objectives.length > 1 ? 'Objectives' : 'Objective'}</h3>
      <ol>
        {list}
      </ol>
    </div>;
}