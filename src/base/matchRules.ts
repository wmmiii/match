import { MatchRule } from '../engine';
import { forEachCell, getCell, setCell, State } from '../engine/state';
import { Coordinate } from '../engine/util';

function clearLines(state: State): State {
  const pieces = state.pieces;
  const horizontalRemoval: Coordinate[] = [];
  const verticalRemoval: Coordinate[] = [];
  forEachCell(pieces, (x, y, piece) => {
    if (getCell(pieces, x, y) == null) {
      return;
    }

    if (!horizontalRemoval.some(c => c.x === x && c.y === y)) {
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
        horizontalRemoval.push(...horizontal);
      }
    }

    if (!verticalRemoval.some(c => c.x === x && c.y === y)) {
      const curr: Coordinate = { x: x, y: y };
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
        verticalRemoval.push(...vertical);
      }
    }
  });

  for (const coord of horizontalRemoval) {
    const old = setCell(state.pieces, coord.x, coord.y, undefined);
    setCell(state.destroyedThisTick, coord.x, coord.y, old);
  }

  for (const coord of verticalRemoval) {
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