import { promisify } from 'util';
import { USER } from '../../../foreignKeys';

function sanitizeMealGoalSync(cb) {
  const mealGoal = { ...this.get() };

  delete mealGoal[USER];

  return cb(null, mealGoal);
}

const sanitizeMealGoal = promisify(sanitizeMealGoalSync);

export default sanitizeMealGoal;
