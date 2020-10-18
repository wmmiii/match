import Engine from "../engine";
import { GameDescription } from "../engine/state";
import LevelPack from "../level/LevelPack";
import matchRules from "./matchRules";
import moves from "./moves";
import { scoreAtLeast, scoreAtMost } from "./objectives";
import generator from "./pieceGenerator";

const levelPack: LevelPack = {
  title: 'Base Level Pack',
  levels: [
    {
      title: 'Free Play',
      description: 'It just keeps going and going and going and...',
      generate: () => {
        const gameState: GameDescription = {
          board: {
            0: { 0: true, 1: true, 2: true, 3: true, 4: true, 5: true, 6: true},
            1: { 0: true, 1: true, 2: true, 3: true, 4: true, 5: true, 6: true},
            2: { 0: true, 1: true, 2: true, 3: true, 4: true, 5: true, 6: true},
            3: { 0: true, 1: true, 2: true, 3: true, 4: true, 5: true, 6: true},
            4: { 0: true, 1: true, 2: true, 3: true, 4: true, 5: true, 6: true},
            5: { 0: true, 1: true, 2: true, 3: true, 4: true, 5: true, 6: true},
            6: { 0: true, 1: true, 2: true, 3: true, 4: true, 5: true, 6: true},
          },
          pieces: {},
          totalMoves: Infinity,
        };

        return new Engine(gameState, generator, moves, matchRules, []);
      }
    },
    {
      title: 'Classic',
      description: '"Wait, how is there a classic mode if this game was just created?"',
      generate: () => {
        const gameState: GameDescription = {
          board: {
            0: { 0: true, 1: true, 2: true, 3: true, 4: true, 5: true, 6: true},
            1: { 0: true, 1: true, 2: true, 3: true, 4: true, 5: true, 6: true},
            2: { 0: true, 1: true, 2: true, 3: true, 4: true, 5: true, 6: true},
            3: { 0: true, 1: true, 2: true, 3: true, 4: true, 5: true, 6: true},
            4: { 0: true, 1: true, 2: true, 3: true, 4: true, 5: true, 6: true},
            5: { 0: true, 1: true, 2: true, 3: true, 4: true, 5: true, 6: true},
            6: { 0: true, 1: true, 2: true, 3: true, 4: true, 5: true, 6: true},
          },
          pieces: {},
          totalMoves: 20,
        };

        return new Engine(gameState, generator, moves, matchRules, [scoreAtLeast(50000)]);
      }
    },
    {
      title: 'Doughnut',
      description: 'Who doesn\'t love the holiest of foods?',
      generate: () => {
        const gameState: GameDescription = {
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
          pieces: {},
          totalMoves: 20,
        };

        return new Engine(gameState, generator, moves, matchRules, [scoreAtLeast(50000)]);
      }
    },
    {
      title: 'Doughnut Hole',
      description: 'We\'re not going to waste any dough.',
      generate: () => {
        const gameState: GameDescription = {
          board: {
            0: { 1: true, 2: true, 3: true },
            1: { 0: true, 1: true, 2: true, 3: true, 4: true },
            2: { 0: true, 1: true, 2: true, 3: true, 4: true },
            3: { 0: true, 1: true, 2: true, 3: true, 4: true },
            4: { 1: true, 2: true, 3: true },
          },
          pieces: {},
          totalMoves: 20,
        };

        const objectives = [
          scoreAtLeast(1000),
          scoreAtMost(2000),
        ];

        return new Engine(gameState, generator, moves, matchRules, objectives);
      }
    }
  ]
};

export default levelPack;