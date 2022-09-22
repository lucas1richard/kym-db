import { connectDatabase } from '../../../../../src';

const {
  Abbrev,
  destroyAll,
  closeConnection,
} = connectDatabase();

describe('/db/models/abbrev/classMethods', () => {
  beforeAll(async () => {
    await Abbrev.bulkCreate(testData.abbrevs);
  });
  afterAll(async () => {
    await destroyAll();
    await closeConnection();
  });
  it('requires all goals be greater than zero', async () => {
    const { error } = await Abbrev.calculateMacros({
      goals: {
        proteinGoal: 0,
        carGoal: 10,
        fatGoal: 10,
      },
      abbrevIds: [],
    });
    expect(error).toBe('INVALID_GOAL_MACRONUTRIENTS_ZERO');
  });
  it('soft fails with really hard goals', async () => {
    const { error } = await Abbrev.calculateMacros({
      goals: {
        proteinGoal: 1,
        carGoal: 1,
        fatGoal: 10000,
      },
      abbrevIds: [2514, 5470, 2768],
    });
    expect(error).toBe('UNABLE_TO_CALCULATE_WITH_FOODS');
  });
  it('soft fails with really large values in sensitive mode', async () => {
    const { error } = await Abbrev.calculateMacros({
      goals: {
        proteinGoal: 2000,
        carbGoal: 3000,
        fatGoal: 7000,
      },
      abbrevIds: [1, 2, 3],
      sensitive: true,
    });
    expect(error).toBe('HIGH_QUANTITY_WARNING');
  });
});
