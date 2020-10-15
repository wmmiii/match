import PieceType from "../engine/pieceType";

const pieceTypes: {[key: string]: PieceType} = {
  'alpha': {
    type: 'alpha',
    icon: 'alpha',
    baseColor: '#0066FF',
  },
  'beta': {
    type: 'beta',
    icon: 'beta',
    baseColor: '#FFB800',
  },
  'gamma': {
    type: 'gamma',
    icon: 'gamma',
    baseColor: '#EB00FF',
  },
  'delta': {
    type: 'delta',
    icon: 'delta',
    baseColor: '#00FFC2',
  },
};

export default pieceTypes;