/* eslint-disable no-param-reassign */

import filteredMeals from '../../../../../../data/filteredmeals.json';
import FoodFactors from '../../utils/FoodFactor';

/**
 * Filter meals based on goals
 * @param {Array<{ protein: number, carbs: number, fat: number }>} goals
 */
function filterMeals(goals) {
  const meals = [...filteredMeals];

  meals.forEach((meal, ix) => {
    Object.keys(meal).forEach((date) => {
      const factors = new FoodFactors(meal[date]);
      if (factors.status === 'fail') {
        delete meal[date];
        return;
      }
      // Check for obvious failures
      const { protein, carbs, fat } = goals[ix];

      // The test fails when a food mostly providing a macronutrient has another
      // macronutrient that would exceed the corresponding goal when the primary
      // macronutrient reaches its goal.

      // Example 1:
      // pGoal: 30
      // cGoal: 5
      // fGoal: 10
      // |==============================| pGoal
      // |===  | cGoal
      // |=======   | fGoal
      // Result: PASS

      // Example 2:
      // pGoal: 30
      // cGoal: 5
      // fGoal: 10
      // |==============================| pGoal
      // |=====|==== cGoal
      // |=======   | fGoal
      // Result: FAIL

      /**
       * **`mainGoal`**: the macronutrient most strongly supplied by a food\
       * **`secondaryGoal`**: the macronutrient less strongly supplied by a food\
       * **`minimalGoal`**: the macronutrient least strongly supplied by a food\
       * **The secondaryGoal and minimalGoal are less important than the mainGoal**
       */
      let goalDesc = {
        mainGoal: protein,
        secondaryGoal: carbs,
        minimalGoal: fat,
      };
      let config = { primary: 'p', secondary: 'c', minimal: 'f' };
      if (factors.checkFailure(goalDesc, 'pFood', config)) {
        delete meal[date];
        return;
      }

      goalDesc = {
        mainGoal: carbs,
        secondaryGoal: protein,
        minimalGoal: fat,
      };
      config = { primary: 'c', secondary: 'p', minimal: 'f' };
      if (factors.checkFailure(goalDesc, 'cFood', config)) {
        delete meal[date];
        return;
      }

      goalDesc = {
        mainGoal: fat,
        secondaryGoal: protein,
        minimalGoal: carbs,
      };
      config = { primary: 'f', secondary: 'p', minimal: 'c' };
      if (factors.checkFailure(goalDesc, 'fFood', config)) {
        delete meal[date];
        return;
      }

      function mealReduce(memo, fd) {
        memo[fd.maxMacro] = true;
        return memo;
      }

      /** @type {{ p: boolean, c: boolean, f: boolean }} */
      const profile = meal[date].reduce(mealReduce, {});

      /** Make sure there are three max macros */
      if (Object.keys(profile).length !== 3) {
        delete meal[date];
      }
    });
  });

  return meals;
}

export default filterMeals;
