import AppError from '../../../configure/appError';
import { USER_NOT_FOUND } from '../../../errorMessages';

/**
 * Add a user favorite for a meal
 * @param {string} uuid identifies the user
 * @param {string} abbrevId identifies the food
 * @param {number} meal specifies for which meal to add
 * @return {Promise}
 * @this user
 * @async
 */
async function addFavoriteFood({
  uuid, abbrevId, meal, Abbrev,
}) {
  const [user, abbrev] = await Promise.all([
    this.findByPk(uuid),
    Abbrev.findByPk(abbrevId),
  ]);
  if (!user) {
    throw new AppError(404, {
      usermessage: USER_NOT_FOUND,
      devmessage: 'User not found (SHOULD HAVE NEVER GOTTEN HERE)',
    }, true);
  }
  const relation = await user.addAbbrev(abbrev, { through: { meal } });
  return { ...abbrev.get(), recordFavorite: relation[0][0] };
}

export default addFavoriteFood;
