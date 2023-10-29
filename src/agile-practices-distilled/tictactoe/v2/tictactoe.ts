import { Mark, markOutcomes, Outcome } from './types';
import { Position } from './positions';
import { Grid } from './grid';
import { OutcomeService } from './outcome-service';

export class TicTacToe {
  // TODO OBJECT CALISTHENICS - no classes with more than 2 instance variables
  private grid: Grid;
  private outcomeService: OutcomeService;
  private outcome: Outcome;

  constructor() {
    this.grid = new Grid();
    this.outcomeService = new OutcomeService();
    this.outcome = Outcome.NOT_YET_DECIDED;
  }

  public makeMove(mark: Mark, position: Position): void {
    this.validateGameNotYetDecided(this.outcome);
    this.grid.makeMove({ mark, position });
    this.outcome = this.outcomeService.determineOutcome(this.grid);
  }

  private validateGameNotYetDecided(outcome: Outcome) {
    if (outcome !== Outcome.NOT_YET_DECIDED) {
      throw Error('Cant make a move, game is already over!');
    }
  }

  // TODO OBJECT CALISTHENICS - no getters
  getOutcome(): Outcome {
    return this.outcome;
  }
}
