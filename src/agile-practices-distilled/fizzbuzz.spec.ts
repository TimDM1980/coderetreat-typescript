import { fizzbuzz } from './fizzbuzz';

describe('FizzBuzz', () => {
  describe('Regular cases', () => {
    it('When I fizzbuzz number 1, I get back a string representing it', () => {
      expect(fizzbuzz(1)).toEqual('1');
    });
    it('When I fizzbuzz number 2, I get back a string representing it', () => {
      expect(fizzbuzz(2)).toEqual('2');
    });
    it('When I fizzbuzz number 4, I get back a string representing it', () => {
      expect(fizzbuzz(4)).toEqual('4');
    });
  });
  describe('Fizz cases', () => {
    it('When I fizzbuzz number 3, I get back Fizz', () => {
      expect(fizzbuzz(3)).toEqual('Fizz');
    });
    it('When I fizzbuzz a multiple of 3, I get back Fizz', () => {
      expect(fizzbuzz(6)).toEqual('Fizz');
      expect(fizzbuzz(9)).toEqual('Fizz');
      expect(fizzbuzz(12)).toEqual('Fizz');
    });
  });
  describe('Buzz cases', () => {
    it('When I fizzbuzz number 5, I get back Buzz', () => {
      expect(fizzbuzz(5)).toEqual('Buzz');
    });
    it('When I fizzbuzz a multiple of 5, I get back Buzz', () => {
      expect(fizzbuzz(10)).toEqual('Buzz');
      expect(fizzbuzz(20)).toEqual('Buzz');
      expect(fizzbuzz(25)).toEqual('Buzz');
    });
  });
  describe('FizzBuzz cases', () => {
    it('When I fizzbuzz a multiple of both 3 and 5, I get back FizzBuzz', () => {
      expect(fizzbuzz(15)).toEqual('FizzBuzz');
      expect(fizzbuzz(30)).toEqual('FizzBuzz');
      expect(fizzbuzz(45)).toEqual('FizzBuzz');
    });
  });
  describe('Edge cases', () => {
    it('When I fizzbuzz number 0, I get back a string representing it, because 0 is not a multiple of 3 and/or 5', () => {
      expect(fizzbuzz(0)).toEqual('0');
    });
    it('When I fizzbuzz a negative number, I get back a string representing it', () => {
      expect(fizzbuzz(-1)).toEqual('-1');
      expect(fizzbuzz(-2)).toEqual('-2');
      expect(fizzbuzz(-4)).toEqual('-4');
    });
    it('When I fizzbuzz a negative multiple of 3, I get back Fizz', () => {
      expect(fizzbuzz(-3)).toEqual('Fizz');
      expect(fizzbuzz(-6)).toEqual('Fizz');
    });
    it('When I fizzbuzz a negative multiple of 5, I get back Buzz', () => {
      expect(fizzbuzz(-5)).toEqual('Buzz');
      expect(fizzbuzz(-10)).toEqual('Buzz');
    });
    it('When I fizzbuzz a negative multiple of both 3 and 5, I get back FizzBuzz', () => {
      expect(fizzbuzz(-15)).toEqual('FizzBuzz');
      expect(fizzbuzz(-30)).toEqual('FizzBuzz');
    });
  });
  it('Can loop through an array of numbers', () => {
    expect(fizzbuzz([1, 2, 3, 4, 5])).toEqual(['1', '2', 'Fizz', '4', 'Buzz']);
  });
});
