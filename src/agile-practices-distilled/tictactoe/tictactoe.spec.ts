import { Mark, Outcome } from './v2/types';
import { Position } from './v2/positions';
import { TicTacToe } from './v2/tictactoe';

describe('tictactoe', () => {
  describe('Validations', () => {
    it('X always goes first', () => {
      const ticTacToe = new TicTacToe();

      expect(() => ticTacToe.makeMove(Mark.O, Position.TOP_LEFT)).toThrowError('X always goes first!');
    });

    it('Players alternate placing X and O on the board', () => {
      const ticTacToe = new TicTacToe();

      expect(() => {
        ticTacToe.makeMove(Mark.X, Position.TOP_LEFT);
        ticTacToe.makeMove(Mark.O, Position.TOP_MIDDLE);
        ticTacToe.makeMove(Mark.X, Position.TOP_RIGHT);
        ticTacToe.makeMove(Mark.O, Position.MIDDLE_LEFT);
      }).not.toThrowError();

      expect(() => ticTacToe.makeMove(Mark.O, Position.MIDDLE_MIDDLE)).toThrowError(
        'Players alternate placing X and O on the board!',
      );

      expect(() => {
        ticTacToe.makeMove(Mark.X, Position.MIDDLE_MIDDLE);
        ticTacToe.makeMove(Mark.X, Position.MIDDLE_RIGHT);
      }).toThrowError('Players alternate placing X and O on the board!');
    });

    it('Players cannot play on a played position', () => {
      const ticTacToe = new TicTacToe();
      ticTacToe.makeMove(Mark.X, Position.TOP_LEFT);

      expect(() => ticTacToe.makeMove(Mark.O, Position.TOP_LEFT)).toThrowError(
        'Players cannot play on a played position!',
      );
    });

    it('Cant make a move when game is already over', () => {
      const ticTacToe = new TicTacToe();
      ticTacToe.makeMove(Mark.X, Position.TOP_LEFT);
      ticTacToe.makeMove(Mark.O, Position.TOP_RIGHT);
      ticTacToe.makeMove(Mark.X, Position.MIDDLE_LEFT);
      ticTacToe.makeMove(Mark.O, Position.MIDDLE_RIGHT);
      ticTacToe.makeMove(Mark.X, Position.BOTTOM_LEFT);

      expect(() => ticTacToe.makeMove(Mark.O, Position.BOTTOM_RIGHT)).toThrowError(
        'Cant make a move, game is already over!',
      );
    });
  });

  describe('Outcomes', () => {
    it('When the game has just started, the outcome is not yet decided', () => {
      const ticTacToe = new TicTacToe();

      expect(ticTacToe.getOutcome()).toEqual(Outcome.NOT_YET_DECIDED);
    });

    it('When a player has no 3 same marks in a row, the outcome is not yet decided', () => {
      const ticTacToe = new TicTacToe();
      ticTacToe.makeMove(Mark.X, Position.TOP_LEFT);
      ticTacToe.makeMove(Mark.O, Position.TOP_MIDDLE);
      ticTacToe.makeMove(Mark.X, Position.TOP_RIGHT);

      expect(ticTacToe.getOutcome()).toEqual(Outcome.NOT_YET_DECIDED);
    });

    describe('When a player has 3 same marks in a row, that player wins', () => {
      it('Scenario 1', () => {
        const ticTacToe = new TicTacToe();
        ticTacToe.makeMove(Mark.X, Position.TOP_LEFT);
        ticTacToe.makeMove(Mark.O, Position.TOP_RIGHT);
        ticTacToe.makeMove(Mark.X, Position.MIDDLE_LEFT);
        ticTacToe.makeMove(Mark.O, Position.MIDDLE_RIGHT);
        ticTacToe.makeMove(Mark.X, Position.BOTTOM_LEFT);

        expect(ticTacToe.getOutcome()).toEqual(Outcome.WINNER_X);
      });

      it('Scenario 2', () => {
        const ticTacToe = new TicTacToe();
        ticTacToe.makeMove(Mark.X, Position.BOTTOM_LEFT);
        ticTacToe.makeMove(Mark.O, Position.TOP_RIGHT);
        ticTacToe.makeMove(Mark.X, Position.BOTTOM_MIDDLE);
        ticTacToe.makeMove(Mark.O, Position.MIDDLE_MIDDLE);
        ticTacToe.makeMove(Mark.X, Position.BOTTOM_RIGHT);

        expect(ticTacToe.getOutcome()).toEqual(Outcome.WINNER_X);
      });

      it('Scenario 3', () => {
        const ticTacToe = new TicTacToe();
        ticTacToe.makeMove(Mark.X, Position.TOP_LEFT);
        ticTacToe.makeMove(Mark.O, Position.TOP_RIGHT);
        ticTacToe.makeMove(Mark.X, Position.MIDDLE_LEFT);
        ticTacToe.makeMove(Mark.O, Position.MIDDLE_MIDDLE);
        ticTacToe.makeMove(Mark.X, Position.BOTTOM_MIDDLE);
        ticTacToe.makeMove(Mark.O, Position.BOTTOM_LEFT);

        expect(ticTacToe.getOutcome()).toEqual(Outcome.WINNER_O);
      });
    });

    it('When all positions have been filled but no player has 3 same marks in a row, it is a draw', () => {
      const ticTacToe = new TicTacToe();
      ticTacToe.makeMove(Mark.X, Position.TOP_LEFT);
      ticTacToe.makeMove(Mark.O, Position.TOP_MIDDLE);
      ticTacToe.makeMove(Mark.X, Position.TOP_RIGHT);
      ticTacToe.makeMove(Mark.O, Position.MIDDLE_MIDDLE);
      ticTacToe.makeMove(Mark.X, Position.MIDDLE_LEFT);
      ticTacToe.makeMove(Mark.O, Position.BOTTOM_LEFT);
      ticTacToe.makeMove(Mark.X, Position.MIDDLE_RIGHT);
      ticTacToe.makeMove(Mark.O, Position.BOTTOM_RIGHT);
      ticTacToe.makeMove(Mark.X, Position.BOTTOM_MIDDLE);

      expect(ticTacToe.getOutcome()).toEqual(Outcome.DRAW);
    });

    it('When all positions have been filled but a player has 3 same marks in a row, it is not a draw', () => {
      const ticTacToe = new TicTacToe();
      ticTacToe.makeMove(Mark.X, Position.TOP_LEFT);
      ticTacToe.makeMove(Mark.O, Position.TOP_MIDDLE);
      ticTacToe.makeMove(Mark.X, Position.MIDDLE_LEFT);
      ticTacToe.makeMove(Mark.O, Position.TOP_RIGHT);
      ticTacToe.makeMove(Mark.X, Position.MIDDLE_MIDDLE);
      ticTacToe.makeMove(Mark.O, Position.MIDDLE_RIGHT);
      ticTacToe.makeMove(Mark.X, Position.BOTTOM_MIDDLE);
      ticTacToe.makeMove(Mark.O, Position.BOTTOM_LEFT);
      ticTacToe.makeMove(Mark.X, Position.BOTTOM_RIGHT);

      expect(ticTacToe.getOutcome()).toEqual(Outcome.WINNER_X);
    });
  });
});
