import { Mark, modChecks, Move } from './types';
import { onGrid, Position } from './positions';

const TOTAL_POSITIONS_ON_GRID = 9;

// TODO OBJECT CALISTHENICS - keep all entities small - 50 lines per class
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

  makeMove(move: Move): void {
    this.validateMove(move);
    this.markGrid(move);
  }

  private validateMove(move: Move) {
    this.validateXStartsTheGame(move);
    this.validateAlternateTurns(move);
    this.validateMarkFreePosition(move);
  }

  private validateXStartsTheGame(move: Move) {
    if (move.mark !== Mark.X && this.countNumberOfMarksInGrid() === 0) {
      throw Error('X always goes first!');
    }
  }

  private validateAlternateTurns(move: Move) {
    if (!(this.countNumberOfMarksInGrid() % 2 === modChecks.get(move.mark)!)) {
      throw Error('Players alternate placing X and O on the board!');
    }
  }

  private validateMarkFreePosition(move: Move) {
    if (this.hasMark(move.position)) {
      throw Error('Players cannot play on a played position!');
    }
  }

  private markGrid(move: Move) {
    this.grid[onGrid(move.position).x][onGrid(move.position).y] = move.mark;
  }

  // TODO OBJECT CALISTHENICS - wrap primitives
  private countNumberOfMarksInGrid() {
    return this.grid.reduce((acc, currentRow) => acc + currentRow.reduce((acc) => acc + 1, 0), 0);
  }
}
