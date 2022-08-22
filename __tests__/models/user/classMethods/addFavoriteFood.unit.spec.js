import { v4 as uuidv4 } from 'uuid';
import { User, Abbrev, sequelize } from '../../../../src';
import { USER_NOT_FOUND } from '../../../../src/errorMessages';

describe('user/classMethods/addFavoriteFood', () => {
  let user;
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
    await sequelize.close();
  });
  it('throws an error if there\'s no user', async () => {
    try {
      await User.addFavoriteFood(uuidv4(), '2514', 3);
    } catch (err) {
      expect(err.commonType).toBe(404);
      expect(err.message.usermessage).toBe(USER_NOT_FOUND);
    }
  });
  it('throws an error if there\'s no abbrev', async () => {
    try {
      await User.addFavoriteFood(user.uuid, '2514', 3);
    } catch (err) {
      expect(err.commonType).toBe(404);
      expect(err.message.usermessage).toBe('Couldn\'t find your account');
    }
  });
});
