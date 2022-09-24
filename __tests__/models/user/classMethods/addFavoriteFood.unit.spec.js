import { v4 as uuidv4 } from 'uuid';
import { connectDatabase } from '../../../../src';
import { USER_NOT_FOUND } from '../../../../src/errorMessages';

const {
  User,
  Abbrev,
  UserRecordFavorites,
  closeConnection,
  destroyAll,
} = connectDatabase();

describe('user/classMethods/addFavoriteFood', () => {
  let user;
  const meal = 3;
  beforeAll(async () => {
    await Promise.all([
      User.bulkCreate(testData.users),
      Abbrev.bulkCreate(testData.abbrevs),
    ]);
    user = await User.findOne();
  });
  afterAll(async () => {
    await destroyAll();
    await closeConnection();
  });
  it('avoids adding the same food for the same meal', async () => {
    const record = await User.addFavoriteFood({
      uuid: user.uuid, abbrevId: testData.abbrevs[0].id, meal: 3, Abbrev, UserRecordFavorites,
    });
    const sameRecord = await User.addFavoriteFood({
      uuid: user.uuid, abbrevId: testData.abbrevs[0].id, meal: 3, Abbrev, UserRecordFavorites,
    });

    expect(record).toEqual(sameRecord);
  });
  it('throws an error if there\'s no user', async () => {
    try {
      await User.addFavoriteFood({
        uuid: uuidv4(), abbrevId: '2514', meal, Abbrev, UserRecordFavorites,
      });
    } catch (err) {
      expect(err.message).toBe(USER_NOT_FOUND);
    }
  });
  it('throws an error if there\'s no abbrev', async () => {
    try {
      await User.addFavoriteFood({
        uuid: user.uuid, abbrevId: '2514', meal, Abbrev, UserRecordFavorites,
      });
    } catch (err) {
      expect(err.message).toBe('Couldn\'t find your account');
    }
  });
});
