import React from 'react';
import BasePieces from './base/pieces';
import './App.css';
import Board from './Board';
import { State } from './engine/state';
import Engine from './engine';
import generator from './base/generator';
import moves from './base/moves';
import rules from './base/rules';

function App() {
  const state: State = {
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
    settled: false,
  };

  const engine = new Engine(state, generator, moves, rules);
  engine.initialize();

  return (
    <div className="App">
      <BasePieces />
      <Board state={engine.state}></Board>
    </div>
  );
}

export default App;
