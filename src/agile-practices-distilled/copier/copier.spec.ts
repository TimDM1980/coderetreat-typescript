import { Copier, Destination, Source } from './copier';

describe('Copier', () => {
  describe('With manual mocks', () => {
    let stubbedChars: string[];
    let expectedChars: string[];
    let copier: Copier;

    beforeEach(() => {
      const sourceMock: Source = {
        getChar(): string {
          return stubbedChars.splice(0, 1)[0];
        },
      };
      const destinationMock: Destination = {
        setChar(char: string): void {
          expectedChars.push(char);
        },
      };
      copier = new Copier(sourceMock, destinationMock);
      stubbedChars = [];
      expectedChars = [];
    });

    it('When the method copy is called on the copier, then it should read characters from the source and copy them to the destination until the source returns a newline (\\n).', () => {
      stubbedChars.push('a', 'b', 'c', '\n');

      copier.copy();

      expect(expectedChars).toEqual(['a', 'b', 'c']);
    });

    it('When the source returns undefined, the copy method stops', () => {
      stubbedChars.push('a');

      copier.copy();

      expect(expectedChars).toEqual(['a']);
    });
  });

  describe('With Jest mocks', () => {
    const getCharMock = jest.fn();
    const setCharMock = jest.fn();
    let copier: Copier;

    beforeEach(() => {
      const sourceMock: Source = {
        getChar: getCharMock,
      };
      const destinationMock: Destination = {
        setChar: setCharMock,
      };
      copier = new Copier(sourceMock, destinationMock);
      jest.resetAllMocks();
    });

    it('When the method copy is called on the copier, then it should read characters from the source and copy them to the destination until the source returns a newline (\\n).', () => {
      getCharMock.mockReturnValueOnce('a').mockReturnValueOnce('b').mockReturnValueOnce('c').mockReturnValueOnce('\n');

      copier.copy();

      expect(setCharMock).toHaveBeenCalledTimes(3);
      expect(setCharMock).toHaveBeenNthCalledWith(1, 'a');
      expect(setCharMock).toHaveBeenNthCalledWith(2, 'b');
      expect(setCharMock).toHaveBeenNthCalledWith(3, 'c');
    });

    it('When the source returns undefined, the copy method stops', () => {
      getCharMock.mockReturnValueOnce('a');

      copier.copy();

      expect(setCharMock).toHaveBeenCalledTimes(1);
      expect(setCharMock).toHaveBeenNthCalledWith(1, 'a');
    });
  });
});
