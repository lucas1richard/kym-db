import connectDatabase from '../../../../src';
import { USER } from '../../../../src/foreignKeys';
import requestCaloriesUnbound from '../../../../src/models/user/classMethods/requestCalories';

const {
  User,
  Program,
  closeConnection,
  destroyAll,
} = connectDatabase();

const requestCalories = requestCaloriesUnbound.bind(User);

jest.mock('axios', () => ({
  get: jest.fn(),
}));

describe('user/classMethods/requestCalories', () => {
  beforeAll(async () => {
    await User.bulkCreate(testData.users);
    const user = await User.findOne();
    await Program.create({
      startweight: 160.6,
      endweight: 165.6,
      endgoal: 165.6,
      startdate: new Date(),
      enddate: new Date(),
      status: 'COMPLETE',
      result: 'SUCCESS',
      [USER]: user.uuid,
    });
  });
  afterAll(async () => {
    await destroyAll();
    await closeConnection();
  });
  it('fssd', () => {
    expect(1).toBeTruthy();
  });
});
