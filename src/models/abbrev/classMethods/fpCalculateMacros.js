/**
 * @module models/abbrev/classMethods/fpCalculateMacros
 */

import calculateMealWeights from './utils/calculateMealWeights';
import getMacros from './utils/getMacros';
import FoodFactors from './utils/FoodFactor';
// import filteredMeals from '../../../../data/filteredmeals.json';
import getRandomFoodsFromFilteredMeals from './utils/getRandomFoodsFromFilteredMeals';

/**
 * @param {number} gr
 */
const convertOz = (gr) => Math.round((gr * 10) / 28.4) / 10;

/**
 * Format the response
 * @param {number} gr gram weight
 * @param {{p: number, f: number, c: number, weight: number}} factor
 */
const formatResponse = (gr, factor) => ({
  foods: factor.foods,
  weight: {
    gr,
    oz: convertOz(gr),
  },
  macros: getMacros(gr, factor),
});

function fpCalculateMacros(goals) {
  const { proteinGoal, carbGoal, fatGoal } = goals;
  // const oFoods = [...filteredMeals];

  if (proteinGoal <= 0 || carbGoal <= 0 || fatGoal <= 0) {
    throw new Error('Goal macronutrients must be greater than 0');
  }

  let cnt = 0;
  let regenerate = true;
  let data = [];

  while (regenerate && cnt < 20) {
    /** get random foods from random meals from random days */
    const selectedFoods = getRandomFoodsFromFilteredMeals();

    const factors = new FoodFactors(Object.values(selectedFoods));

    // /**
    //  * @param {'pFood'|'cFood'|'fFood'} factor
    //  * @param {'protein'|'carbohydrates'|'fat'} macro
    //  */
    // const getMax = (factor, macro) => {
    //   factors[factor].foods = oFoods.reduce((memo, fd) => {
    //     if (fd[macro] * 1 > memo[macro]) {
    //       return fd;
    //     }
    //     return memo;
    //   }, { protein: 0, carbohydrates: 0, fat: 0 });
    //   factors[factor].foods = [factors[factor].foods];
    //   factors[factor].weight = 100;
    //   factors[factor].p = factors[factor].foods[0].protein * 1;
    //   factors[factor].c = factors[factor].foods[0].carbohydrates * 1;
    //   factors[factor].f = factors[factor].foods[0].fat * 1;
    // };

    // // occurs when all foods have a maxMacro which is not 'protein'
    // if (!factors.pFood.p) getMax('pFood', 'protein');

    // // occurs when all foods have a maxMacro which is not 'carbohydrates'
    // if (!factors.cFood.c) getMax('cFood', 'carbohydrates');

    // // occurs when all foods have a maxMacro which is not 'fat'
    // if (!factors.fFood.f) getMax('fFood', 'fat');

    const { alpha, beta, gamma } = calculateMealWeights(factors, proteinGoal, carbGoal, fatGoal);

    data = [
      formatResponse(Math.round(alpha), factors.pFood),
      formatResponse(Math.round(beta), factors.cFood),
      formatResponse(Math.round(gamma), factors.fFood),
    ];

    for (let i = 0; i < data.length; i += 1) {
      const datum = data[i];
      if (
        datum.weight.gr < 0 || datum.weight.oz < 0 || !datum.weight.gr || !datum.weight.oz
      ) {
        cnt += 1;
        regenerate = false;
        break;
      }
    }

    regenerate = !regenerate;
  }
  return data;
}

export default fpCalculateMacros;
