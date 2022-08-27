import connectDatabase from '../../../../src';

const { User, destroyAll, closeConnection } = connectDatabase();

describe('user/hooks', () => {
  describe('beforeCreate', () => {
    afterEach(async () => {
      await destroyAll();
    });
    afterAll(async () => {
      await destroyAll();
      await closeConnection();
    });

    it('assigns a secure password and salt', async () => {
      const user = await User.create(testData.users[0]);
      expect(typeof user.password).toBe('string');
      expect(typeof user.salt).toBe('string');
    });
    it('requires a password', async () => {
      try {
        const fakeUser = { ...testData.users[0] };
        delete fakeUser.password;
        await User.create(fakeUser);
      } catch (err) {
        expect(err.message).toBe('USER_PASSWORD_MISSING');
      }
    });
  });
});
