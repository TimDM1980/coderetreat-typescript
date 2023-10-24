import {romanNumeral} from './roman-numerals';

describe('Roman Numerals', () => {
  test.each([
    {input: 1, expected: 'I'},
    {input: 2, expected: 'II'},
    {input: 3, expected: 'III'},
    {input: 4, expected: 'IV'},
    {input: 5, expected: 'V'},
    {input: 6, expected: 'VI'},
    {input: 7, expected: 'VII'},
    {input: 8, expected: 'VIII'},
    {input: 9, expected: 'IX'},
    {input: 10, expected: 'X'},
    {input: 11, expected: 'XI'},
    {input: 12, expected: 'XII'},
    {input: 13, expected: 'XIII'},
    {input: 14, expected: 'XIV'},
    {input: 15, expected: 'XV'},
    {input: 16, expected: 'XVI'},
    {input: 17, expected: 'XVII'},
    {input: 18, expected: 'XVIII'},
    {input: 19, expected: 'XIX'},
    {input: 20, expected: 'XX'},
    {input: 21, expected: 'XXI'},
    {input: 25, expected: 'XXV'},
    {input: 30, expected: 'XXX'},
    {input: 39, expected: 'XXXIX'},
    {input: 40, expected: 'XL'},
    {input: 41, expected: 'XLI'},
    {input: 42, expected: 'XLII'},
    {input: 43, expected: 'XLIII'},
    {input: 44, expected: 'XLIV'},
    {input: 45, expected: 'XLV'},
    {input: 46, expected: 'XLVI'},
    {input: 47, expected: 'XLVII'},
    {input: 48, expected: 'XLVIII'},
    {input: 49, expected: 'XLIX'},
    {input: 50, expected: 'L'},
    {input: 51, expected: 'LI'},
    {input: 90, expected: 'XC'},
    {input: 91, expected: 'XCI'},
    {input: 92, expected: 'XCII'},
    {input: 93, expected: 'XCIII'},
    {input: 94, expected: 'XCIV'},
    {input: 95, expected: 'XCV'},
    {input: 96, expected: 'XCVI'},
    {input: 97, expected: 'XCVII'},
    {input: 98, expected: 'XCVIII'},
    {input: 99, expected: 'XCIX'},
    {input: 100, expected: 'C'},
    {input: 200, expected: 'CC'},
    {input: 300, expected: 'CCC'},
    {input: 400, expected: 'CD'},
    {input: 500, expected: 'D'},
    {input: 600, expected: 'DC'},
    {input: 700, expected: 'DCC'},
    {input: 800, expected: 'DCCC'},
    {input: 900, expected: 'CM'},
    {input: 999, expected: 'CMXCIX'},
    {input: 1000, expected: 'M'},
    {input: 846, expected: 'DCCCXLVI'},
    {input: 1999, expected: 'MCMXCIX'},
    {input: 2008, expected: 'MMVIII'},
  ])('$input --> $expected', ({input, expected}) => expect(romanNumeral(input)).toEqual(expected));
});
