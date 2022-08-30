import beforeCreate from '../../../../src/models/meal-goals/hooks/beforeCreate';

const makeGoal = () => ({ protein: 1, carbs: 0, fat: 1 });

describe('meal-goals/hooks/beforeCreate', () => {
  let testGoals;
  beforeEach(() => {
    testGoals = [makeGoal(), makeGoal(), makeGoal(), makeGoal(), makeGoal(), makeGoal()];
  });
  it('requires an object', () => {
    try {
      beforeCreate();
    } catch (err) {
      expect(err).toBeTruthy(); // eslint-disable-line
    }
  });
  it('requires an object with a \'TRAIN\' prop', () => {
    try {
      beforeCreate({ goals: { REST: testGoals } });
    } catch (err) {
      expect(err.message).toBe('There must be goals for TRAIN');
    }
  });
  it('requires an object with a \'REST\' prop', () => {
    try {
      beforeCreate({ goals: { TRAIN: testGoals } });
    } catch (err) {
      expect(err.message).toBe('There must be goals for REST');
    }
  });
  it('requires 6 goals', () => {
    testGoals.pop();
    try {
      beforeCreate({ goals: { TRAIN: testGoals, REST: testGoals } });
    } catch (err) {
      expect(err.message).toBe('There must be goals for six meals on a TRAIN day');
    }
  });
});
