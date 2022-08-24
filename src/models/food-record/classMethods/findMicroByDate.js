import assert from 'assert';
import { USER } from '../../../foreignKeys';
import { foodRecordKeys } from '../config';

/**
 * Find all the foods recorded on a given date
 * @param {object} obj
 * @param {string} obj.date the date by which to search
 * @param {string} obj.uuid identifies the user
 * @this food-record
 */
function findMicroByDate({
  date, uuid, Meal, Abbrev, AbbrevMicro,
}) {
  assert.strictEqual(typeof date, 'string', 'date should be a string');
  assert(!!uuid, 'No uuid specified');

  return this.findAll({
    where: {
      [foodRecordKeys.DATE]: date,
      [USER]: uuid,
      [foodRecordKeys.CONFIRMED]: true,
    },
    include: [
      Meal,
      {
        model: Abbrev,
        include: [AbbrevMicro],
      },
    ],
  });
}

export default findMicroByDate;
