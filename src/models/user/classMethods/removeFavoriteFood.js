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
  uuid, abbrevId, meal, Abbrev, UserRecordFavorites,
}) {
  const [user, abbrev] = await Promise.all([
    this.findByPk(uuid),
    Abbrev.findByPk(abbrevId),
  ]);

  if (!user) throw new Error(USER_NOT_FOUND);
  if (!abbrev) throw new Error(FOOD_NOT_FOUND);

  await UserRecordFavorites.destroy({
    where: { userUuid: uuid, abbrevId, meal },
  });

  return {
    uuid: user.uuid,
    abbrevId: abbrev.id,
    meal,
  };
}

export default removeFavoriteFood;
