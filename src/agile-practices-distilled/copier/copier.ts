export interface Source {
  getChar(): string;
}

export interface Destination {
  setChar(char: string): void;
}

export class Copier {
  constructor(
    private source: Source,
    private destination: Destination,
  ) {}

  copy() {
    let char = this.source.getChar();
    while (char && char !== '\n') {
      this.destination.setChar(char);
      char = this.source.getChar();
    }
  }
}
