import sequelize from 'sequelize'; // eslint-disable-line no-unused-vars
import { USER } from '../../../../foreignKeys';
import filterMeals from './utils/filterMeals';
import { getMeal as getMealUnbound } from './utils/getMeal';

/**
 * Get the meal for the day based on the user goals and day type
 * @param {object} obj
 * @param {number} obj.uuid identifies the user
 * @param {('TRAIN'|'REST')} obj.type indicates whether the user will train or rest on that day
 * @param {sequelize.Model} obj.MealGoals
 * @return {Promise<Array>}
 */
async function dayCalculation({
  uuid, type, MealGoals,
}) {
  // Make sure that the type is either 'train' or 'rest'
  if (type !== 'TRAIN' && type !== 'REST') {
    throw new Error('INVALID_GOAL_TYPE');
  }

  const getMeal = getMealUnbound.bind(this);

  // Get the goals for training and resting days
  const goalsBothTypes = await MealGoals.findOne({
    where: { [USER]: uuid },
    order: [['createdAt', 'DESC']],
  });

  // Get only the goals we care about
  const goals = goalsBothTypes.goals[type];

  // Eliminate most of the meals which can't produce the requested goals
  const meals = filterMeals(goals);

  const out = await Promise.all(goals.map((goal, ix) => getMeal(meals, goal, ix)));

  const toSend = await Promise.all(out.map((ml, ix) => {
    if (ml && ml.error) return getMeal(meals, goals[ix], ix);
    return ml;
  }));

  return toSend;
}

/** Function to get the meals for a day */
export default dayCalculation;
