import moment from 'moment';
import { USER } from '../../../foreignKeys';

/**
 * Create an object to define a program
 * @param {object} measure
 * @param {string} measure.units
 * @param {number} measure.weight
 * @param {string} measure.uuid
 * @param {'LOSE_WEIGHT'|'MAINTAIN'|'GAIN_MUSCLE'} measure.goal
 */
function makeProgramObject({
  units, weight, goal, uuid,
}) {
  const startweight = weight * 1;
  let endgoal;
  let poundsToLose = 0;
  if (goal && goal.toLowerCase() === 'lose_weight') {
    poundsToLose = 5;
  }
  if (goal && goal.toLowerCase() === 'gain_muscle') {
    poundsToLose = -5;
  }
  if (units === 'IMPERIAL') {
    endgoal = Number.parseFloat(weight) - poundsToLose;
  } else {
    endgoal = Math.round((Number.parseFloat(weight) - (poundsToLose / 2.2)) * 10) / 10;
  }
  const startdate = moment().format('YYYY-MM-DD');
  const enddate = moment(startdate).add(35, 'days').format('YYYY-MM-DD');

  return {
    startweight,
    endgoal,
    startdate,
    enddate,
    status: 'IN_PROGRESS',
    [USER]: uuid,
    result: 'TBD',
  };
}

export default makeProgramObject;
