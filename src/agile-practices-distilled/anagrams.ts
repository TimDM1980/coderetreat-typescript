export function anagrams(string: string): string[] {
  if (string.length == 1) {
    return [string];
  }

  const result: string[] = [];

  const characters = string.split('');
  characters.forEach((char, charIndex) => {
    const recursiveAnagrams = anagrams(stringWithoutChar(string, charIndex));
    recursiveAnagrams.forEach((anagram) => result.push(char.concat(...anagram)));
  });

  return removeDuplicates(result);
}

function stringWithoutChar(string: string, index: number): string {
  return string.substring(0, index) + string.substring(index+1);
}

function removeDuplicates(anagrams: string[]) {
  return anagrams.reduce(
      (accumulator, currentValue) => {
        if (accumulator.includes(currentValue)) {
          return accumulator;
        } else {
          return accumulator.concat(currentValue);
        }
      },
      [] as string[]);
}