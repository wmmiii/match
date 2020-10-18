import { Objective, ObjectiveStatus } from "../engine";

export function scoreAtLeast(target: number): Objective {
  return {
    description: `Get at least ${target} points`,
    status: (state) => {
      if (state.totalScore >= target) {
        return ObjectiveStatus.SUCCEEDED;
      } else {
        return ObjectiveStatus.PENDING;
      }
    }
  };
}

export function scoreAtMost(target: number): Objective {
  return {
    description: `Get at most ${target} points`,
    status: (state) => {
      if (state.totalScore > target) {
        return ObjectiveStatus.FAILED;
      } else if (state.totalMoves === state.moveCount) {
        return ObjectiveStatus.SUCCEEDED;
      } else {
        return ObjectiveStatus.PENDING;
      }
    }
  };
}