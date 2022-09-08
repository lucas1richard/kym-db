import sequelize from 'sequelize'; // eslint-disable-line no-unused-vars
import assert from 'assert';
import { USER } from '../../../foreignKeys';
import { foodRecordKeys } from '../config';

/**
 * Find all the foods recorded on a given date
 * @param {object} obj
 * @param {string} obj.date the date by which to search
 * @param {string} obj.uuid identifies the user
 * @param {sequelize.Model} obj.Abbrev
 * @param {sequelize.Model} obj.AbbrevMicro
 * @param {sequelize.Model} obj.Meal
 * @this food-record
 */
function findMicroByDate({
  Abbrev,
  AbbrevMicro,
  Meal,
  Weight,
  date,
  uuid,
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
        include: [AbbrevMicro, Weight],
      },
    ],
  });
}

export default findMicroByDate;
