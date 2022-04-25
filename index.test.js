const { checkPopulation } = require('./index');

describe('checking for changes in countries', () => {
  test('should find different population of Germany', () => {
    const currentData = [
      { name: 'Poland', population: 40_000_000 },
      { name: 'Germany', population: 80_000_000 },
    ];
    const prevData = [
      { name: 'Poland', population: 40_000_000 },
      { name: 'Germany', population: 70_000_000 },
    ];
    expect(checkPopulation(currentData, prevData)[0].name).toBe('Germany');
  });
});
