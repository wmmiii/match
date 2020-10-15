import React from 'react';
import Game from './Game';
import './App.scss';
import { State } from './engine/state';
import Engine from './engine';
import { Coordinate } from './engine/util';
import BasePieces from './base/pieces';

interface AppState  {
  engine: Engine;
  gameState: State;
  start: Coordinate | undefined;
  score: number;
}

export default class App extends React.Component<any, AppState> {
  render() {
    return (
      <div className="App">
        <BasePieces />
        <Game />
      </div>
      );
  }
}
