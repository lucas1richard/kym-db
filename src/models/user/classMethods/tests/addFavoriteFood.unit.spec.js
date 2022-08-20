import { expect } from 'chai';
import { User, Abbrev, UserFavorites } from '../../../../index';
import addFavoriteFoodUnbound from '../addFavoriteFood';

const users = include('test-data/users');
const abbrevs = include('test-data/abbrev');
const favorites = include('test-data/favorites');

const addFavoriteFood = addFavoriteFoodUnbound.bind(User);

describe('user/classMethods/addFavoriteFood', () => {
  before(async () => {
    await User.bulkCreate(users);
    await Abbrev.bulkCreate(abbrevs);
    await UserFavorites.bulkCreate(favorites);
  });
  after(async () => {
    await User.destroy({ where: {}, force: true });
    await Abbrev.destroy({ where: {}, force: true });
    await UserFavorites.destroy({ where: {}, force: true });
  });
  it('throws an error if there\'s no abbrev', async () => {
    try {
      await addFavoriteFood(1, 2514, 3);
    } catch (err) {
      expect(err.commonType).to.equal(404);
      expect(err.message.usermessage).to.equal('Couldn\'t find your account');
    }
  });
});
