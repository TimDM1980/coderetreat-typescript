import { TennisGame } from './tennisgame';

export class TennisGame1 implements TennisGame {
  private player1Score: number;
  private player2Score: number;
  private readonly player1Name: string;
  private readonly player2Name: string;

  constructor(player1Name: string, player2Name: string) {
    this.player1Name = player1Name;
    this.player2Name = player2Name;
    this.player1Score = 0;
    this.player2Score = 0;
  }

  wonPoint(playerName: string): void {
    if (playerName === this.player1Name) {
      this.player1Score += 1;
    } else if (playerName === this.player2Name) {
      this.player2Score += 1;
    } else {
      throw Error(`Unknown player ${playerName}`);
    }
  }

  getScore(): string {
    if (this.scoresAreTied()) {
      return this.formatTiedScore();
    }
    if (this.aPlayerScoredMoreThan3Points()) {
      return this.formatAdvantageOrWin();
    }
    return [this.formatScore(this.player1Score), this.formatScore(this.player2Score)].join('-');
  }

  private scoresAreTied() {
    return this.player1Score === this.player2Score;
  }

  private formatTiedScore() {
    switch (this.player1Score) {
      case 0:
        return 'Love-All';
      case 1:
        return 'Fifteen-All';
      case 2:
        return 'Thirty-All';
      default:
        return 'Deuce';
    }
  }

  private aPlayerScoredMoreThan3Points() {
    return this.player1Score > 3 || this.player2Score > 3;
  }

  private formatAdvantageOrWin() {
    const scoreDifference: number = this.player1Score - this.player2Score;
    if (scoreDifference === 1) return `Advantage ${this.player1Name}`;
    else if (scoreDifference === -1) return `Advantage ${this.player2Name}`;
    else if (scoreDifference >= 2) return `Win for ${this.player1Name}`;
    else return `Win for ${this.player2Name}`;
  }

  private formatScore(playerScore: number): string {
    switch (playerScore) {
      case 0:
        return 'Love';
      case 1:
        return 'Fifteen';
      case 2:
        return 'Thirty';
      case 3:
        return 'Forty';
      default:
        throw new Error(`Unexpected score ${playerScore}`);
    }
  }
}
