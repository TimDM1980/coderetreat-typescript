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

export type GridPosition = { x: number; y: number };

export type GridPositionState = 'EMPTY' | 'FILLED';

export type NumberOfMarksInGrid = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export function onGrid(position: Position): GridPosition {
  return positions.get(position)!;
}

const positions: Map<Position, GridPosition> = new Map([
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
