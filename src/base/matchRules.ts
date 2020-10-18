import { MatchRule } from '../engine';
import { forEachCell, getCell, setCell, State } from '../engine/state';
import { Coordinate } from '../engine/util';

function clearLines(state: State): State {
  const pieces = state.pieces;
  const removal: Coordinate[] = [];
  forEachCell(pieces, (x, y, piece) => {
    if (getCell(pieces, x, y) == null
      || removal.some(c => c.x === x && c.y === y)) {
      return;
    }

    const curr: Coordinate = { x: x, y: y };
    const horizontal: Coordinate[] = [{ x: x, y: y }];
    while (true) {
      curr.x += 1;
      const currPiece = getCell(pieces, curr.x, curr.y);
      if (currPiece != null && currPiece.type === piece.type) {
        horizontal.push({ x: curr.x, y: curr.y });
      } else {
        break;
      }
    }

    if (horizontal.length > 2) {
      state.score += (horizontal.length - 2) * 100;
      state.multiplier += 1;
      removal.push(...horizontal);
    }

    curr.x = x;
    curr.y = y;
    const vertical: Coordinate[] = [{ x: x, y: y }];
    while (true) {
      curr.y += 1;
      const currPiece = getCell(pieces, curr.x, curr.y);
      if (currPiece != null && currPiece.type === piece.type) {
        vertical.push({ x: curr.x, y: curr.y });
      } else {
        break;
      }
    }

    if (vertical.length > 2) {
      state.score += (vertical.length - 2) * 100;
      state.multiplier += 1;
      removal.push(...vertical);
    }
  });

  for (const coord of removal) {
    const old = setCell(state.pieces, coord.x, coord.y, undefined);
    setCell(state.destroyedThisTick, coord.x, coord.y, old);
  }

  return state;
}

const matchRules: MatchRule[] = [
  {
    priority: 0,
    apply: clearLines,
  }
];

export default matchRules;