import { Mark, modChecks, Move, Position, positions } from './types';

const TOTAL_POSITIONS_ON_GRID = 9;

export class Grid {
  private grid: Mark[][];

  constructor() {
    this.grid = [[], [], []];
  }

  getMarkAt(position: Position) {
    return this.grid[positions.get(position)?.x!][positions.get(position)?.y!];
  }

  isGridFull() {
    return this.countNumberOfMarksInGrid() === TOTAL_POSITIONS_ON_GRID;
  }

  makeMove(move: Move): void {
    this.validateMove(this.grid, move);
    this.markGrid(move);
  }

  private validateMove(grid: Mark[][], move: Move) {
    this.validateXStartsTheGame(move);
    this.validateAlternateTurns(grid, move);
    this.validateMarkFreePosition(move);
  }

  private validateXStartsTheGame(move: Move) {
    if (move.mark !== Mark.X && this.countNumberOfMarksInGrid() === 0) {
      throw Error('X always goes first!');
    }
  }

  private validateAlternateTurns(grid: Mark[][], move: Move) {
    if (!(this.countNumberOfMarksInGrid() % 2 === modChecks.get(move.mark)!)) {
      throw Error('Players alternate placing X and O on the board!');
    }
  }

  private validateMarkFreePosition(move: Move) {
    if (this.getMarkAt(move.position) !== undefined) {
      throw Error('Players cannot play on a played position!');
    }
  }

  private markGrid(move: Move) {
    this.grid[positions.get(move.position)?.x!][positions.get(move.position)?.y!] = move.mark;
  }

  private countNumberOfMarksInGrid() {
    return this.grid.reduce((acc, currentRow) => acc + currentRow.reduce((acc) => acc + 1, 0), 0);
  }

}
