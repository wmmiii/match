export interface State {
  destroyedLastTick: Grid<Piece>;
  destroyedThisTick: Grid<Piece>;
  moveCount: number;
  multiplier: number;
  pieces: Grid<Piece>;
  readonly board: Grid<true>;
  readonly gameStart: Date;
  readonly totalMoves: number;
  score: number;
  settled: boolean;
  totalScore: number;
  status: GameStatus;
}

export interface ImmutableState extends State {
  readonly destroyedLastTick: ImmutableGrid<Piece>;
  readonly moveCount: number;
  readonly settled: boolean;
  readonly totalScore: number;
  readonly status: GameStatus;
}

export interface GameDescription {
  readonly board: Grid<true>;
  readonly totalMoves: number;
  readonly pieces: Grid<Piece>;
}

export enum GameStatus {
  IN_PROGRESS,
  SUCCEEDED,
  FAILED,
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