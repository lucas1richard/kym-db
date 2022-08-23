import { v4 as uuidv4 } from 'uuid';
import connectDatabase from '../../../../src';
import { USER_NOT_FOUND } from '../../../../src/errorMessages';

const { User, Abbrev, closeConnection } = connectDatabase();

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
    await Promise.all([
      User.destroy({ where: {} }),
      Abbrev.destroy({ where: {} }),
    ]);
    await closeConnection();
  });
  it('throws an error if there\'s no user', async () => {
    try {
      await User.addFavoriteFood({
        uuid: uuidv4(), abbrevId: '2514', meal, Abbrev,
      });
    } catch (err) {
      expect(err.commonType).toBe(404);
      expect(err.message.usermessage).toBe(USER_NOT_FOUND);
    }
  });
  it('throws an error if there\'s no abbrev', async () => {
    try {
      await User.addFavoriteFood({
        uuid: user.uuid, abbrevId: '2514', meal, Abbrev,
      });
    } catch (err) {
      expect(err.commonType).toBe(404);
      expect(err.message.usermessage).toBe('Couldn\'t find your account');
    }
  });
});
