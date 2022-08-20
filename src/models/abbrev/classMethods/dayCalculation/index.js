// const AppError = include('configure/appError');
import AppError from '../../../../configure/appError';
import { USER } from '../../../../foreignKeys';
import filterMeals from './utils/filterMeals';
import { getMeal } from './utils/getMeal';

import MealGoals from '../../../meal-goals';

/** Function to get the meals for a day */
export default dayCalculation;

/**
 * Get the meal for the day based on the user goals and day type
 * @param {number} uuid identifies the user
 * @param {('train'|'rest')} type indicates whether the user will train or rest on that day
 * @return {Promise<Array>}
 */
async function dayCalculation(uuid, type) {
  // Make sure that the type is either 'train' or 'rest'
  if (type !== 'train' && type !== 'rest') {
    throw new AppError(400, '`type` must be \'train\' or \'rest\'', true);
  }

  const getMealBound = getMeal.bind(this);

  // Get the goals for training and resting days
  const goalsBothTypes = await MealGoals.findOne({
    where: { [USER]: uuid },
    order: [['createdAt', 'DESC']],
  });

  // Get only the goals we care about
  const goals = goalsBothTypes.goals[type];

  // Eliminate most of the meals which can't produce the requested goals
  const meals = filterMeals(goals);

  const output = goals.map((goal, ix) => getMealBound(meals, goal, ix));

  const out = await Promise.all(output);

  const toSend = await Promise.all(out.map((ml, ix) => {
    if (ml && ml.error) {
      return getMealBound(meals, goals[ix], ix);
    }
    return ml;
  }));

  return toSend;
}
