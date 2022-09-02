import { connectDatabase } from '../../../../src';

const {
  User, UserMeasurement, closeConnection, destroyAll,
} = connectDatabase();

describe('userMeasurements/classMethods/setupFitbit', () => {
  beforeAll(async () => {
    await User.bulkCreate(testData.users);
    await UserMeasurement.bulkCreate(testData.userMeasurements);
  });
  afterAll(async () => {
    await destroyAll();
    await closeConnection();
  });

  it('finds all by user id', async () => {
    const user = await User.findOne();
    const userMeasurements = await UserMeasurement.findAllByUserId({ uuid: user.uuid });
    expect(userMeasurements.length).toBe(1);
  });
});
