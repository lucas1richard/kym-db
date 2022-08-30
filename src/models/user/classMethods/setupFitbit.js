import moment from 'moment';
import sequelize from 'sequelize'; // eslint-disable-line no-unused-vars
import { USER } from '../../../foreignKeys';

/**
 * @param {object} obj
 * @param {{ id: string }} obj.profile fitbit profile (from their API)
 * @param {string} obj.token
 * @param {string} obj.refreshToken
 * @param {sequelize.Model} obj.Program
 * @param {sequelize.Model} obj.UserMeasurement
 * @this user
 */
async function setupFitbit({
  profile, token, refreshToken, Program, UserMeasurement,
}) {
  const { _json: { user } } = profile; // eslint-disable-line no-underscore-dangle

  const [createdUser] = await this.findOrCreate({
    where: { fitbitId: profile.id },
    defaults: {
      fitbitToken: token,
      fitbitRefreshToken: refreshToken,
      firstname: user.firstName,
      lastname: user.lastName,
      password: profile.id,
      birthdate: new Date(new Date(user.dateOfBirth).getTime() - user.offsetFromUTCMillis),
    },
  });

  createdUser.fitbitRefreshToken = refreshToken;
  createdUser.fitbitToken = token;

  const savedUser = await createdUser.save();

  const usMeas = 'en_US';
  const heightIsUS = user.heightUnit === usMeas;
  const weightIsUS = user.weightUnit === usMeas;

  const [measurements] = await UserMeasurement.findOrCreate({
    where: {
      [USER]: savedUser.uuid,
    },
    defaults: {
      gender: user.gender.toUpperCase(),
      age: user.age,
      height: heightIsUS ? Math.round(user.height * 0.393701) : user.height,
      units: 'IMPERIAL',
      weight: weightIsUS ? Math.round(user.weight * 2.20462) : user.weight,
      lifestyle: 'NORMAL',
      date: moment().format('YYYY-MM-DD'),
    },
  });
  await Program.create(Program.makeProgramObject(measurements));
  return savedUser;
}

export default setupFitbit;
