import { connectDatabase } from '../../../../src';

const { Abbrev, destroyAll, closeConnection } = connectDatabase();

describe('/db/models/abbrev/classMethods', () => {
  beforeAll(async () => {
    await Abbrev.bulkCreate(testData.abbrevs);
  });
  afterAll(async () => {
    await destroyAll();
    await closeConnection();
  });

  it('Gives a longname upon find', async () => {
    const record = await Abbrev.findOne();
    expect(record.longname).toBeTruthy();
  });

  it('Gives a maxMacro upon find', async () => {
    const record = await Abbrev.findByPk(testData.abbrevs[0].id);
    expect(record.maxMacro).toBeTruthy();
  });

  it('(calculateMacros) Gives accurate food calculations', async () => {
    const goals = { proteinGoal: 20, carbGoal: 30, fatGoal: 10 };

    const foods = await Promise.all([
      Abbrev.findByPk(2514),
      Abbrev.findByPk(5470),
      Abbrev.findByPk(2768),
    ]);
    const { result } = await Abbrev.calculateMacros({ goals, abbrevIds: null, _foods: foods });
    const total = result.reduce((memo, fa) => {
      const { macros } = fa;
      /* eslint-disable no-param-reassign */
      memo.protein += macros.protein;
      memo.carbs += macros.carbs;
      memo.fat += macros.fat;
      return memo;
    }, { protein: 0, carbs: 0, fat: 0 });

    expect(total.protein).toBeCloseTo(20, 0.3);
    expect(total.carbs).toBeCloseTo(30, 0.3);
    expect(total.fat).toBeCloseTo(10, 0.3);
  });
});
