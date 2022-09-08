import { connectDatabase } from '../../../../src';

const {
  User,
  Abbrev,
  AbbrevMicro,
  FoodRecord,
  Meal,
  Weight,
  closeConnection,
  destroyAll,
} = connectDatabase();

describe('foodRecord/classMethods/findMicroByDate', () => {
  let user;
  beforeAll(async () => {
    await Promise.all([
      User.bulkCreate(testData.users),
      Abbrev.bulkCreate(testData.abbrevs),
      Meal.bulkCreate(testData.meals),
    ]);

    await FoodRecord.bulkCreate(testData.foodRecords);
    await AbbrevMicro.bulkCreate(testData.abbrevsMicro);

    user = await User.findOne();
    await FoodRecord.update({ user_uuid: user.uuid }, { where: { id: [1, 2] } });
  });
  afterAll(async () => {
    await destroyAll();
    await closeConnection();
  });

  it('is good', async () => {
    const foodRecord = await FoodRecord.findOne();
    const microByDate = await FoodRecord.findMicroByDate({
      date: foodRecord.date,
      uuid: user.uuid,
      Meal,
      Abbrev,
      AbbrevMicro,
      Weight,
    });

    expect(microByDate.length).toBeGreaterThan(0);

    // const [record] = microByDate;
    // const recordJson = record.toJSON();
    // expect(recordJson.abbrev).toBeTruthy();
    // expect(recordJson.abbrev.abbrevMicro).toBeTruthy();
  });
});
