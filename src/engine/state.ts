export interface State {
  readonly board: Grid<true>;
  score: number;
  pieces: Grid<Piece>;
  settled: boolean;
}

type PieceType = string;

export interface Piece {
  readonly id: string;
  readonly type: PieceType;
}

export function getCell<T>(grid: Grid<T>, x: number, y: number): T | undefined {
  const column = grid[x];
  if (column != null) {
    return column[y];
  } else {
    return undefined;
  }
}

export function setCell<T>(grid: Grid<T>, x: number, y: number, object: T): void {
  let column = grid[x];
  if (column == null) {
    grid[x] = {};
    column = grid[x];
  }

  column[y] = object;
}

export function forEachCell<T>(grid: Grid<T>, action: (x: number, y: number, object: T) => void) {
  for (let x in grid) {
    const column = grid[x];
    for (let y in column) {
      const object = column[y];
      if (object != null) {
        action(parseInt(x), parseInt(y), object);
      }
    }
  }
}

export type Grid<T> = {[x: number]: {[y: number]: T}};