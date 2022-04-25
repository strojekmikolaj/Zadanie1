const { checkPopulation } = require('./index');

describe('checking for changes in countries', () => {
  test('data not changed', () => {
    const currentData = [
      { name: 'Poland', population: 40_000_000 },
      { name: 'Germany', population: 80_000_000 },
    ];
    const prevData = [
      { name: 'Poland', population: 40_000_000 },
      { name: 'Germany', population: 70_000_000 },
    ];
    expect(checkPopulation(currentData, prevData)).toBe('Germany');
  });
});
