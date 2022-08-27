import FoodFactor from '../../../../../src/models/abbrev/classMethods/utils/FoodFactor';

function makeFood(protein, carbs, fat, maxMacro) {
  return {
    protein,
    carbohydrates: carbs,
    fat,
    maxMacro,
  };
}

function makeFactor(protein, carbs, fat, maxMacro) {
  return {
    foods: [makeFood(protein, carbs, fat, maxMacro)],
    p: protein,
    c: carbs,
    f: fat,
    weight: 100,
  };
}

describe('getMaxMacroFactors', () => {
  const pFood = makeFactor(5, 0, 1, 'protein');
  const cFood = makeFactor(0, 5, 1, 'carbohydrates');
  const fFood = makeFactor(1, 0, 5, 'fat');
  const factor = 'pFood';
  const macro = 'protein';
  const factors = { pFood, cFood, fFood };
  const oFoods = [
    makeFood(5, 0, 1, 'protein'),
    makeFood(0, 5, 1, 'carbohydrates'),
    makeFood(1, 0, 5, 'fat'),
  ];
  const foodFactor = new FoodFactor(oFoods);
  it('should return factors', () => {
    const maxMacroFactors = foodFactor.getMaxMacroFactors(factor, macro);
    const maxFactors = {
      pFood: maxMacroFactors.pFood,
      cFood: maxMacroFactors.cFood,
      fFood: maxMacroFactors.fFood,
    };
    expect(maxFactors).toEqual(factors);
  });
});
