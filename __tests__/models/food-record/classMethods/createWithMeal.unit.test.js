import connectDatabase from '../../../../src';

const {
  FoodRecord, Meal, User, Abbrev, Weight, destroyAll, closeConnection,
} = connectDatabase();

describe('db/models/food-record/classMethods', () => {
  describe('createWithMeal', () => {
    beforeAll(async () => {
      await User.bulkCreate(testData.users);
      await Abbrev.bulkCreate(testData.abbrevs);
      await Weight.bulkCreate(testData.weights);
    });
    afterAll(async () => {
      await destroyAll();
      await closeConnection();
    });
    it('adds a foodrecord with a meal', async () => {
      try {
        const record = await FoodRecord.createWithMeal({
          instance: {
            abbrev_id: '2514',
            user_id: '1',
            date: '2018-01-01',
            meal: 3,
            quantity: 1,
            unit: 1,
            confirmed: false,
          },
          Meal,
          Abbrev,
          Weight,
        });
        expect(record).toBeTruthy(); // eslint-disable-line
      } catch (error) {
        console.log(error);
      }
    });
  });
});
