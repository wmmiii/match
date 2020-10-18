import { forEachCell, getCell, Piece, setCell, State, Grid, swap, ImmutableState, GameStatus, GameDescription } from "./state"
import { Coordinate } from "./util";

export enum ObjectiveStatus {
  PENDING,
  SUCCEEDED,
  FAILED,
}

export default class Engine {
  private currentState: State;
  private generator: Generator;

  private allowedMoves: Move[];
  private matchRules: MatchRule[];
  private gameObjectives: Objective[];

  constructor(description: GameDescription,
      generator: Generator,
      allowedMoves: Move[],
      matchRules: MatchRule[],
      objectives: Objective[]) {
    this.currentState = {
      destroyedLastTick: [],
      destroyedThisTick: [],
      moveCount: 0,
      multiplier: 0,
      pieces: description.pieces,
      board: description.board,
      gameStart: new Date(),
      totalMoves: description.totalMoves,
      score: 0,
      settled: false,
      totalScore: 0,
      status: GameStatus.IN_PROGRESS,
    };
    this.generator = generator;
    this.allowedMoves = allowedMoves;
    this.matchRules = matchRules.sort((a, b) => b.priority - a.priority);
    this.gameObjectives = objectives;
  }

  get state(): ImmutableState {
    // Never return the actual state, return a copy.
    return JSON.parse(JSON.stringify(this.currentState));
  }

  get objectives(): ObjectiveDescription[] {
    return this.gameObjectives.map(o => {
      return {
        description: o.description,
        status: o.status(this.state),
      };
    })
  }

  initialize(): void {
    console.time();
    while (!this.currentState.settled) {
      this.tick();
    }
    this.currentState.totalScore = 0;
    this.currentState.score = 0;
    this.currentState.multiplier = 0;
    this.currentState.destroyedThisTick = [];
    console.timeEnd();
  }

  /**
   * Performs a move and sets the board into a new state does not perform
   * scoring yet. Returns a boolean indicating if the rule is legal.
   */
  move(start: Coordinate, end: Coordinate): boolean {
    if (this.currentState.status !== GameStatus.IN_PROGRESS) {
      return false;
    }

    if (this.currentState.settled === true
        && this.allowedMoves.some((f) => f(start, end, this.currentState))) {
      // If the move is legal swap the pieces.
      swap(this.currentState.pieces, start.x, start.y, end.x, end.y);
      this.currentState.settled = false;
      this.currentState.moveCount++;
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
    (state as State).destroyedLastTick = state.destroyedThisTick;
    state.destroyedThisTick = [];


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

    // Apply match rules.
    if (settled) {
      this.matchRules.forEach((rule) => {
        state = rule.apply(state);
      });
    }

    (state as State).settled = JSON.stringify(state) === before;

    // Check objectives.
    if (this.gameObjectives.some(o => o.status(state) === ObjectiveStatus.FAILED)) {
      (state as State).status = GameStatus.FAILED;
    }

    if (state.settled) {
      // If the system is settled cash the points.
      (state as State).totalScore += state.score * state.multiplier;
      state.score = 0;
      state.multiplier = 0;

      // Check to see if we're out of moves.
      if (state.moveCount === state.totalMoves) {
        if (this.gameObjectives.some(o => o.status(state) !== ObjectiveStatus.SUCCEEDED)) {
          (state as State).status = GameStatus.FAILED;
        } else {
          (state as State).status = GameStatus.SUCCEEDED;
        }
      }
    }

    this.currentState = state;
    return Object.assign({}, this.currentState);
  }
}

export type Move = (start: Coordinate, end: Coordinate, state: State) => boolean;

export interface MatchRule {
  priority: number,
  apply: (start: State) => State,
};

export type Generator = (coord: Coordinate) => Piece;

export interface Objective {
  description: string;
  status: (state: State) => ObjectiveStatus;
}

export interface ObjectiveDescription {
  readonly description: string;
  readonly status: ObjectiveStatus;
}
