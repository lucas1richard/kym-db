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
  uuid, abbrevId, meal, Abbrev, UserRecordFavorites,
}) {
  const [user, abbrev] = await Promise.all([
    this.findByPk(uuid),
    Abbrev.findByPk(abbrevId),
  ]);
  if (!user) throw new Error(USER_NOT_FOUND);

  const favoriteRecord = await UserRecordFavorites.findOne({
    where: { userUuid: uuid, abbrevId, meal },
  });

  if (favoriteRecord) return abbrev;

  await UserRecordFavorites.create({ userUuid: uuid, abbrevId, meal });

  return abbrev;
}

export default addFavoriteFood;
