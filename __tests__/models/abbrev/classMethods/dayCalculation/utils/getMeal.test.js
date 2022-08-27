import connectDatabase from '../../../../../../src';
// import calculateMacros from '../../../../../../src/models/abbrev/classMethods/calculateMacros';
import filterMeals from '../../../../../../src/models/abbrev/classMethods/dayCalculation/utils/filterMeals';
import {
  getMeal as getMealUnbound,
  validateGoalSync,
} from '../../../../../../src/models/abbrev/classMethods/dayCalculation/utils/getMeal';

const { Abbrev, destroyAll, closeConnection } = connectDatabase();

const getMeal = getMealUnbound.bind(Abbrev);

describe('getMeal', () => {
  afterAll(async () => {
    await destroyAll();
    await closeConnection();
  });
  // const model = {
  //   getMeal: getMeal.bind(Abbrev),
  //   calculateMacros,
  // };
  const goals = [
    { protein: 20, carbs: 30, fat: 10 },
    { protein: 20, carbs: 0, fat: 0 },
    { protein: 0, carbs: 0, fat: 10 },
    { protein: 0, carbs: 30, fat: 0 },
    { protein: 20, carbs: 30, fat: 10 },
    { protein: 20, carbs: 30, fat: 10 },
  ];
  const allMeals = filterMeals(goals);

  it('returns something when goals are not all 0', () => {
    const goal = { protein: 20, carbs: 30, fat: 10 };
    const ix = 0;

    const meal = getMeal(allMeals, goal, ix);
    expect(meal).toBeTruthy(); // eslint-disable-line
  });

  it('returns null when goals are all 0', async () => {
    const goal = { protein: 0, carbs: 0, fat: 0 };
    const ix = 0;

    const meal = await getMeal(allMeals, goal, ix);
    expect(meal).toBe(null); // eslint-disable-line
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
