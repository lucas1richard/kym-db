import connectDatabase from '../../../../src';
import { findByPassword as findByPasswordUnbound } from '../../../../src/models/user/classMethods';
import { errorMessages } from '../../../../src/models/user/classMethods/findByPassword';

const { User, closeConnection, destroyAll } = connectDatabase();

const findByPassword = findByPasswordUnbound.bind(User);

describe('user/classMethods/findByPassword', () => {
  beforeAll(async () => {
    await User.bulkCreate(testData.users);
  });
  afterAll(async () => {
    await destroyAll();
    await closeConnection();
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
      await findByPassword({ credentials: {} });
    } catch (err) {
      expect(err.message).toBe(errorMessages.PASSWORD_NOT_INCLUDED);
    }
  });
  it('expects credentials to have email', async () => {
    try {
      await findByPassword({ credentials: { password: 'pass' } });
    } catch (err) {
      expect(err.message).toBe(errorMessages.EMAIL_NOT_INCLUDED);
    }
  });
  it('gets the user from email and password', async () => {
    const testUser = testData.users[0];
    const credentials = { email: testUser.email, password: testUser.password };
    const user = await findByPassword({ credentials });
    expect(user.uuid).toBeTruthy();
  });
});
