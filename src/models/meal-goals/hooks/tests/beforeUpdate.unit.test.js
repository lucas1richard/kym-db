import { expect } from 'chai';
import beforeUpdate from '../beforeUpdate';

describe('meal-goals/hooks/beforeUpdate', () => {
  it('always fails', () => {
    try {
      beforeUpdate();
    } catch (err) {
      expect(err.message).to.equal('Goals cannot be modified. Create new goals instead.');
    }
  });
});
