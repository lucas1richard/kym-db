import connectDatabase from '../../../../../../src';
import filterMeals from '../../../../../../src/models/abbrev/classMethods/dayCalculation/utils/filterMeals';
import {
  getMeal as getMealUnbound,
  validateGoalSync,
} from '../../../../../../src/models/abbrev/classMethods/dayCalculation/utils/getMeal';
// we need all abbrevs for this test
import abbrevs from '../../../../../../data/abbrev-sep.json';

const { Abbrev, destroyAll, closeConnection } = connectDatabase();

const getMeal = getMealUnbound.bind(Abbrev);

const convertAllKeysToLower = (data) => {
  const out = {};
  Object.keys(data).forEach((key) => {
    out[key.toLowerCase()] = data[key];
  });
  return out;
};

describe('getMeal', () => {
  beforeAll(async () => {
    await Abbrev.bulkCreate(abbrevs.map(convertAllKeysToLower));
  });
  afterAll(async () => {
    await destroyAll();
    await closeConnection();
  });

  const goals = [
    { protein: 20, carbs: 30, fat: 10 },
    { protein: 20, carbs: 0, fat: 0 },
    { protein: 0, carbs: 0, fat: 10 },
    { protein: 0, carbs: 30, fat: 0 },
    { protein: 20, carbs: 30, fat: 10 },
    { protein: 20, carbs: 30, fat: 10 },
  ];

  const allMeals = filterMeals(goals);

  it('returns something when goals are not all 0', async () => {
    const goal = { protein: 20, carbs: 30, fat: 10 };
    const ix = 0;

    const meal = await getMeal(allMeals, goal, ix);
    expect(meal).toBeTruthy();
  });

  it('returns null when goals are all 0', async () => {
    const goal = { protein: 0, carbs: 0, fat: 0 };
    const ix = 0;

    const meal = await getMeal(allMeals, goal, ix);
    expect(meal).toBe(null);
  });

  it('returns undefined', async () => {
    const result = await getMealUnbound([{}], {
      protein: 1,
      carbs: 1,
      fat: 1,
    }, 0);
    expect(result).toBe(undefined);
  });
  it('returns the error if it persists after 20 tries', async () => {
    const getMealSemiMock = getMealUnbound.bind({
      calculateMacros: async () => ({ error: 'mockError' }),
    });
    const goal = { protein: 20, carbs: 30, fat: 10 };
    const ix = 0;

    const res = await getMealSemiMock(allMeals, goal, ix);
    expect(res.error).toBe('mockError');
  });
});

describe('validateGoalSync', () => {
  it('returns false when there is no goal', () => {
    validateGoalSync(null, (err, val) => {
      expect(val).toBe(false);
    });
  });
  it('returns false when the goal has a zero', () => {
    const goal = {
      protein: 0,
      carbs: 0,
      fat: 0,
    };
    validateGoalSync(goal, (err, val) => {
      expect(val).toBe(false);
    });
  });
  it('returns false when the goal has no zero', () => {
    const goal = {
      protein: 1,
      carbs: 1,
      fat: 1,
    };
    validateGoalSync(goal, (err, val) => {
      expect(val).toBe(true);
    });
  });
});
