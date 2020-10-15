export interface State {
  readonly board: Grid<true>;
  totalScore: number;
  multiplier: number;
  score: number;
  pieces: Grid<Piece>;
  destroyedThisTick: Grid<Piece>;
  destroyedLastTick: Grid<Piece>;
  settled: boolean;
}

export interface ImmutableState extends State {
  readonly totalScore: number;
  readonly destroyedLastTick: ImmutableGrid<Piece>;
  readonly settled: boolean;
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

export function setCell<T>(grid: Grid<T>, x: number, y: number, object: T): T | undefined {
  let column = grid[x];
  if (column == null) {
    grid[x] = {};
    column = grid[x];
  }

  const old = column[y];
  column[y] = object;
  return old;
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

export function swap<T>(grid: Grid<T>, x1: number, y1: number, x2: number, y2: number): void {
  const temp = getCell(grid, x1, y1);
  setCell(grid, x1, y1, getCell(grid, x2, y2));
  setCell(grid, x2, y2, temp);
}

export type Grid<T> = {[x: number]: {[y: number]: T}};
export type ImmutableGrid<T> = {readonly [x: number]: {readonly [y: number]: T}};