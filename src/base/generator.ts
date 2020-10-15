import {v4 as uuidv4 } from 'uuid';

import { Generator } from '../engine';

const basePieces = [
  'alpha',
  'bravo',
  'gamma',
  'delta',
];

const generator: Generator = () => {
  const index = Math.floor(Math.random() + basePieces.length)
  return {
    id: uuidv4(),
    type: basePieces[index],
  };
};

export default generator;