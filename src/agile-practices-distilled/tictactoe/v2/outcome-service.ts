import { markOutcomes, Outcome } from './types';
import { Position } from './positions';
import { Grid } from './grid';

export class OutcomeService {
  determineOutcome(grid: Grid): Outcome {
    return (
      this.determineWinnerInVerticalRows(grid) ??
      this.determineWinnerInHorizontalRows(grid) ??
      this.determineWinnerInDiagonalRows(grid) ??
      this.determineDraw(grid) ??
      Outcome.NOT_YET_DECIDED
    );
  }

  private determineWinnerInVerticalRows(grid: Grid) {
    return (
      this.determineWinnerInRow(grid, [Position.TOP_LEFT, Position.MIDDLE_LEFT, Position.BOTTOM_LEFT]) ??
      this.determineWinnerInRow(grid, [Position.TOP_MIDDLE, Position.MIDDLE_MIDDLE, Position.BOTTOM_MIDDLE]) ??
      this.determineWinnerInRow(grid, [Position.TOP_RIGHT, Position.MIDDLE_RIGHT, Position.BOTTOM_RIGHT])
    );
  }

  private determineWinnerInHorizontalRows(grid: Grid) {
    return (
      this.determineWinnerInRow(grid, [Position.TOP_LEFT, Position.TOP_MIDDLE, Position.TOP_RIGHT]) ??
      this.determineWinnerInRow(grid, [Position.MIDDLE_LEFT, Position.MIDDLE_MIDDLE, Position.MIDDLE_RIGHT]) ??
      this.determineWinnerInRow(grid, [Position.BOTTOM_LEFT, Position.BOTTOM_MIDDLE, Position.BOTTOM_RIGHT])
    );
  }

  private determineWinnerInDiagonalRows(grid: Grid) {
    return (
      this.determineWinnerInRow(grid, [Position.TOP_LEFT, Position.MIDDLE_MIDDLE, Position.BOTTOM_RIGHT]) ??
      this.determineWinnerInRow(grid, [Position.TOP_RIGHT, Position.MIDDLE_MIDDLE, Position.BOTTOM_LEFT])
    );
  }

  private determineDraw(grid: Grid) {
    if (grid.gridFillState() === 'FULL') {
      return Outcome.DRAW;
    }
  }

  private determineWinnerInRow(grid: Grid, positions: Position[]) {
    if (grid.hasSameMark(positions) === 'SAME') {
      return markOutcomes.get(grid.markAt(positions[0]));
    }
  }
}
