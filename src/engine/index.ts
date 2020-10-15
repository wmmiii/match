import { forEachCell, getCell, Piece, setCell, State, Grid } from "./state"
import { Coordinate } from "./util";

export default class Engine {
  private currentState: State;
  private generator: Generator;

  private allowedMoves: Move[];
  private rules: Rule[];

  constructor(initialState: State,
      generator: Generator,
      allowedMoves: Move[],
      rules: Rule[]) {
    this.currentState = initialState;
    this.generator = generator;
    this.allowedMoves = allowedMoves;
    this.rules = rules.sort((a, b) => a.priority - b.priority);
  }

  get state(): State {
    // Never return the actual state, return a copy.
    return JSON.parse(JSON.stringify(this.currentState));
  }

  initialize(): void {
    console.time();
    while (!this.currentState.settled) {
      this.tick();
    }
    this.currentState.score = 0;
    console.timeEnd();
  }

  /**
   * Performs a move and sets the board into a new state does not perform
   * scoring yet. Returns a boolean indicating if the rule is legal.
   */
  move(start: Coordinate, end: Coordinate): boolean {
    if (this.currentState.settled === true
        && this.allowedMoves.some((f) => f(start, end, this.currentState))) {
      // If the move is legal swap the pieces.
      const temp = this.currentState.pieces[start.x][start.y];
      this.currentState.pieces[start.x][start.y] = this.currentState.pieces[end.x][end.y];
      this.currentState.pieces[start.x][start.y] = temp;
      this.currentState.settled = false;
      return true;
    } else {
      return false;
    }
  }
  
  /**
   * If the current state is not yet settled then tick will result in a new
   * state.
   */
  tick(): State {
    const previousState = this.state;
    const before = JSON.stringify(previousState);
    let state = this.state;
    let settled = true;

    // Make list of falling cells.
    const falling: Grid<true> = {};
    forEachCell(state.board, (x, y) => {
      if (getCell(state.pieces, x, y) == null) {
        while (getCell(state.board, x, y) != null) {
          setCell(falling, x, y, true);
          y -= 1;
        }
      }
    });

    // Move falling cells down.
    forEachCell(falling, (x, y) => {
      if (getCell(state.board, x, y - 1) != null) { // There is a cell above
        setCell(state.pieces, x, y, getCell(previousState.pieces, x, y - 1));
      } else {
        setCell(state.pieces, x, y, this.generator({x, y}));
      }
      settled = false;
    });

    // Apply rules.
    if (settled) {
      this.rules.forEach((rule) => {
        const before = JSON.stringify(state);
        state = rule.apply(state);
        if (before !== JSON.stringify(state)) {
        }
      });
    }

    state.settled = JSON.stringify(state) === before;
    this.currentState = state;
    return Object.assign({}, this.currentState);
  }
}

export type Move = (start: Coordinate, end: Coordinate, state: State) => boolean;

export interface Rule {
  priority: number,
  apply: (start: State) => State,
};

export type Generator = (coord: Coordinate) => Piece;
