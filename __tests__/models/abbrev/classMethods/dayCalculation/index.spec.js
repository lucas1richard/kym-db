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
    await Abbrev.bulkCreate(testData.abbrevs);
  });
  afterAll(async () => {
    await destroyAll();
    await closeConnection();
  });
});
