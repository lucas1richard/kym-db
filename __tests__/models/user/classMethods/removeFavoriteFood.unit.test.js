import { v4 as uuidV4 } from 'uuid';
import removeFavoriteFoodUnbound from '../../../../src/models/user/classMethods/removeFavoriteFood';
import connectDatabase from '../../../../src/index';
import { FOOD_NOT_FOUND, USER_NOT_FOUND } from '../../../../src/errorMessages';

const {
  closeConnection,
  destroyAll,
  User,
  Abbrev,
} = connectDatabase();

const removeFavoriteFood = removeFavoriteFoodUnbound.bind(User);

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
  it('throws an error if there\'s no user', async () => {
    try {
      await removeFavoriteFood(uuidV4(), uuidV4(), meal);
    } catch (err) {
      expect(err.commonType).toBe(404, err);
      expect(err.message.usermessage).toBe(USER_NOT_FOUND);
    }
  });
  it('throws an error if there\'s no abbrev', async () => {
    try {
      await User.removeFavoriteFood({
        uuid: user.uuid, abbrevId: '9000', meal, Abbrev,
      });
    } catch (err) {
      expect(err.commonType).toBe(404);
      expect(err.message.usermessage).toBe(FOOD_NOT_FOUND);
    }
  });
  it('returns the removed favorite food', async () => {
    const removed = await User.removeFavoriteFood({
      uuid: user.uuid, abbrevId: abbrev.id, meal, Abbrev,
    });
    expect(removed).toEqual({ uuid: user.uuid, abbrevId: abbrev.id, meal });
  });
});
