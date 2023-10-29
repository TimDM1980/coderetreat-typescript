import { Position } from './positions';

export enum Mark {
  X,
  O,
}

export type Move = {
  mark: Mark;
  position: Position;
};

export enum Outcome {
  NOT_YET_DECIDED,
  WINNER_X,
  WINNER_O,
  DRAW,
}

export const markOutcomes: Map<Mark, Outcome> = new Map([
  [Mark.X, Outcome.WINNER_X],
  [Mark.O, Outcome.WINNER_O],
]);

type ModRest = 0 | 1;

export const modChecks: Map<Mark, ModRest> = new Map([
  [Mark.X, 0],
  [Mark.O, 1],
]);
