import {isArray} from "util";

const multiples: {[key: string]: number} = {
  'FizzBuzz': 15,
  'Buzz': 5,
  'Fizz': 3,
};

export function fizzbuzz(number: number | number[]): string | string[] {
  if (isArray(number)) {
    return number.flatMap(i => fizzbuzz(i));
  }

  for (const key in multiples) {
    if (number && number % multiples[key]! === 0) {
      return key;
    }
  }

  return number.toString();
}
