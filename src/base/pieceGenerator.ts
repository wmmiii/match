import {v4 as uuidv4 } from 'uuid';
import SeedRandom from 'seed-random';

import { Generator as PieceGenerator } from '../engine';
import pieceTypes from './pieceTypes';

const basePieces = Object.keys(pieceTypes);

const generator: PieceGenerator = seededGenerator();

export function seededGenerator(seed?: string): PieceGenerator {
  const rng = SeedRandom(seed);
  return () => {
    const index = Math.floor(rng() * basePieces.length);
    return {
      id: uuidv4(),
      type: basePieces[index],
    };
  }
}

export default generator;