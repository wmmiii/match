import Engine from '../engine';
import { GameDescription, getCell, Piece } from '../engine/state';
import matchRules from './matchRules';
import moves from './moves';
import generator from './pieceGenerator';

test('T matches', () => {
  let count = 0;
  const piece = (): Piece => {
    return {
      id: count++ + '',
      type: 'foo',
    };
  }
  const gameDescription: GameDescription = {
    board: {
      0: { 0: true, 1: true, 2: true },
      1: { 1: true },
      2: { 1: true },
    },
    totalMoves: Infinity,
    pieces: {
      0: { 0: piece(), 1: piece(), 2: piece() },
      1: { 1: piece() },
      2: { 1: piece() },
    }
  };
  const engine = new Engine(gameDescription, generator, moves, matchRules, []);

  const before = engine.state;
  expect(getCell(before.pieces, 0, 0)).toBeDefined();
  expect(getCell(before.pieces, 0, 1)).toBeDefined();
  expect(getCell(before.pieces, 0, 2)).toBeDefined();
  expect(getCell(before.pieces, 1, 1)).toBeDefined();
  expect(getCell(before.pieces, 2, 1)).toBeDefined();


  const after = engine.tick();
  expect(getCell(after.pieces, 0, 0)).toBeUndefined();
  expect(getCell(after.pieces, 0, 1)).toBeUndefined();
  expect(getCell(after.pieces, 0, 2)).toBeUndefined();
  expect(getCell(after.pieces, 1, 1)).toBeUndefined();
  expect(getCell(after.pieces, 2, 1)).toBeUndefined();
});