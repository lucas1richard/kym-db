import { v4 as uuidV4 } from 'uuid';
import { connectDatabase } from '../../../../src/index';
import { FOOD_NOT_FOUND, USER_NOT_FOUND } from '../../../../src/errorMessages';

const {
  closeConnection,
  destroyAll,
  User,
  Abbrev,
} = connectDatabase();

describe('user/classMethods/removeFavoriteFood', () => {
  let user;
  let abbrev;
  const meal = 3;
  beforeAll(async () => {
    await Promise.all([
      User.bulkCreate(testData.users),
      Abbrev.bulkCreate(testData.abbrevs),
    ]);
    [user, abbrev] = await Promise.all([
      User.findOne(),
      Abbrev.findOne(),
    ]);

    await User.addFavoriteFood({
      uuid: user.uuid, abbrevId: abbrev.id, meal, Abbrev,
    });
  });
  afterAll(async () => {
    await destroyAll();
    await closeConnection();
  });
  it('throws an error if there\'s no abbrev', async () => {
    try {
      await User.removeFavoriteFood({
        uuid: user.uuid, abbrevId: '9000', meal, Abbrev,
      });
    } catch (err) {
      expect(err.message).toBe(FOOD_NOT_FOUND);
    }
  });
  it('throws an error if there\'s no user', async () => {
    try {
      await User.removeFavoriteFood({
        uuid: uuidV4(), abbrevId: '800000000', meal, Abbrev,
      });
    } catch (err) {
      expect(err.message).toBe(USER_NOT_FOUND);
    }
  });
  it('returns the removed favorite food', async () => {
    const removed = await User.removeFavoriteFood({
      uuid: user.uuid, abbrevId: abbrev.id, meal, Abbrev,
    });
    expect(removed).toEqual({ uuid: user.uuid, abbrevId: abbrev.id, meal });
  });
});
