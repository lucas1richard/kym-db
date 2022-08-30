import getRandomFoodsFromFilteredMeals from '../../../../../src/models/abbrev/classMethods/utils/getRandomFoodsFromFilteredMeals';

describe('getRandomFoodsFromFilteredMeals', () => {
  it('gets random foods default 4', () => {
    const foods = getRandomFoodsFromFilteredMeals();
    expect(Object.keys(foods).length).toBe(4);
  });
  it('gets random foods variable', () => {
    const foods = getRandomFoodsFromFilteredMeals({ numFoods: 1 });
    expect(Object.keys(foods).length).toBe(1);
  });
});
