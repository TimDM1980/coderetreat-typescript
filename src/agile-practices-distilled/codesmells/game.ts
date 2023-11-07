export class Game {
  private lastSymbol: Symbol = ' ';
  private board: Board = new Board();

  public play(symbol: Symbol, x: number, y: number): void {
    if (this.isFirstPlayerInvalid(symbol)) {
      throw new Error('Invalid first player');
    }
    if (this.isPlayerRepeated(symbol)) {
      throw new Error('Invalid next player');
    }
    if (this.board.isTilePlayed(x, y)) {
      throw new Error('Invalid position');
    }

    this.lastSymbol = symbol;
    this.board.addTileAt(symbol, x, y);
  }

  private isFirstPlayerInvalid(symbol: Symbol) {
    return this.lastSymbol === ' ' && symbol !== 'X';
  }

  private isPlayerRepeated(symbol: Symbol) {
    return symbol === this.lastSymbol;
  }

  public winner(): Symbol {
    const rowsToCheck = [
      this.symbolForRow([
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 },
      ]),
      this.symbolForRow([
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 1, y: 2 },
      ]),
      this.symbolForRow([
        { x: 2, y: 0 },
        { x: 2, y: 1 },
        { x: 2, y: 2 },
      ]),

      this.symbolForRow([
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
      ]),
      this.symbolForRow([
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
      ]),
      this.symbolForRow([
        { x: 0, y: 2 },
        { x: 1, y: 2 },
        { x: 2, y: 2 },
      ]),

      this.symbolForRow([
        { x: 0, y: 0 },
        { x: 1, y: 1 },
        { x: 2, y: 2 },
      ]),
      this.symbolForRow([
        { x: 0, y: 2 },
        { x: 1, y: 1 },
        { x: 2, y: 0 },
      ]),
    ];

    return rowsToCheck.find((symbol) => symbol !== ' ') ?? ' ';
  }

  public symbolForRow(positions: { x: number; y: number }[]): Symbol {
    if (positions.every((position) => this.board.isTilePlayed(position.x, position.y))) {
      const symbolToCheck = this.board.symbolAt(positions[0].x, positions[0].y);
      if (positions.every((position) => this.board.symbolAt(position.x, position.y) === symbolToCheck)) {
        return symbolToCheck;
      }
    }

    return ' ';
  }
}

type Symbol = 'X' | 'O' | ' ';

interface Tile {
  x: number;
  y: number;
  symbol: Symbol;
}

class Board {
  private tiles: Tile[] = [];

  constructor() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.tiles.push({ x: i, y: j, symbol: ' ' });
      }
    }
  }

  isTilePlayed(x: number, y: number): boolean {
    return this.symbolAt(x, y) !== ' ';
  }

  symbolAt(x: number, y: number): Symbol {
    return this.tileAt(x, y).symbol;
  }

  addTileAt(symbol: Symbol, x: number, y: number): void {
    this.tileAt(x, y).symbol = symbol;
  }

  private tileAt(x: number, y: number): Tile {
    return this.tiles.find((t: Tile) => t.x === x && t.y === y)!;
  }
}
