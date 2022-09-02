import { connectDatabase } from '../../../../src';

const {
  Abbrev,
  User,
  FoodRecord,
  Meal,
  Weight,
  closeConnection,
  destroyAll,
} = connectDatabase();

describe('foodRecord/instanceMethods/updateQuantity', () => {
  beforeAll(async () => {
    await User.bulkCreate(testData.users);
    await Abbrev.bulkCreate(testData.abbrevs);
    await Weight.bulkCreate(testData.weights);
    await Meal.bulkCreate(testData.meals);
    await FoodRecord.bulkCreate(testData.foodRecords);
  });
  afterAll(async () => {
    await destroyAll();
    await closeConnection();
  });

  it('updates the quantity', async () => {
    const record = await FoodRecord.findOne();

    const updatedRecord = await record.updateQuantity({ quantity: 10, seq: 1 });
    expect(updatedRecord.quantity).toBe(10);
    expect(updatedRecord.unit).toBe(1);
  });
});
