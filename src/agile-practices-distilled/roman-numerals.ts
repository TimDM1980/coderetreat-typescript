const romanChars: { [key: string]: { value: number; left?: string } } = {
  M: { value: 1000, left: 'C' },
  D: { value: 500, left: 'C' },
  C: { value: 100, left: 'X' },
  L: { value: 50, left: 'X' },
  X: { value: 10, left: 'I' },
  V: { value: 5, left: 'I' },
  I: { value: 1 },
};

export function romanNumeral(number: number): string {
  if (number == 0) return '';

  for (const romanChar in romanChars) {
    const romanCharValue = romanChars[romanChar]!.value;
    if (number >= romanCharValue) {
      return romanChar + romanNumeral(number - romanCharValue);
    }

    const romanCharLeft = romanChars[romanChar]!.left;
    let leftThreshold = romanCharValue - romanChars[romanCharLeft!]!.value;
    if (number >= leftThreshold) {
      return romanCharLeft + romanChar + romanNumeral(number - leftThreshold);
    }
  }

  throw Error('Unreachable');
}
