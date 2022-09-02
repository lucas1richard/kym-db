import { connectDatabase } from '../../../../src';

const {
  User, Program, UserMeasurement, closeConnection, destroyAll,
} = connectDatabase();

describe('user/classMethods/setupFitbit', () => {
  beforeAll(async () => {
    await User.bulkCreate(testData.users);
  });
  afterAll(async () => {
    await destroyAll();
    await closeConnection();
  });

  it('setup fitbit -en_US', async () => {
    const user = await User.setupFitbit({
      profile: {
        id: '123234',
        _json: {
          user: {
            firstName: 'mockFirstName',
            lastName: 'mockLastName',
            dateOfBirth: '1989-06-02',
            offsetFromUTCMillis: 0,
            heightUnit: 'en_US',
            weightUnit: 'en_US',
            gender: 'male',
            height: 73,
            weight: 175,
            age: 32,
          },
        },
      },
      token: 'dmlaskasm',
      refreshToken: 'dfsfsdfsddsd',
      Program,
      UserMeasurement,
    });
    expect(user).toBeTruthy();
  });
  it('setup fitbit -other', async () => {
    const user = await User.setupFitbit({
      profile: {
        id: '123234',
        _json: {
          user: {
            firstName: 'mockFirstName',
            lastName: 'mockLastName',
            dateOfBirth: '1989-06-02',
            offsetFromUTCMillis: 0,
            heightUnit: 'something else',
            weightUnit: 'something else',
            gender: 'male',
            height: 73,
            weight: 175,
            age: 32,
          },
        },
      },
      token: 'dmlaskasm',
      refreshToken: 'dfsfsdfsddsd',
      Program,
      UserMeasurement,
    });
    expect(user).toBeTruthy();
  });
});
