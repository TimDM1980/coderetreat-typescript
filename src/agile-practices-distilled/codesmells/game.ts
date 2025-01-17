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
      this.sameSymbolForRow([{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }]),
      this.sameSymbolForRow([{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }]),
      this.sameSymbolForRow([{ x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 2 }]),

      this.sameSymbolForRow([{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }]),
      this.sameSymbolForRow([{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }]),
      this.sameSymbolForRow([{ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }]),

      this.sameSymbolForRow([{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }]),
      this.sameSymbolForRow([{ x: 0, y: 2 }, { x: 1, y: 1 }, { x: 2, y: 0 }]),
    ];

    return rowsToCheck.find((symbol) => !!symbol) ?? ' ';
  }

  public sameSymbolForRow(positions: { x: number; y: number }[]): Symbol | undefined {
    const symbolToCheck = this.board.symbolAt(positions[0].x, positions[0].y);
    if (positions.every((position) => this.board.isTilePlayed(position.x, position.y)
      && this.board.symbolAt(position.x, position.y) === symbolToCheck)) {
        return symbolToCheck;
    }

    return undefined;
  }
}

type Symbol = 'X' | 'O' | ' ';

class Tile {
  private symbol: Symbol;

  constructor(private x: number, private y: number) {
    this.symbol = ' ';
  }

  hasPosition(x: number, y: number): boolean {
    return this.x === x && this.y === y;
  }

  setSymbol(symbol: Symbol): void {
    this.symbol = symbol;
  }

  getSymbol() {
    return this.symbol;
  }
}

class Board {
  private tiles: Tile[] = [];

  constructor() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.tiles.push(new Tile(i, j));
      }
    }
  }

  isTilePlayed(x: number, y: number): boolean {
    return this.symbolAt(x, y) !== ' ';
  }

  symbolAt(x: number, y: number): Symbol {
    return this.tileAt(x, y).getSymbol();
  }

  addTileAt(symbol: Symbol, x: number, y: number): void {
    this.tileAt(x, y).setSymbol(symbol);
  }

  private tileAt(x: number, y: number): Tile {
    return this.tiles.find((t: Tile) => t.hasPosition(x, y))!;
  }
}
