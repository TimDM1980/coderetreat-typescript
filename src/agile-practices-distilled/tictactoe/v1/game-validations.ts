import { Mark, Move, Outcome, Position } from './types';

export function validateGameNotYetDecided(outcome: Outcome) {
  if (outcome !== Outcome.NOT_YET_DECIDED) {
    throw Error('Cant make a move, game is already over!');
  }
}

export function validateMoves(moves: Move[]) {
  if (moves[0].mark !== Mark.X) {
    throw Error('X always goes first!');
  }

  if (!validateMark(moves, evenOrOdds.even) || !validateMark(moves, evenOrOdds.odd)) {
    throw Error('Players alternate placing X and O on the board!');
  }

  if (countUniquePositions(moves) !== moves.length) {
    throw Error('Players cannot play on a played position!');
  }
}

type EvenOrOddInfo = { validMark: Mark; modCheck: number };
type EvenOrOdd = Record<'even' | 'odd', EvenOrOddInfo>;
const evenOrOdds: EvenOrOdd = {
  even: { validMark: Mark.X, modCheck: 0 },
  odd: { validMark: Mark.O, modCheck: 1 },
};

function validateMark(moves: Move[], evenOrOdd: EvenOrOddInfo) {
  return moves
    .filter((_move, index) => index % 2 === evenOrOdd.modCheck)
    .every((move) => move.mark === evenOrOdd.validMark);
}

function countUniquePositions(moves: Move[]) {
  return moves.reduce(
    (uniquePositions: Position[], move: Move) =>
      uniquePositions.includes(move.position) ? uniquePositions : [...uniquePositions, move.position],
    [],
  ).length;
}
