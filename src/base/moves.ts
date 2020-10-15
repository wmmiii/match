import { Move } from "../engine";
import { getCell } from "../engine/state";

const moves: Move[] = [
  (start, end, state) => {
    // Must be adjacent.
    if (Math.abs(start.x - end.x) + Math.abs(start.y - end.y) !== 1) {
      return false;
    }
    // Both cells must be filled
    return getCell(state.pieces, start.x, start.y) != null
        && getCell(state.pieces, end.x, end.y) != null;
  }
]

export default moves;