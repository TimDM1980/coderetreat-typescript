import { anagrams } from './anagrams';

describe('Anagrams', () => {
  it('For a single character string', () => {
    const input = 'i';

    const result = anagrams(input);

    expect(result).toEqual(['i']);
  });

  it('For a 2 char string', () => {
    const input = 'io';

    const result = anagrams(input);

    expect(result.length).toEqual(2);
    expect(result).toEqual(expect.arrayContaining(['oi', 'io']));
  });

  it('For a 3 char string', () => {
    const input = 'ioa';

    const result = anagrams(input);

    expect(result.length).toEqual(6);
    expect(result).toEqual(expect.arrayContaining(['ioa', 'iao', 'aio', 'aoi', 'oia', 'oai']));
  });

  it('For a 4 char string', () => {
    const input = 'abcd';

    const result = anagrams(input);

    expect(result.length).toEqual(24);
    expect(result).toEqual(expect.arrayContaining(
        [
          'abcd', 'abdc', 'acbd', 'acdb', 'adbc', 'adcb',
          'bacd', 'badc', 'bcad', 'bcda', 'bdac', 'bdca',
          'cabd', 'cadb', 'cbad', 'cbda', 'cdab', 'cdba',
          'dabc', 'dacb', 'dbac', 'dbca', 'dcab', 'dcba'
        ]
    ));
  });

  it('When input contains duplicate chars, duplicate anagrams are removed', () => {
    const input = 'baab';

    const result = anagrams(input);

    expect(result.length).toEqual(6);
    expect(result).toEqual(expect.arrayContaining(['baab', 'baba', 'bbaa', 'abab', 'abba', 'aabb' ]));
  });
});
