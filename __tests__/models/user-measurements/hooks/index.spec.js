import connectDatabase from '../../../../src/index';
import { bmr } from '../../../../src/models/user-measurements/utils/bmr';

jest.mock('../../../../src/models/user-measurements/utils/bmr', () => ({
  bmr: jest.fn(() => 1),
}));

const {
  User, UserMeasurement, destroyAll, closeConnection,
} = connectDatabase();

describe('userMeasurements/hooks', () => {
  beforeAll(async () => {
    await User.bulkCreate(testData.users);
  });
  afterAll(async () => {
    await destroyAll();
    await closeConnection();
  });

  describe('beforeCreate', () => {
    it('calculates bmr', async () => {
      const [data] = testData.userMeasurements;
      await UserMeasurement.create(data);
      expect(bmr).toHaveBeenCalledWith({
        age: Number.parseFloat(data.age),
        genderString: data.gender.toUpperCase(),
        heightNumber: Number.parseFloat(data.height),
        weightNumber: Number.parseFloat(data.weight),
        units: data.units,
      });
    });
  });
});
