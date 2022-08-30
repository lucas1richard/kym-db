import connectDatabase from '../../../../src';

const {
  Abbrev,
  User,
  FoodRecord,
  Meal,
  Weight,
  closeConnection,
  destroyAll,
} = connectDatabase();

describe('foodRecord/instanceMethods/calMacros', () => {
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

  it('requires abbrev', async () => {
    try {
      const record = await FoodRecord.findOne();
      await record.calMacros();
    } catch (err) {
      expect(err.message).toBe('NO_ABBREV_FOUND');
    }
  });
  it('requires abbrev weight', async () => {
    try {
      const record = await FoodRecord.findOne({
        include: [{
          model: Abbrev,
        }],
      });
      await record.calMacros();
    } catch (err) {
      expect(err.message).toBe('NO_ABBREV_WEIGHT_FOUND');
    }
  });
  it('requires abbrev weight to match seq', async () => {
    try {
      const record = await FoodRecord.findOne({
        include: [{
          model: Abbrev,
          include: [
            Weight,
          ],
        }],
      });
      await record.updateQuantity({ quantity: 1, seq: '12342323' });
      await record.calMacros();
    } catch (err) {
      expect(err.message).toBe('NO_WEIGHT_FOUND');
    }
  });

  it('calculates macros of an instance', async () => {
    const record = await FoodRecord.findOne({
      include: [{
        model: Abbrev,
        include: [
          Weight,
        ],
      }],
    });

    const {
      calories, protein, carbohydrates, fat,
    } = await record.calMacros();

    expect(calories).toBeGreaterThan(0);
    expect(protein).toBeGreaterThan(0);
    expect(carbohydrates).toBe(0);
    expect(fat).toBeGreaterThan(0);
  });
});
