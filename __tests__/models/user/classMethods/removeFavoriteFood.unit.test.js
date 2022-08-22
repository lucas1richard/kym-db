import { v4 as uuidV4 } from 'uuid';
import removeFavoriteFoodUnbound from '../../../../src/models/user/classMethods/removeFavoriteFood';
import { sequelize, User, Abbrev } from '../../../../src/index';
import { FOOD_NOT_FOUND, USER_NOT_FOUND } from '../../../../src/errorMessages';

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
    await User.addFavoriteFood(user.uuid, abbrev.id, meal);
  });
  afterAll(async () => {
    await Promise.all([
      User.destroy({ where: {} }),
      Abbrev.destroy({ where: {} }),
    ]);
    sequelize.close();
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
      await User.removeFavoriteFood(user.uuid, '9000', meal);
    } catch (err) {
      expect(err.commonType).toBe(404);
      expect(err.message.usermessage).toBe(FOOD_NOT_FOUND);
    }
  });
  it('returns the removed favorite food', async () => {
    const removed = await User.removeFavoriteFood(user.uuid, abbrev.id, meal);
    expect(removed).toEqual({ userUuid: user.uuid, abbrevId: abbrev.id, meal });
  });
});
