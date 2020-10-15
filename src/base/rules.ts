import { Rule } from '../engine';
import { forEachCell, getCell, setCell } from '../engine/state';

const rules: Rule[] = [
  { // Match 3 horizontally
    priority: 0,
    apply: (state) => {
      forEachCell(state.board, (x, y) => {
        const first = getCell(state.pieces, x, y);
        if (first == null) {
          return;
        }
        const middle = getCell(state.pieces, x + 1, y);
        if (middle == null) {
          return;
        }
        const last = getCell(state.pieces, x + 2, y);
        if (last == null) {
          return;
        }

        if (first.type === middle.type && first.type === last.type) {
          setCell(state.pieces, x, y, undefined);
          setCell(state.pieces, x + 1, y, undefined);
          setCell(state.pieces, x + 2, y, undefined);
          state.score += 100;
        }
      });
      return state;
    },
  },

  { // Match 3 vertically
    priority: 0,
    apply: (state) => {
      forEachCell(state.board, (x, y) => {
        const first = getCell(state.pieces, x, y);
        if (first == null) {
          return;
        }
        const middle = getCell(state.pieces, x, y + 1);
        if (middle == null) {
          return;
        }
        const last = getCell(state.pieces, x, y + 2);
        if (last == null) {
          return;
        }

        if (first.type === middle.type && first.type === last.type) {
          setCell(state.pieces, x, y, undefined);
          setCell(state.pieces, x, y + 1, undefined);
          setCell(state.pieces, x, y + 2, undefined);
          state.score += 100;
        }
      });
      return state;
    },
  }
];

export default rules;