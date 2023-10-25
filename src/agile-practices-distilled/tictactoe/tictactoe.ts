import { Mark, markOutcomes, Move, Outcome, Position, positions } from './types';
import { validateGameNotYetDecided, validateMoves } from './game-validations';

export class TicTacToe {
  private moves: Move[];
  private grid: Mark[][];
  private outcome: Outcome;

  constructor() {
    this.moves = [];
    this.grid = [[], [], []];
    this.outcome = Outcome.NOT_YET_DECIDED;
  }

  public makeMove(mark: Mark, position: Position): void {
    validateGameNotYetDecided(this.outcome);
    validateMoves([...this.moves, { mark, position }]);

    this.addMove(mark, position);
    this.markGrid(mark, position);
    this.determineOutcome();
  }

  private addMove(mark: Mark, position: Position) {
    this.moves.push({ mark, position });
  }

  private markGrid(mark: Mark, position: Position) {
    this.grid[positions.get(position)?.x!][positions.get(position)?.y!] = mark;
  }

  private determineOutcome() {
    this.checkWinningRow(this.grid[0][0], this.grid[1][0], this.grid[2][0]);
    this.checkWinningRow(this.grid[0][1], this.grid[1][1], this.grid[2][1]);
    this.checkWinningRow(this.grid[0][2], this.grid[1][2], this.grid[2][2]);

    this.checkWinningRow(this.grid[0][0], this.grid[0][1], this.grid[0][2]);
    this.checkWinningRow(this.grid[1][0], this.grid[1][1], this.grid[1][2]);
    this.checkWinningRow(this.grid[2][0], this.grid[2][1], this.grid[2][2]);

    this.checkWinningRow(this.grid[0][0], this.grid[1][1], this.grid[2][2]);
    this.checkWinningRow(this.grid[0][2], this.grid[1][1], this.grid[2][0]);

    if (this.countNumberOfMarksInGrid() === 9) {
      this.outcome = Outcome.DRAW;
    }
  }

  private checkWinningRow(mark1: Mark, mark2: Mark, mark3: Mark) {
    if (mark1 !== undefined && mark1 === mark2 && mark2 === mark3) {
      this.outcome = markOutcomes.get(mark1)!;
    }
  }

  private countNumberOfMarksInGrid() {
    return this.grid.reduce((acc, currentRow) => acc + currentRow.reduce((acc) => acc + 1, 0), 0);
  }

  getOutcome(): Outcome {
    return this.outcome;
  }
}
