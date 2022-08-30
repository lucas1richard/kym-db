import connectDatabase from '../../../../src';
import getRandomFoodsFromFilteredMeals from '../../../../src/models/abbrev/classMethods/utils/getRandomFoodsFromFilteredMeals';

const { Abbrev, destroyAll, closeConnection } = connectDatabase();

jest.mock('../../../../src/models/abbrev/classMethods/utils/getRandomFoodsFromFilteredMeals', () => jest.fn());

describe('abbrev/classMethods/fpCalculateMacros', () => {
  beforeAll(async () => {
    await Abbrev.bulkCreate(testData.abbrevs);
  });
  afterAll(async () => {
    await destroyAll();
    await closeConnection();
  });
  it('calculates macros', async () => {
    getRandomFoodsFromFilteredMeals.mockReturnValueOnce({
      3394: testData.filteredMealsObject['3394'], // Nuts, pecans (p: 9.17, c: 13.86, f: 71.97)
      5469: testData.filteredMealsObject['5469'], // Avocado (p: 1.96, c: 8.64, f: 15.41)
      7865: testData.filteredMealsObject['7865'], // Beef, ground (p: 26.11, c: 0.00, f: 11.73)
      8777: testData.filteredMealsObject['8777'], // Granola (p: 8.00, c: 72.00, f: 14.00)
    });
    getRandomFoodsFromFilteredMeals.mockReturnValueOnce({
      2683: testData.filteredMealsObject['2683'], // Chicken breast, grill (p: 30.54, c: 0, f: 3.17)
      3394: testData.filteredMealsObject['3394'], // Nuts, pecans (p: 9.17, c: 13.86, f: 71.97)
      6068: testData.filteredMealsObject['6068'], // Pineapple (p: 0.54, c: 13.12, f: 0.12)
      8774: testData.filteredMealsObject['8774'], // Hummus (p: 7.14, c: 14.29, f: 17.86)
    });
    const res = await Abbrev.fpCalculateMacros({
      proteinGoal: 20,
      carbGoal: 30,
      fatGoal: 10,
    });
    expect(res).toBeTruthy();
  });
  it('re-tries when no foods have carbohydrates', async () => {
    getRandomFoodsFromFilteredMeals.mockReturnValueOnce({
      851: {
        protein: 10, fat: 2, carbohydates: 0, maxMacro: 'protein',
      },
      2514: {
        protein: 10, fat: 2, carbohydates: 0, maxMacro: 'protein',
      },
      3394: {
        protein: 2, fat: 12, carbohydates: 0, maxMacro: 'fat',
      },
      5469: {
        protein: 2, fat: 21, carbohydates: 0, maxMacro: 'fat',
      },
    });
    getRandomFoodsFromFilteredMeals.mockReturnValueOnce({
      2683: testData.filteredMealsObject['2683'], // Chicken breast, grill (p: 30.54, c: 0, f: 3.17)
      3394: testData.filteredMealsObject['3394'], // Nuts, pecans (p: 9.17, c: 13.86, f: 71.97)
      6068: testData.filteredMealsObject['6068'], // Pineapple (p: 0.54, c: 13.12, f: 0.12)
      8774: testData.filteredMealsObject['8774'], // Hummus (p: 7.14, c: 14.29, f: 17.86)
    });
    const res = await Abbrev.fpCalculateMacros({
      proteinGoal: 20,
      carbGoal: 30,
      fatGoal: 10,
    });
    expect(res).toBeTruthy();
  });
  it('re-tries when no foods have maxMacro = protein', async () => {
    getRandomFoodsFromFilteredMeals.mockReturnValueOnce({
      6068: testData.filteredMealsObject['6068'], // Pineapple (p: 0.54, c: 13.12, f: 0.12)
      3394: testData.filteredMealsObject['3394'], // Nuts, pecans (p: 9.17, c: 13.86, f: 71.97)
      5469: testData.filteredMealsObject['5469'], // Avocado (p: 1.96, c: 8.64, f: 15.41)
    });
    getRandomFoodsFromFilteredMeals.mockReturnValueOnce({
      2683: testData.filteredMealsObject['2683'], // Chicken breast, grill (p: 30.54, c: 0, f: 3.17)
      3394: testData.filteredMealsObject['3394'], // Nuts, pecans (p: 9.17, c: 13.86, f: 71.97)
      6068: testData.filteredMealsObject['6068'], // Pineapple (p: 0.54, c: 13.12, f: 0.12)
      8774: testData.filteredMealsObject['8774'], // Hummus (p: 7.14, c: 14.29, f: 17.86)
    });
    const res = await Abbrev.fpCalculateMacros({
      proteinGoal: 20,
      carbGoal: 30,
      fatGoal: 10,
    });
    expect(res).toBeTruthy();
  });
  it('requires goals to be greater than 0', async () => {
    try {
      await Abbrev.fpCalculateMacros({
        proteinGoal: 0,
        carbGoal: 0,
        fatGoal: 0,
      });
    } catch (err) {
      expect(err.message).toBe('Goal macronutrients must be greater than 0');
    }
  });
});
