import assert from 'assert';
import { USER } from '../../../foreignKeys';
import { foodRecordKeys } from '../config';

/**
 * Find all the foods recorded on a given date
 * @param {string} date the date by which to search
 * @param {number} uuid identifies the user
 * @this food-record
 */
function findMicroByDate({ date, uuid, Meal }) {
  assert.strictEqual(typeof date, 'string', 'date should be a string');
  assert(!!uuid, 'No uuid specified');

  const normDate = new Date(date);

  return this.scope('micro').findAll({
    where: {
      [foodRecordKeys.DATE]: normDate,
      [USER]: uuid,
      [foodRecordKeys.CONFIRMED]: true,
    },
    include: [
      Meal,
    ],
  });
}

export default findMicroByDate;
