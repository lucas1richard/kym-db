import { USER_VALIDATION } from '../src/foreignKeys';

describe('foreignKeys', () => {
  it('validates uuid', async () => {
    try {
      await USER_VALIDATION.validate();
    } catch (err) {
      expect(err.message).toBe('USER_UUID_REQUIRED');
    }
  });
});
