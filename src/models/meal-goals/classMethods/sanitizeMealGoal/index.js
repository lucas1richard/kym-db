import { promisify } from 'util';
import { USER } from '../../../../foreignKeys';

function sanitizeMealGoalSync(mealGoalInstance, cb) {
  if (!mealGoalInstance) {
    return cb(new Error('no mealGoalInstance'));
  }
  let mealGoal;
  if (typeof mealGoalInstance.get === 'function') {
    mealGoal = { ...mealGoalInstance.get() };
  } else {
    mealGoal = { ...mealGoalInstance };
  }

  delete mealGoal[USER];

  return cb(null, mealGoal);
}

const sanitizeMealGoal = promisify(sanitizeMealGoalSync);

export default sanitizeMealGoal;
