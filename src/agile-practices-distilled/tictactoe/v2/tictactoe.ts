import { Mark, markOutcomes, Outcome } from './types';
import { Position } from './positions';
import { Grid } from './grid';

export class TicTacToe {
  private grid: Grid;
  private outcome: Outcome;

  constructor() {
    this.grid = new Grid();
    this.outcome = Outcome.NOT_YET_DECIDED;
  }

  public makeMove(mark: Mark, position: Position): void {
    this.validateGameNotYetDecided(this.outcome);
    this.grid.makeMove({ mark, position });
    this.determineOutcome();
  }

  private validateGameNotYetDecided(outcome: Outcome) {
    if (outcome !== Outcome.NOT_YET_DECIDED) {
      throw Error('Cant make a move, game is already over!');
    }
  }

  private determineOutcome() {
    this.checkWinningRow(Position.TOP_LEFT, Position.MIDDLE_LEFT, Position.BOTTOM_LEFT);
    this.checkWinningRow(Position.TOP_MIDDLE, Position.MIDDLE_MIDDLE, Position.BOTTOM_MIDDLE);
    this.checkWinningRow(Position.TOP_RIGHT, Position.MIDDLE_RIGHT, Position.BOTTOM_RIGHT);

    this.checkWinningRow(Position.TOP_LEFT, Position.TOP_MIDDLE, Position.TOP_RIGHT);
    this.checkWinningRow(Position.MIDDLE_LEFT, Position.MIDDLE_MIDDLE, Position.MIDDLE_RIGHT);
    this.checkWinningRow(Position.BOTTOM_LEFT, Position.BOTTOM_MIDDLE, Position.BOTTOM_RIGHT);

    this.checkWinningRow(Position.TOP_LEFT, Position.MIDDLE_MIDDLE, Position.BOTTOM_RIGHT);
    this.checkWinningRow(Position.TOP_RIGHT, Position.MIDDLE_MIDDLE, Position.BOTTOM_LEFT);

    if (Outcome.NOT_YET_DECIDED === this.outcome && this.grid.isGridFull()) {
      this.outcome = Outcome.DRAW;
    }
  }

  private checkWinningRow(position1: Position, position2: Position, position3: Position) {
    const mark1 = this.grid.getMarkAt(position1);
    const mark2 = this.grid.getMarkAt(position2);
    const mark3 = this.grid.getMarkAt(position3);
    if (mark1 !== undefined && mark1 === mark2 && mark2 === mark3) {
      this.outcome = markOutcomes.get(mark1)!;
    }
  }

  // TODO OBJECT CALISTHENICS - no getters
  getOutcome(): Outcome {
    return this.outcome;
  }
}
