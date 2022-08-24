import AppError from '../../../configure/appError';
import {
  FOOD_NOT_FOUND,
  USER_NOT_FOUND,
} from '../../../errorMessages';

/**
 * Add a user favorite for a meal
 * @param {object} obj
 * @param {string} obj.uuid identifies the user
 * @param {string} obj.abbrevId identifies the food
 * @param {number} obj.meal specifies for which meal to add
 * @return {Promise}
 * @this user
 * @async
 */
async function removeFavoriteFood({
  uuid, abbrevId, meal, Abbrev,
}) {
  const user = await this.findByPk(uuid);
  if (!user) {
    throw new AppError(404, {
      usermessage: USER_NOT_FOUND,
      devmessage: 'User not found (SHOULD HAVE NEVER GOTTEN HERE)',
    }, true);
  }
  const abbrev = await Abbrev.findByPk(abbrevId);
  if (!abbrev) {
    throw new AppError(404, {
      usermessage: FOOD_NOT_FOUND,
      devmessage: 'Food not found',
    }, true);
  }
  await user.removeAbbrev(abbrev, { meal });

  return { uuid: user.uuid, abbrevId: abbrev.id, meal };
}

export default removeFavoriteFood;
