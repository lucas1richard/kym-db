import { connectDatabase } from '../../../../src/index';

const {
  User,
  UserRecordFavorites,
  Abbrev,
  closeConnection,
  destroyAll,
} = connectDatabase();

describe('user/classMethods/findFavoriteFoods', () => {
  beforeAll(async () => {
    await User.bulkCreate(testData.users);
    await Abbrev.bulkCreate(testData.abbrevs);
  });
  afterAll(async () => {
    await destroyAll();
    await closeConnection();
  });

  it('finds favorite foods', async () => {
    await User.addFavoriteFood({
      uuid: testData.users[0].uuid,
      abbrevId: testData.abbrevs[0].id,
      meal: 3,
      Abbrev,
      UserRecordFavorites,
    });
    const records = await User.findFavoriteFoods({
      uuid: testData.users[0].uuid,
      Abbrev,
      UserRecordFavorites,
    });
    expect(records).toBeTruthy();
  });
});
