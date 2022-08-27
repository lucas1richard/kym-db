import AppError from '../../../../configure/appError';
import { USER } from '../../../../foreignKeys';
import filterMeals from './utils/filterMeals';
import { getMeal } from './utils/getMeal';

/**
 * Get the meal for the day based on the user goals and day type
 * @param {number} uuid identifies the user
 * @param {('TRAIN'|'REST')} type indicates whether the user will train or rest on that day
 * @return {Promise<Array>}
 */
async function dayCalculation({
  uuid, type, MealGoals,
}) {
  // Make sure that the type is either 'train' or 'rest'
  if (type !== 'TRAIN' && type !== 'REST') {
    throw new AppError({
      code: 400,
      message: '`type` must be \'TRAIN\' or \'REST\'',
      isOperational: true,
    });
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

/** Function to get the meals for a day */
export default dayCalculation;
