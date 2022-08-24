import connectDatabase from '../../../../src';
import { findMicroByDate as findMicroByDateUnbound } from '../../../../src/models/food-record/classMethods';

const {
  User,
  Abbrev,
  AbbrevMicro,
  FoodRecord,
  Meal,
  closeConnection,
  destroyAll,
} = connectDatabase();

const findMicroByDate = findMicroByDateUnbound.bind(FoodRecord);

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
    const microByDate = await findMicroByDate({
      date: foodRecord.Date,
      uuid: user.uuid,
      Meal,
      Abbrev,
      AbbrevMicro,
    });

    expect(microByDate.length).toBeGreaterThan(0);

    const [record] = microByDate;
    const recordJson = record.toJSON();
    // console.log(recordJson);
    expect(recordJson.abbrev).toBeTruthy();
    expect(recordJson.abbrev.abbrevMicro).toBeTruthy();
  });
});
