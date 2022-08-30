import connectDatabase from '../../../../../src/index';

const {
  User,
  Abbrev,
  destroyAll,
  closeConnection,
  MealGoals,
} = connectDatabase();

describe('abbrev/classMethods/dayCalculation', () => {
  beforeAll(async () => {
    await User.bulkCreate(testData.users);
    await Promise.all([
      await Abbrev.bulkCreate(testData.abbrevs),
      await MealGoals.bulkCreate(testData.mealGoals),
    ]);
  });
  afterAll(async () => {
    await destroyAll();
    await closeConnection();
  });

  it('dayCalculation', async () => {
    const res = await Abbrev.dayCalculation({ uuid: testData.users[0].uuid, type: 'REST', MealGoals });
    expect(res).toBeTruthy();
  });
  it('requires correct day type', async () => {
    try {
      await Abbrev.dayCalculation({ uuid: testData.users[0].uuid, type: 'something', MealGoals });
    } catch (err) {
      expect(err.message).toBe('INVALID_GOAL_TYPE');
    }
  });
});
