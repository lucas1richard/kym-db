import connectDatabase from '../../../../src';

const { User, closeConnection, destroyAll } = connectDatabase();

describe('user/classMethods/sanitize', () => {
  beforeAll(async () => {
    await User.bulkCreate(testData.users);
  });
  afterAll(async () => {
    await destroyAll();
    await closeConnection();
  });

  it('sanitizes a user sequelize instance', async () => {
    const user = await User.findOne();
    const sanitizedUser = await User.sanitize(user);
    expect(sanitizedUser.hasOwnProperty('password')).toBe(false);
    expect(sanitizedUser.hasOwnProperty('id')).toBe(false);
    expect(sanitizedUser.hasOwnProperty('createdAt')).toBe(false);
    expect(sanitizedUser.hasOwnProperty('updatedAt')).toBe(false);
    expect(sanitizedUser.hasOwnProperty('fitbitToken')).toBe(false);
    expect(sanitizedUser.hasOwnProperty('fitbitRefreshToken')).toBe(false);
    expect(sanitizedUser.hasOwnProperty('googleId')).toBe(false);
  });
  it('sanitizes a user json', async () => {
    const user = await User.findOne();
    const sanitizedUser = await User.sanitize(user.toJSON());
    expect(sanitizedUser.hasOwnProperty('password')).toBe(false);
  });
});
