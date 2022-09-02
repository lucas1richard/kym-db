import { USER_NOT_FOUND, FOOD_NOT_FOUND } from '../../../errorMessages';

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
  if (!user) throw new Error(USER_NOT_FOUND);

  const abbrev = await Abbrev.findByPk(abbrevId);
  if (!abbrev) throw new Error(FOOD_NOT_FOUND);

  await user.removeAbbrev(abbrev, { meal });

  return { uuid: user.uuid, abbrevId: abbrev.id, meal };
}

export default removeFavoriteFood;
