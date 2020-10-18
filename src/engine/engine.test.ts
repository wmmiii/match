import Engine from '../engine';
import { getCell, setCell } from './state';

test('pieces fall', () => {
  let pieceCount = 2;
  const engine = new Engine({
    board: {
      0: {
        0: true,
        1: true,
        2: true,
        3: true,
      },
    },
    pieces: {
      0: {
        0: {
          id: '2',
          type: 'foo'
        },
        1: {
          id: '3',
          type: 'foo'
        }
      },
    },
    totalMoves: Infinity,
  },
  () => {
    return {
      id: `${--pieceCount}`,
      type: 'foo',
    }
  },
  [],
  [],
  []);

  const firstState = engine.tick();
  expect(getCell(firstState.pieces, 0, 0)).toHaveProperty('id', "1");
  expect(getCell(firstState.pieces, 0, 1)).toHaveProperty('id', "2");
  expect(getCell(firstState.pieces, 0, 2)).toHaveProperty('id', "3");
  expect(getCell(firstState.pieces, 0, 3)).toBeUndefined();
  expect(firstState.settled).toBeFalsy();

  const secondState = engine.tick();
  expect(getCell(secondState.pieces, 0, 0)).toHaveProperty('id', "0");
  expect(getCell(secondState.pieces, 0, 1)).toHaveProperty('id', "1");
  expect(getCell(secondState.pieces, 0, 2)).toHaveProperty('id', "2");
  expect(getCell(secondState.pieces, 0, 3)).toHaveProperty('id', "3");
  expect(secondState.settled).toBeFalsy();

  const thirdState = engine.tick();
  expect(getCell(thirdState.pieces, 0, 0)).toHaveProperty('id', "0");
  expect(getCell(thirdState.pieces, 0, 1)).toHaveProperty('id', "1");
  expect(getCell(thirdState.pieces, 0, 2)).toHaveProperty('id', "2");
  expect(getCell(thirdState.pieces, 0, 3)).toHaveProperty('id', "3");
  expect(thirdState.settled).toBeTruthy();
});

test('rules are applied only once pieces are settled', () => {
  let pieceCount = 3;
  const engine = new Engine({
    board: {
      0: {
        0: true,
        1: true,
        2: true,
        3: true,
      },
    },
    pieces: {
      0: {
        0: {
          id: '0',
          type: 'foo'
        },
        1: {
          id: '1',
          type: 'foo'
        },
        2: {
          id: '2',
          type: 'foo'
        },
        3: {
          id: '3',
          type: 'foo'
        }
      },
    },
    totalMoves: Infinity,
  },
  () => {
    return {
      id: `${++pieceCount}`,
      type: 'bar',
    }
  },
  [],
  [{
    priority: 0,
    apply: (state) => {
      const bottom = getCell(state.pieces, 0, 3);
      if (bottom == null || bottom.type !== 'bar') {
        state.score++;
        state.multiplier = 1;
        setCell(state.pieces, 0, 0, undefined);
        setCell(state.pieces, 0, 1, undefined);
        setCell(state.pieces, 0, 2, undefined);
        setCell(state.pieces, 0, 3, undefined);
      }
      return state;
    },
  }],
  []);

  while (!engine.state.settled) {
    engine.tick();
  }

  expect(engine.state.totalScore).toBe(1);
  expect(engine.state.score).toBe(0);
  expect(engine.state.multiplier).toBe(0);
});