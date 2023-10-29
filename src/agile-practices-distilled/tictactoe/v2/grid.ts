import { Mark, Move } from './types';
import { GridPositionState, NumberOfMarksInGrid, onGrid, Position } from './positions';

const TOTAL_POSITIONS_ON_GRID = 9;

export class Grid {
  private readonly grid: Mark[][];

  constructor() {
    this.grid = [[], [], []];
  }

  stateAt(position: Position): GridPositionState {
    return this.markAt(position) !== undefined ? 'FILLED' : 'EMPTY';
  }

  hasSameMark(positions: Position[]): 'SAME' | 'NOT_SAME' {
    if (this.stateAt(positions[0]) === 'EMPTY') {
      return 'NOT_SAME';
    }

    const markToCheck = this.markAt(positions[0]);
    return positions.map((position) => this.markAt(position)).every((mark) => mark === markToCheck)
      ? 'SAME'
      : 'NOT_SAME';
  }

  markAt(position: Position) {
    return this.grid[onGrid(position).x][onGrid(position).y];
  }

  gridFillState(): 'EMPTY' | 'FULL' | 'OTHER' {
    if (this.countNumberOfMarksInGrid() === 0) {
      return 'EMPTY';
    }
    if (this.countNumberOfMarksInGrid() === TOTAL_POSITIONS_ON_GRID) {
      return 'FULL';
    }
    return 'OTHER';
  }

  countNumberOfMarksInGrid(): NumberOfMarksInGrid {
    return this.grid.reduce(
      (acc, currentRow) => acc + currentRow.reduce((acc) => acc + 1, 0),
      0,
    ) as unknown as NumberOfMarksInGrid;
  }

  markGrid(move: Move) {
    this.grid[onGrid(move.position).x][onGrid(move.position).y] = move.mark;
  }
}
