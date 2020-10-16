import Engine from "../engine";
import { State } from "../engine/state";
import LevelPack from "../level/LevelPack";
import matchRules from "./matchRules";
import moves from "./moves";
import generator from "./pieceGenerator";

const levelPack: LevelPack = {
  title: 'Base Level Pack',
  levels: [
    {
      title: 'Classic',
      description: '"Wait, how is there a classic mode if this game was just created?"',
      generate: () => {
        const gameState: State = {
          board: {
            0: { 0: true, 1: true, 2: true, 3: true, 4: true, 5: true, 6: true},
            1: { 0: true, 1: true, 2: true, 3: true, 4: true, 5: true, 6: true},
            2: { 0: true, 1: true, 2: true, 3: true, 4: true, 5: true, 6: true},
            3: { 0: true, 1: true, 2: true, 3: true, 4: true, 5: true, 6: true},
            4: { 0: true, 1: true, 2: true, 3: true, 4: true, 5: true, 6: true},
            5: { 0: true, 1: true, 2: true, 3: true, 4: true, 5: true, 6: true},
            6: { 0: true, 1: true, 2: true, 3: true, 4: true, 5: true, 6: true},
          },
          totalScore: 0,
          score: 0,
          multiplier: 0,
          pieces: [],
          destroyedThisTick: [],
          destroyedLastTick: [],
          settled: false,
        };

        return new Engine(gameState, generator, moves, matchRules);
      }
    },
    {
      title: 'Doughnut',
      description: 'Who doesn\'t love the holiest of foods?',
      generate: () => {
        const gameState: State = {
          board: {
            0: { 2: true, 3: true, 4: true, 5: true, 6: true },
            1: { 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true },
            2: { 0: true, 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true },
            3: { 0: true, 1: true, 2: true, 6: true, 7: true, 8: true },
            4: { 0: true, 1: true, 2: true, 6: true, 7: true, 8: true },
            5: { 0: true, 1: true, 2: true, 6: true, 7: true, 8: true },
            6: { 0: true, 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true },
            7: { 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true },
            8: { 2: true, 3: true, 4: true, 5: true, 6: true },
          },
          totalScore: 0,
          score: 0,
          multiplier: 0,
          pieces: [],
          destroyedThisTick: [],
          destroyedLastTick: [],
          settled: false,
        };

        return new Engine(gameState, generator, moves, matchRules);
      }
    },
    {
      title: 'Doughnut Hole',
      description: 'We\'re not going to waste any dough.',
      generate: () => {
        const gameState: State = {
          board: {
            0: { 1: true, 2: true, 3: true },
            1: { 0: true, 1: true, 2: true, 3: true, 4: true },
            2: { 0: true, 1: true, 2: true, 3: true, 4: true },
            3: { 0: true, 1: true, 2: true, 3: true, 4: true },
            4: { 1: true, 2: true, 3: true },
          },
          totalScore: 0,
          score: 0,
          multiplier: 0,
          pieces: [],
          destroyedThisTick: [],
          destroyedLastTick: [],
          settled: false,
        };

        return new Engine(gameState, generator, moves, matchRules);
      }
    }
  ]
};

export default levelPack;