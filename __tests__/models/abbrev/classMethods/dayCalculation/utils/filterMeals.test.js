import filterMeals from '../../../../../../src/models/abbrev/classMethods/dayCalculation/utils/filterMeals';

describe('filterMeals', () => {
  const goals = [
    { protein: 20, carbs: 30, fat: 10 },
    { protein: 20, carbs: 0, fat: 0 },
    { protein: 0, carbs: 0, fat: 10 },
    { protein: 0, carbs: 30, fat: 0 },
    { protein: 20, carbs: 30, fat: 10 },
    { protein: 20, carbs: 30, fat: 10 },
  ];
  it('gets filtered meals', () => {
    const filtered = filterMeals(goals);
    expect(filtered).toBeTruthy();
  });
});
