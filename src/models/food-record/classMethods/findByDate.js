import assert from 'assert';
import { USER } from '../../../foreignKeys';
import sequelize from '../../../conn';
import { foodRecordKeys } from '../config';

/**
 * Find all the foods recorded on a given date
 * @param {string} date the date by which to search
 * @param {number} uuid identifies the user
 * @this food-record
 */
function findByDate(date, uuid) {
  assert.strictEqual(typeof date, 'string', 'date should be a string');
  assert(!!uuid, 'No uuid specified');

  return this.findAll({
    where: {
      [foodRecordKeys.DATE]: date,
      [USER]: uuid,
    },
    include: [sequelize.models.meal],
  });
}

export default findByDate;
