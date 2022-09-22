import { promisify } from 'util';

function validateGoalSync(goal, cb) {
  if (!goal) {
    return cb(null, false);
  }
  if (goal.protein === 0 && goal.carbs === 0 && goal.fat === 0) {
    return cb(null, false);
  }
  return cb(null, true);
}

function getRandomMealSync(allMeals, ix, ln) {
  const randomSelection = Math.floor(Math.random() * ln);

  return allMeals[ix][randomSelection];
}

const validateGoal = promisify(validateGoalSync);

/**
 * Get a random viable meal
 * @param {Array<Array<number>>} allMeals
 * @param {{ protein: number, carbs: number, fat: number }} goal
 * @param {number} ix
 * @return {array}
 */
async function getMeal(allMeals, goal, ix) {
  // If there are no goals, return null
  const goalIsValid = await validateGoal(goal);
  if (!goalIsValid) {
    return null;
  }

  // Calculate quantities to reach goal
  const ln = allMeals[ix].length;

  let result;

  for (let i = 0; i < 20; i += 1) {
    const meal = getRandomMealSync(allMeals, ix, ln);

    try {
      const ids = meal;

      // eslint-disable-next-line no-await-in-loop
      result = await this.calculateMacros({
        goals: {
          proteinGoal: goal.protein,
          carbGoal: goal.carbs,
          fatGoal: goal.fat,
        },
        abbrevIds: ids,
      });
    } catch (err) {
      continue; // eslint-disable-line no-continue
    }

    // Exit with the first meal that successfully calculates
    if (!result.error) return result;
  }

  return result;
}

export default getMeal;

export {
  getMeal,
  validateGoalSync,
  validateGoal,
  getRandomMealSync,
};
