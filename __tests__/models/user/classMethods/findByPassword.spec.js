import { sequelize, User } from '../../../../src';
import { findByPassword as findByPasswordUnbound } from '../../../../src/models/user/classMethods';
import { errorMessages } from '../../../../src/models/user/classMethods/findByPassword';

const findByPassword = findByPasswordUnbound.bind(User);

describe('user/classMethods/findByPassword', () => {
  beforeAll(async () => {
    await User.bulkCreate(testData.users);
  });
  afterAll(async () => {
    await User.destroy({ where: {} });
    return sequelize.close();
  });

  it('expects credentials', async () => {
    try {
      await findByPassword();
    } catch (err) {
      expect(err.message).toBe(errorMessages.NO_CREDENTIALS_PROVIDED);
    }
  });
  it('expects credentials to have password', async () => {
    try {
      await findByPassword({});
    } catch (err) {
      expect(err.message).toBe(errorMessages.PASSWORD_NOT_INCLUDED);
    }
  });
  it('expects credentials to have email', async () => {
    try {
      await findByPassword({ password: 'pass' });
    } catch (err) {
      expect(err.message).toBe(errorMessages.EMAIL_NOT_INCLUDED);
    }
  });
  it('gets the user from email and password', async () => {
    const testUser = testData.users[0];
    const user = await findByPassword({ email: testUser.email, password: testUser.password });
    expect(user.uuid).toBeTruthy();
  });
});
