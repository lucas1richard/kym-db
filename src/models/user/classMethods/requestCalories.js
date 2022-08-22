import axios from 'axios';
import moment from 'moment';
import { USER } from '../../../foreignKeys';
import Program from '../../program';

/**
 * Fetch the user's calories from the Fitbit API
 * @param {string} uuid identifies the user
 * @param {string} [startDate] get calories starting from this date
 * @param {string} [endDate] get calories ending on this date
 * @this user
 * @async
 */
/* istanbul ignore next */
async function requestCalories(uuid, startDate, endDate) {
  let refreshToken;
  try {
    const [user, program] = await Promise.all([
      this.findOne({ where: { uuid } }),
      Program.findOne({
        where: { [USER]: uuid },
        order: [['createdAt', 'DESC']],
      }),
    ]);
    const token = user.fitbitToken;
    const { fitbitId } = user;
    refreshToken = user.fitbitRefreshToken;
    let requestStart;
    let requestEnd;

    if (startDate) {
      requestStart = startDate.slice(0, 10);
    } else {
      requestStart = moment(program.startDate).format('YYYY-MM-DD');
    }

    if (endDate) {
      requestEnd = endDate.slice(0, 10);
    } else if (startDate) {
      requestEnd = startDate;
    } else {
      requestEnd = moment(program.endDate).format('YYYY-MM-DD');
    }
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    return axios.get(`https://api.fitbit.com/1/user/${fitbitId}/activities/calories/date/${requestStart}/${requestEnd}.json`);
  } catch (data) {
    return { data, error: true, refreshToken };
  }
}

export default requestCalories;
