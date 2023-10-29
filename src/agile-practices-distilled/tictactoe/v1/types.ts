export enum Mark {
  X,
  O,
}

export enum Position {
  TOP_LEFT,
  TOP_MIDDLE,
  TOP_RIGHT,
  MIDDLE_LEFT,
  MIDDLE_MIDDLE,
  MIDDLE_RIGHT,
  BOTTOM_LEFT,
  BOTTOM_MIDDLE,
  BOTTOM_RIGHT,
}

export const positions: Map<Position, { x: number; y: number }> = new Map([
  [Position.TOP_LEFT, { x: 0, y: 0 }],
  [Position.TOP_MIDDLE, { x: 0, y: 1 }],
  [Position.TOP_RIGHT, { x: 0, y: 2 }],
  [Position.MIDDLE_LEFT, { x: 1, y: 0 }],
  [Position.MIDDLE_MIDDLE, { x: 1, y: 1 }],
  [Position.MIDDLE_RIGHT, { x: 1, y: 2 }],
  [Position.BOTTOM_LEFT, { x: 2, y: 0 }],
  [Position.BOTTOM_MIDDLE, { x: 2, y: 1 }],
  [Position.BOTTOM_RIGHT, { x: 2, y: 2 }],
]);

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
