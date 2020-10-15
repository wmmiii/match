import { MatchRule } from '../engine';
import { forEachCell, getCell, setCell, State } from '../engine/state';
import { Coordinate } from '../engine/util';

function clearGroup(state: State, score: number, ...group: Coordinate[]) {
  const pieces = state.pieces;
  forEachCell(state.board, (x, y) => {
    const first = getCell(pieces, x, y);
    if (first == null) {
      return;
    }
    const type = first.type;
    for (let piece of group) {
      const nth = getCell(pieces, x + piece.x, y + piece.y);
      if (nth == null || nth.type !== type) {
        return;
      }
    }

    for (let piece of group) {
      setCell(state.pieces, x + piece.x, y + piece.y, undefined);
    }
    state.score += score;
  });

  return state;
}

const matchRules: MatchRule[] = [
  { // Match 3 horizontally
    priority: 0.1,
    apply: (state) => {
      clearGroup(state,
        300,
        { x: -3, y: 0 },
        { x: -2, y: 0 },
        { x: -1, y: 0 },
        { x: 0, y: 0 });
      return state;
    },
  },
  { // Match 3 Vertically
    priority: 0.1,
    apply: (state) => {
      clearGroup(state,
        300,
        { x: 0, y: -3 },
        { x: 0, y: -2 },
        { x: 0, y: -1 },
        { x: 0, y: 0 });
      return state;
    },
  },
  { // Match 3 horizontally
    priority: 0,
    apply: (state) => {
      clearGroup(state,
        100,
        { x: -2, y: 0 },
        { x: -1, y: 0 },
        { x: 0, y: 0 });
      return state;
    },
  },
  { // Match 3 Vertically
    priority: 0,
    apply: (state) => {
      clearGroup(state,
        100,
        { x: 0, y: -2 },
        { x: 0, y: -1 },
        { x: 0, y: 0 });
      return state;
    },
  },
];

export default matchRules;