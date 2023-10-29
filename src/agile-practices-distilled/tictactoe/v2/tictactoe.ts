import { Mark, modChecks, Move, Outcome } from './types';
import { Position } from './positions';
import { Grid } from './grid';
import { OutcomeService } from './outcome-service';

export class TicTacToe {
  private readonly grid: Grid;
  private readonly outcomeService: OutcomeService;

  constructor() {
    this.grid = new Grid();
    this.outcomeService = new OutcomeService();
  }

  public makeMove(mark: Mark, position: Position): void {
    this.validateGameNotYetDecided();
    this.validateMove({ mark, position });
    this.grid.markGrid({ mark, position });
  }

  private validateGameNotYetDecided() {
    if (this.calculateOutcome() !== Outcome.NOT_YET_DECIDED) {
      throw Error('Cant make a move, game is already over!');
    }
  }

  private validateMove(move: Move) {
    this.validateXStartsTheGame(move);
    this.validateAlternateTurns(move);
    this.validateMarkFreePosition(move);
  }

  private validateXStartsTheGame(move: Move) {
    if (move.mark !== Mark.X && this.grid.gridFillState() === 'EMPTY') {
      throw Error('X always goes first!');
    }
  }

  private validateAlternateTurns(move: Move) {
    if (!(this.grid.countNumberOfMarksInGrid() % 2 === modChecks.get(move.mark)!)) {
      throw Error('Players alternate placing X and O on the board!');
    }
  }

  private validateMarkFreePosition(move: Move) {
    if (this.grid.stateAt(move.position) === 'FILLED') {
      throw Error('Players cannot play on a played position!');
    }
  }

  calculateOutcome(): Outcome {
    return this.outcomeService.determineOutcome(this.grid);
  }
}
