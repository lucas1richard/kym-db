import connectDatabase from '../../../src';
const { User, closeConnection, destroyAll } = connectDatabase();

describe('user/getterMethods', () => {
  beforeAll(async () => {
    await User.bulkCreate(testData.users);
  });
  afterAll(async () => {
    await destroyAll();
    await closeConnection();
  });

  it('fitbitSynced', async () => {
    const user = await User.findOne();
    expect(user.toJSON().fitbitSynced).toBe(true);
  });
  it('googleSynced', async () => {
    const user = await User.findOne();
    expect(user.toJSON().googleSynced).toBe(true);
  });
});