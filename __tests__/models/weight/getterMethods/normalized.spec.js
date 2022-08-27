import connectDatabase from '../../../../src';

const {
  Abbrev,
  Weight,
  closeConnection,
  destroyAll,
} = connectDatabase();

describe('Weight/getterMethods/normalized', () => {
  beforeAll(async () => {
    await Abbrev.bulkCreate(testData.abbrevs);
    await Weight.bulkCreate(testData.weights);
  });
  afterAll(async () => {
    await destroyAll();
    await closeConnection();
  });

  it('normalizes the value', async () => {
    const { normalized } = await Weight.findOne();
    expect(normalized).toBeTruthy();
  });
});
