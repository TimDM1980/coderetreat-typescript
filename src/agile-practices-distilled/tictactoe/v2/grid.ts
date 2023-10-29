import { Mark, Move } from './types';
import { onGrid, Position } from './positions';

const TOTAL_POSITIONS_ON_GRID = 9;

export class Grid {
  private readonly grid: Mark[][];

  constructor() {
    this.grid = [[], [], []];
  }

  // TODO OBJECT CALISTHENICS - wrap primitives
  hasMark(position: Position) {
    return this.getMarkAt(position) !== undefined;
  }

  // TODO OBJECT CALISTHENICS - wrap primitives
  hasSameMark(positions: Position[]) {
    const markToCheck = this.getMarkAt(positions[0]);
    return positions.map((position) => this.getMarkAt(position)).every((mark) => mark === markToCheck);
  }

  // TODO OBJECT CALISTHENICS - no getters
  getMarkAt(position: Position) {
    return this.grid[onGrid(position).x][onGrid(position).y];
  }

  // TODO OBJECT CALISTHENICS - wrap primitives
  isGridFull() {
    return this.countNumberOfMarksInGrid() === TOTAL_POSITIONS_ON_GRID;
  }

  // TODO OBJECT CALISTHENICS - wrap primitives
  countNumberOfMarksInGrid() {
    return this.grid.reduce((acc, currentRow) => acc + currentRow.reduce((acc) => acc + 1, 0), 0);
  }

  markGrid(move: Move) {
    this.grid[onGrid(move.position).x][onGrid(move.position).y] = move.mark;
  }
}
