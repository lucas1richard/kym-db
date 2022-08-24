import beforeUpdate from '../../../../src/models/meal-goals/hooks/beforeUpdate';

describe('meal-goals/hooks/beforeUpdate', () => {
  it('always fails', () => {
    try {
      beforeUpdate();
    } catch (err) {
      expect(err.message).toBe('Goals cannot be modified. Create new goals instead.');
    }
  });
});
