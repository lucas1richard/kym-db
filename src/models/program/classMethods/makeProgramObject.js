import { USER } from '../../../foreignKeys';

/**
 * Create an object to define a program
 * eslint-disable-line max-len
 * @param {{ units: string, weight: number, uuid: number, goal: 'Lose Weight'|'Maintain'|'Gain Muscle' }} measure
 */
function makeProgramObject({
  units, weight, goal, uuid,
}) {
  const startWeight = weight * 1;
  let endGoal;
  let poundsToLose = 0;
  if (goal && goal.toLowerCase() === 'lose weight') {
    poundsToLose = 5;
  }
  if (goal && goal.toLowerCase() === 'gain muscle') {
    poundsToLose = -5;
  }
  if (units === 'imperial') {
    endGoal = Number.parseFloat(weight) - poundsToLose;
  } else {
    endGoal = Math.round((Number.parseFloat(weight) - (poundsToLose / 2.2)) * 10) / 10;
  }
  const startDate = new Date();
  const endDate = new Date(new Date().getTime() + (86400000 * 35));

  return {
    startWeight,
    endGoal,
    startDate,
    endDate,
    status: 'IN_PROGRESS',
    [USER]: uuid,
    result: 'TBD',
  };
}

export default makeProgramObject;
