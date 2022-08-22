import AppError from '../../../configure/appError';
import {
  FOOD_NOT_FOUND,
  USER_NOT_FOUND,
} from '../../../errorMessages';
import Abbrev from '../../abbrev';

/**
 * Add a user favorite for a meal
 * @param {number} userUuid identifies the user
 * @param {number} abbrevId identifies the food
 * @param {number} meal specifies for which meal to add
 * @return {Promise}
 * @this user
 * @async
 */
async function removeFavoriteFood(userUuid, abbrevId, meal) {
  const user = await this.findByPk(userUuid);
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
  return { userUuid: user.uuid, abbrevId: abbrev.id, meal };
}

export default removeFavoriteFood;
