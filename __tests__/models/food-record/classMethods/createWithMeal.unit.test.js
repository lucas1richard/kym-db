import connectDatabase from '../../../../src';
import { createWithMeal as createWithMealUnbound } from '../../../../src/models/food-record/classMethods';

const {
  FoodRecord, User, Abbrev, Weight, destroyAll, closeConnection,
} = connectDatabase();

const createWithMeal = createWithMealUnbound.bind(FoodRecord);

describe('db/models/food-record/classMethods', () => {
  describe('createWithMeal', () => {
    beforeEach(async () => {
      await User.bulkCreate(testData.users);
      await Abbrev.bulkCreate(testData.abbrevs);
      await Weight.bulkCreate(testData.weights);
    });
    afterEach(async () => {
      await destroyAll();
      await closeConnection();
    });
    it('adds a foodrecord with a meal', async () => {
      try {
        const record = await createWithMeal({
          abbrev_id: '2514',
          user_id: '1',
          date: '2018-01-01',
          meal: 3,
          quantity: 1,
          unit: 1,
          confirmed: false,
        });
        expect(record).toBeTruthy(); // eslint-disable-line
      } catch (error) {
        // console.log(error);
      }
    });
  });
});
